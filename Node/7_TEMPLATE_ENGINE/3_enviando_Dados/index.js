import express from 'express'
import exphbs from 'express-handlebars'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const info = {
    nome: 'Angelo',
    age: '18'
}

const mensagem = "Hello world"

app.get('/',(req,res)=>{
    res.render('home', {info:info, mensagem})
})
app.listen(port)