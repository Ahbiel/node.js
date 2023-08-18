import express from "express";
const app = express()
const port = 3000 // variaveis de ambiente - enviroment

app.get("/", (req,res)=>{
    res.send('<h2>Essa é a rota raiz</h2>')
})
/*
Em Express.js, o método app.get() é usado para definir uma rota de manipulação 
de solicitação HTTP GET para um determinado caminho (URL)
*/

app.get("/home", (req,res)=>{
    res.send('<h2>Essa é a rota home, muito legal né?</h2>')
})

app.listen(port, () =>{
    console.log(`App rodando na porta ${port}`)
})