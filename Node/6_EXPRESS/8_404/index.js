import express from "express";
const app = express()
const port = 3000

import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname,'arquivos')

app.get('/',(req,res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.use((req,res,next)=>{
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port,()=>{
    console.log(`App rodando na porta ${port}`)
})