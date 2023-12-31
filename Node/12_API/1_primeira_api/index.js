import express from 'express'

const app = express()
const port = 3000
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

//rotas - endpoint
app.get('/',(req,res)=>{
    res.json({message: 'Primeira rota criada com sucesso!!'})
})
app.get('/error',(req,res)=>{
    res.json({error: 'Foi encontrado um erro!!'})
})

app.listen(port)