import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000
const basePath = path.join(__dirname,'content')

app.get('/users/:id', (req,res) => {
    //requisição: http://localhost:3000/users/2
    const id = req.params.id;
    console.log(`Carregando o usuário ${id}`) // output: Carregando o usuário 2
    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req,res) => {
    res.sendFile(`${basePath}/index.html`)
})
app.listen(port, ()=>{
    console.log(`App rodando da porta ${port}`)
})
