import express from 'express'
import exphbs from 'express-handlebars'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const auth = true

const info = {
    nome: 'Angelo',
    age: '19'
}
const mensagem = "Hello world"
const list = ["Pera","Uva","Banana","Maça","Abacaxi"]


const pokemon = {
    name: "Charizard",
    type: "Fogo e voador",
    nivel: "45",
    evolucao: "final",
    amizade: "Muito amigo do Ash"
}

app.get('/pokemon',(req,res)=>{
    res.render('pokemon', {pokemon})
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.get('/',(req,res)=>{
    res.render('home', {info:info, mensagem, auth,list})
})
app.listen(port)