// npm install mysql

import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'

const app = express()
const port = 3000

const content = {
    primario: "Node.js",
    secundario: "MySql",
    mensagem: "Isso é muito legal"
}

app.engine('handlebars', exphbs.engine())
app.set('view engine', "handlebars")

app.get('/',(req,res)=>{
    res.render('home', {content})
})

// criar conexão com o mysql

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ab123456",
    database: "nodeapp"
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log("Conectou ao MySql")
    app.listen(port)

})