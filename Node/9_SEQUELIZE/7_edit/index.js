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
    newsletter === 'on'? newsletter = true : newsletter = false // caso o newsletter for verdadeiro, o retorno será de 'on' 
    await User.create({name,occupation,newsletter})
    res.redirect('/')
})

app.get('/users/:id', async(req,res)=>{
    const id = req.params.id;
    User.findOne({raw:true, where: {id:id}}).
        then(
            (user)=>{
                res.render('userview',{user})
            }
        ).
        catch((err)=>console.log(err))
})

app.post('/users/delete/:id',(req,res)=>{
    const id = req.params.id;
    User.destroy({
        where: {id:id}
    }).then((user)=>{
        res.redirect('/')
    }).catch((err)=>console.log(err))
})

//Editando (update)

app.get('/users/edit/:id',(req,res)=>{
    const id = req.params.id;
    User.findOne(
        {raw:true, where: {id:id}}
    ).then((user)=>{
        res.render('useredit', { user })
    }).catch((err)=>console.log(err))
})

app.post('/users/update',(req,res)=>{
    let {id,name,occupation,newsletter} = req.body;
    newsletter === 'on'? newsletter = true : newsletter = false
    const userData = {
        id,name,occupation,newsletter
    }
    User.update(userData,{
        where:{id}
    }).then((user)=>{
        res.redirect('/')
    }).catch((err)=>console.log(err))
})

app.get('/', async(req,res)=>{
    const users = await User.findAll({raw:true})
    console.log(users)
    res.render('home', {users})
})

conn.sync().then(()=>{
    app.listen(port)
}).catch((err)=>{
    console.log(err)
})