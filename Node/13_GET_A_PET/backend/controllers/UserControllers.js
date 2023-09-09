import createUserToken from '../helpers/create-user-token.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import getToken from '../helpers/get-token.js'
import jwt from "jsonwebtoken";

export default class UserController{
    static async register(req,res){
        const {name, email, password, confirmpassword, phone} = req.body
        if(!name){
            res.status(422).json({message: "O nome é obrigatório"})
            return
        }
        if(!email){
            res.status(422).json({message: "O email é obrigatório"})
            return
        }
        if(!password){
            res.status(422).json({message: "A Senha é obrigatória"})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: "A confirmação de senha é obrigatória"})
            return
        }
        if(!phone){
            res.status(422).json({message: "O número de telefone é obrigatório"})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: "As senhas não combinam"})
            return
        }
        //check is user exists
        const checkifUserExist = await User.findOne({where:{email:email}})
        if (checkifUserExist){
            res.status(422).json({message: "Por favor, utilize outro email"})
            return
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash =await bcrypt.hash(password, salt)

        // create a user
        const user = {
            name, 
            email,
            phone,
            password: passwordHash
        }
        try {
            const newUser = await User.create(user)
            // res.status(201).json({message: "usuário criado"})
            await createUserToken(newUser, req,res)
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
    static async login(req,res){
        const {email, password} = req.body;
        if(!email){
            res.status(422).json({message: "O email é obrigatório"})
            return
        }
        if(!password){
            res.status(422).json({message: "A senha é obrigatória"})
            return
        }
        const user = await User.findOne({where:{email:email}})
        if(!user){
            res.status(422).json({message: "Não há usuário cadastrado com esse email"})
            return
        }
        const ckechPassword = await bcrypt.compare(password,user.password)
        if(!ckechPassword){
            res.status(422).json({message: "Senha inválida"})
            return
        }
        await createUserToken(user, req,res)
    }
    static async checkUser(req,res){
        let currentUser;
        console.log(req.headers.authorization)
        if(req.headers.authorization){
            const token = getToken(req) // "pega o token"
            const decoded = jwt.verify(token, "nossosecret")
            currentUser = await User.findOne(
                {where:{id: decoded.id},
                attributes: {exclude: ['password']}
            })
            // currentUser.password = undefined
        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }
    static async getUserById(req,res){
        const id = req.params.id
        const user = await User.findOne({
            where:{id:id},
            attributes: {exclude: ['password']}
        })
        if(!user){
            res.status(422).json({
                message: "Usuário não encontrado"
            })
            return; 
        }
        res.status(200).json({
            user
        })
    }
    static async editUser(req,res){
        const id = req.params.id
        res.status(200).json({
            message: `Deu certo o retorno!!, id do user: ${id}`
        })
        return
    }
}