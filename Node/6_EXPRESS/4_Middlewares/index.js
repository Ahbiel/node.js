import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var checkAuth = (req,res,next) => {
    req.checkAuth = true
    if(req.checkAuth){
        console.log('Está logado')
        next()
    } else{
        console.log('Não está logado')
    }
}
const app = express()
app.use(checkAuth)
const port = 8080
const basePath = path.join(__dirname,'content')

app.get('/', (req,res) => {
    res.sendFile(`${basePath}/index.html`)
})
app.listen(port, ()=>{
    console.log(`App rodando da porta ${port}`)
})
