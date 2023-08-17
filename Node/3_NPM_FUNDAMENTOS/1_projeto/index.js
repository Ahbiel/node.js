const http = require('http')
const port = 3000

const server = http.createServer((req,res)=>{
    res.write('Hello World')
    res.end()
})

server.listen(port, (err) =>{
    console.log(`Aplicação rodando da porta ${port}`)
})


// Posso rodar esse programa com o comando "npm run dev"