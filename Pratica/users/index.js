import express from "express";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname+"/../content")
console.log(basePath)


router.get('/cadastro',(req,res)=>{
    res.sendFile(`${basePath}/userform.html`)
})
router.post('/save',(req,res)=>{
    const {name,age} = req.body
    console.log(`Meu nome é ${name} e tenho ${age} anos de idade!!`)
    if(!fs.existsSync(`${basePath}/arquivo.txt`)){
        const users = `Nome: ${name} - idade: ${age}`
        fs.writeFileSync(`${basePath}/arquivo.txt`, users, (err)=>console.log(err))
    } else{
        fs.readFile(`${basePath}/arquivo.txt`,'utf8', (err,data)=>{
            const UsersAdd = data + ',\n' + `Nome: ${name} - idade: ${age}`
            console.log(UsersAdd)
            fs.writeFile(`${basePath}/arquivo.txt`, UsersAdd, (err)=>console.log(err))
        })
    }
    // fs.readFile(`${basePath}/arquivo.txt`,'utf8',(err,data) =>{
    //     const currentUsers = data + ',\n'
    //     fs.appendFileSync(`${basePath}/arquivo.txt`, currentUsers, (err)=>console.log(err))
    // })
    res.sendFile(`${basePath}/userform.html`)
})
export default router