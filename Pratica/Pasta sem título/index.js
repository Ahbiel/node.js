import express from 'express'
import { fileURLToPath } from 'url';
import bodyParse from 'body-parser'
import path from 'path'
import users from './users/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname,'content')
const app = express()
const port = 3000

// app.use(
//     express.urlencoded({
//       extended: true,
//     }),
// )

app.use(bodyParse.urlencoded({extended:true}))

app.use(express.json())
app.use(users)

app.get('/',(req,res)=>{
    res.sendFile(`${basePath}/index.html`)
})
app.listen(port,()=>{
    console.log(`App rodando na porta ${port}`)
})