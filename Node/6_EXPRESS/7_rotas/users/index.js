import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//retirar o /users pois será passado no nosso arquivo principal

const basePath = path.join(__dirname,'../content')

router.get('/add', (req,res)=>{
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req,res)=>{
    const {name, age} = req.body
    console.log(`Meu nome é ${name} e tenho ${age} anos de idade!!`)
    res.sendFile(`${basePath}/userform.html`)
})

router.get(':id', (req,res) => {
    //requisição: http://localhost:3000/users/2
    const id = req.params.id;
    console.log(`Carregando o usuário ${id}`) // output: Carregando o usuário 2
    res.sendFile(`${basePath}/users.html`)
})

// module.exports = router
export default router