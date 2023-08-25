import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', "handlebars")

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

app.post('/book/create',(req,res)=>{
    const title = req.body.title
    const query = `INSERT INTO title (??) VALUES (?)`
    const data = ['title',title]
    conn.query(query,data,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.get('/book/:id',(req,res)=>{
    const id = req.params.id
    const query = `SELECT * FROM title WHERE ?? = ?`
    const data = ['id',id]
    conn.query(query,data,(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        console.log(book.title)
        res.render('update', {book})
    })
})
app.post('/book/update/:id',(req,res)=>{
    const id = req.params.id;
    const title = req.body.title;

    const query = `UPDATE title SET ?? = ? WHERE ?? = ?`
    const data = ['title',title,'id',id]
    conn.query(query,data,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect("/")
    })
})

app.post('/book/delete/:id',(req,res)=>{
    const id = req.params.id
    const query = `DELETE FROM title WHERE ?? = ?`
    const dados = ['id',id]
    conn.query(query,dados,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.get('/',(req,res)=>{

    const query = `SELECT * FROM title`
    conn.query(query,(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(data)
        res.render('home', { data })
    })

})
app.listen(port)

