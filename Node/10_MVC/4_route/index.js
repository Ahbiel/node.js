import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'
import taskRoutes from './routes/taskRoutes.js'
import Task from './models/Task.js'

const app = express()
const port = 3000
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(express.json())
app.use(express.static('public'))
app.use('/tasks',taskRoutes)

conn.sync().then(()=>{
    app.listen(port, ()=>{
        console.log('Aplicativo logado com sucesso!!')
    })
}).catch((err)=>{
    console.log(err)
})