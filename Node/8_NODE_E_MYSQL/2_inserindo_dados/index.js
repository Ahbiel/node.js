// npm install mysql

import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'

const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', "handlebars")

// Objetivo dessa seção
app.post('/books/insertbook',(req,res)=>{
    const {title, pageqty} = req.body
    console.log(title,pageqty)

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}')`
    conn.query(query, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.get('/',(req,res)=>{
    res.render('home')
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