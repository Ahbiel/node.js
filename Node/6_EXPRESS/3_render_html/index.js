import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminho = "/home/angelo/node/Node/6_EXPRESS/3_render_html/content/" // alternativa

const app = express()
const port = 3000
const basePath = path.join(__dirname,'content')

console.log(basePath)


app.get('/',(req,res)=>{
    res.sendFile(`${basePath}/index.html`)
})
app.listen(port,()=>{
    console.log(`App rodando na porta ${port}`)
})