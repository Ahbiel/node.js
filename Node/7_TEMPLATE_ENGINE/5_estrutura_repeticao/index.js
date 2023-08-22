import express from 'express'
import exphbs from 'express-handlebars'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const auth = true

const info = {
    nome: 'Angelo',
    age: '18'
}


const mensagem = "Hello world"
const list = ["Pera","Uva","Banana","Maça","Abacaxi"]

app.get('/dashboard',(req,res)=>{
    
    
    res.render('dashboard')
})

app.get('/',(req,res)=>{
    res.render('home', {info:info, mensagem, auth,list})
})
app.listen(port)