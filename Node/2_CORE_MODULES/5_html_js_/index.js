
const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req,res) =>{
    fs.readFile("index.html", (err,data) =>{
        res.writeHead(200, { "Content-Type": "text/html" }) 
        res.write(data)
        res.end()
    })
})

server.listen(port, () =>{
    console.log(`Servidor rodando da porta ${port} `)
})

/* o res.writeHead engloba as duas funções: res.statusCode = 200; e 
res.setHeader("Content-Type", "text/html"); */