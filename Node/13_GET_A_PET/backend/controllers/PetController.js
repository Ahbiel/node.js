import Pet from "../models/Pets.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from '../helpers/get-user-by-token.js'
import jwt from "jsonwebtoken";

export default class PetController{
    static async create(req,res){
        const {name, age, weight, color} = req.body;
        const images = req.files
        const available = true;
        if(!name){
            res.status(422).json({message: "O nome é obrigatório"})
            return
        }
        if(!age){
            res.status(422).json({message: "A idade é obrigatório"})
            return
        }
        if(!weight){
            res.status(422).json({message: "O peso é obrigatório"})
            return
        }
        if(!color){
            res.status(422).json({message: "A cor é obrigatório"})
            return
        }
        if(images.length === 0){
            res.status(422).json({message: "A imagem é obrigatório"})
            return
        }
        //get pet owner
        const token = getToken(req);
        const user = await getUserByToken(res,token)
        const pet = {
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
            UserId: user.id
        }
        images.map((image)=>{
            pet.images.push(image.filename)
        })
        console.log(pet)
        try {
            const newPet = await Pet.create(pet)
            res.status(201).json(
                {message: "sucesso", newPet}
            )
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
    static async getAll(req,res){
        const pets = await Pet.findAll({
            order: [['createdAt','DESC']] //'DESC' para ordenação decrescente ou 'ASC' para ordenação crescente
        })
        res.status(200).json({
            pets: pets
        })
    }
    static async getAllUserPets(req,res){
        const token = getToken(req)
        const decoded = jwt.verify(token, "nossosecret")
        console.log(decoded)
        const myPets = await Pet.findAll({
            where: {UserId: decoded.id}
        })
        res.status(200).json({
            myPets: myPets
        })
    }
    static async getAllUserAdoptions(req,res){
        const token = getToken(req)
        const decoded = jwt.verify(token, "nossosecret")
        const myPets = await Pet.findAll({
            where: {adopter_id: decoded.id}
        })
        res.status(200).json({
            myPets: myPets
        })
    }
    static async getPetByid(req,res){
        const id = req.params.id
        await Pet.findOne({
            where:{id:id}
        }).then((value)=>{
            if(!value){
                res.status(404).json({
                    message: 'pet não encontrado'
                })
                return
            }
            res.status(200).json({
                pet: value
            })
        }).catch((err)=>{
            res.status(422).json({message: err})
        })
    }
    static async removePetById(req,res){
        const id = req.params.id
        const pet = await Pet.findOne({where:{id:id}})
        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
            return
        }
        //verificar se o usuário logado registrou o pet
        const token = getToken(req);
        const user = await getUserByToken(res,token)
        console.log(pet.UserId)
        if(pet.UserId.toString() !== user.id.toString()){
            res.status(422).json({message: 'Houve um erro ao processar sua solicitação'})
            return
        }
        await Pet.destroy({
            where:{id: id}
        }).then(()=>{
            res.status(200).json({message: 'Pet removido com sucesso!'})
        })
    }
    static async updatePet(req,res){
        const id = req.params.id
        const {name, age, weight, color, available} = req.body;
        const images = req.files
        const updatedData = {}

        const pet = await Pet.findOne({where:{id:id}})
        if(!pet){
            res.status(422).json({message: 'Pet não encontrado'})
            return
        }
        //verificar se o usuário logado registrou o pet
        const token = getToken(req);
        const user = await getUserByToken(res,token)
        console.log(pet.UserId)
        if(pet.UserId.toString() !== user.id.toString()){
            res.status(422).json({message: 'Houve um erro ao processar sua solicitação'})
            return
        }

        if(!name){
            res.status(422).json({message: "O nome é obrigatório"})
            return
        } else {
            updatedData.name = name
        }
        if(!age){
            res.status(422).json({message: "A idade é obrigatório"})
            return
        } else {
            updatedData.age = age
        }
        if(!weight){
            res.status(422).json({message: "O peso é obrigatório"})
            return
        } else {
            updatedData.weight = weight
        }
        if(!color){
            res.status(422).json({message: "A cor é obrigatório"})
            return
        } else {
            updatedData.color = color
        }
        if(images.length === 0){
            res.status(422).json({message: "A imagem é obrigatório"})
            return
        } else {
            console.log('updatedData')
            updatedData.images = []
            images.map((image)=>{
                updatedData.images.push(image.filename)
            })
        }
        
        await Pet.update(updatedData,{
            where:{id:id}
        })
    }
    static async schedule(req,res){
        const id = req.params.id
        const pet = await Pet.findOne({where:{id:id}, raw:true})
        if(!pet){
            res.status(422).json({message: 'Pet não encontrado'})
            return
        }
        //verificar se o usuário logado registrou o pet
        const token = getToken(req);
        const user = await getUserByToken(res,token)
        if(pet.UserId.toString() === user.id.toString()){
            res.status(422).json({message: 'Você não pode adotar o seu próprio pet'})
            return
        }
        console.log(pet)
        if(pet.adopter){
            console.log('test')
            if(pet.adopter.id.toString() === user.id.toString()){
                res.status(422).json({message: 'Você já agendou uma visita para este pet'})
                return
            } else{
                res.status(422).json({message: 'Esse pet já possui uma visita agendada'})
            }
        }
        // add user to pet
        pet.adopter = {
            id: user.id,
            name: user.name,
            image: user.image
        }
        console.log(pet)
        await Pet.update(pet,{
            where:{id}
        }).then(()=>{
            res.status(200).json({
                message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`
            })
        }).catch((err)=>console.log(err))
    }
    static async concludeAdoption(req,res){
        const id = req.params.id;
        const pet = await Pet.findOne({where:{id:id}, raw:true})
        if(!pet){
            res.status(422).json({message: 'Pet não encontrado'})
            return
        }
        const token = getToken(req)
        const user = await getUserByToken(req,token)
        if(pet.UserId.toString() !== user.id.toString()){
            res.status(422).json({message: 'Você precisa ser dono desse pet para aceitar'})
            return
        }
        pet.available = false

        await Pet.update(pet,{
            where:{id}
        }).then(()=>{
            res.status(200).json({
                message: `A adoção foi realizada com sucesso`
            })
        }).catch((err)=>console.log(err))
    }
}