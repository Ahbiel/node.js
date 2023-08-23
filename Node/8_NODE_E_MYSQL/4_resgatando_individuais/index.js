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
// Objetivo da seção 2
app.post('/books/insertbook',(req,res)=>{
    const {title, pageqty} = req.body
    // console.log(title,pageqty)

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}')`
    conn.query(query, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})
// Objetivo da seção 3
app.get('/book',(req,res)=>{
    const query = "SELECT * FROM books"
    conn.query(query, (err,data)=>{
        if(err){
            console.log(err)
        }
        const book = data
        // console.log(book)
        res.render('book', {book})
    })
})
// Objetivo dessa seção
app.get('/book/:id',(req,res)=>{
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id = ${id}`
    conn.query(query, (err,data)=>{
        if(err){
            console.log(err)
        }
        const book = data
        res.render('book', {book})
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