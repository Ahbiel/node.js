const http = require('http')
const port = 8080

const server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text/html')
    res.end('<h1>Hello world</h1>')
})
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})