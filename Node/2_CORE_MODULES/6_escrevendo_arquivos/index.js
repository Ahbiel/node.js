const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req,res) =>{
    const url = require('url').parse(req.url, true)
    const name = url.query.name

    if (!name) {
        fs.readFile('index.html', (err, data) =>{
            res.writeHead(200)
            res.write(data)
            res.end()
        })
    } else {

        const newName = name + ",\r\n" //quebra de linha no windowns e linux

        fs.appendFile('arquivo.txt',newName, () =>{ //usar o appendFile ao invéz do writeFIle
            res.writeHead(302, { //redirecionamento
                Location: '/',
            })
            return res.end()
        })
    }
})

server.listen(port, () =>{
    console.log(`Servidor rodando da porta ${port} `)
})

/* o res.writeHead engloba as duas funções: res.statusCode = 200; e 
res.setHeader("Content-Type", "text/html"); */