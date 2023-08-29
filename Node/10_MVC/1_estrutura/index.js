import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'

const app = express()
const port = 3000
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())
app.use(express.static('public'))
conn.sync().then(()=>{
    app.listen(port)
}).catch((err)=>{
    console.log(err)
})