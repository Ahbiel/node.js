import express from 'express'

const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

app.post('/create',(req,res)=>{
    const {name, price} = req.body
    console.log(name,price)
    res.json({message: `O produto ${name} com o preço ${price} foi criado com sucesso`})
})

app.get('/',(req,res)=>{
    res.json({message: 'Primeira rota criada com sucesso!!'})
})
app.listen(port)