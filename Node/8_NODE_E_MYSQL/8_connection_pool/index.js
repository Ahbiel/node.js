// npm install mysql

import express from 'express'
import exphbs from 'express-handlebars'
// objetivo dessa seção
import conn from './db/conn.js'

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
        res.render('book', {book})
    })
})
// Objetivo da seção 4
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

// Objetivo da seção 5

// Capturar os valores e mostrar no formulário
app.get('/book/edit/:id',(req,res)=>{
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id=${id}`
    conn.query(query, (err,data)=>{
        if(err){
            console.log(err)
            return
        }
        const book = data[0] //pegar o indice 0
        res.render('editbook', {book})
    })
})

// objetivo da seção 6

app.post("/books/updatebook",(req,res)=>{
    const {id,title,pageqty} = req.body
    const query = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`
    conn.query(query,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/book/')
    })
})

// Objetivo da seção 7

app.post('/book/remove/:id',(req,res)=>{
    const id = req.params.id;
    const query = `DELETE FROM books WHERE id = ${id}`
    conn.query(query,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/book/')
    })
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(port)