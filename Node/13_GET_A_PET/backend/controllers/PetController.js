import Pet from "../models/Pets.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from '../helpers/get-user-by-token.js'
import jwt from "jsonwebtoken";

export default class PetController{
    static async create(req,res){
        const {name, age, weight, color} = req.body;
        const images = req.files
        // console.log(images,'AHHHHHHHHHH')
        const available = true;
        //images upload

        // validations
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
}