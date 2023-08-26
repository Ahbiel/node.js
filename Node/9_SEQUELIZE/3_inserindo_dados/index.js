import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'
import User from './models/User.js'
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', "handlebars")

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.get('/users/create',(req,res)=>{
    res.render('adduser')
})

app.post('/users/create', async(req,res)=>{
    let {name, occupation, newsletter} = req.body
    console.log(name,occupation,newsletter)
    if(newsletter === 'on'){ // caso o newsletter for verdadeiro, o retorno será de 'on' 
        newsletter = true
    } else{
        newsletter = false
    }
    await User.create({name,occupation,newsletter})
    res.redirect('/')
})

app.get('/',(req,res)=>{
    res.render('home')
})

conn.sync().then(()=>{
    app.listen(port)
}).catch((err)=>{
    console.log(err)
})