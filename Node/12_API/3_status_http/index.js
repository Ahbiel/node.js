import express from 'express'

const app = express(), port = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/create',(req,res)=>{
    const {name, price} = req.body
    console.log(name,price)
    if(!name){
        res.status(422).json({message: 'O campo nome é obrigatório!'})
    }
    res.status(201).json({message: `O produto ${name} com o preço ${price} foi criado com sucesso`})
})

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Primeira rota criada com sucesso!!'})
})
app.listen(port,()=>{
    console.log(`Servidor ouvindo na porta: ${port}`)
})
