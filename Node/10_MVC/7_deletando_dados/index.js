import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'
import router from './router/taskRouter.js'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use('/tasks',router)
app.use(express.static('public'))

/*
'/tasks': Isso é o que chamamos de "path" ou caminho da URL. 
Indica que este middleware será aplicado somente quando a URL 
começar com /tasks. Isso é útil para agrupar rotas relacionadas 
em um mesmo conjunto.
*/

conn.sync().then(()=>{
    app.listen(port)
}).catch((err)=>{
    console.log(err)
})
