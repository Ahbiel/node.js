const fs = require('fs')
const PATH = "./arquivo.txt"

fs.writeFileSync(PATH,"Hello World", (err) =>{
    console.log(err)
})

fs.readFile(PATH,'utf8' ,(err, data) => {
    console.log(data)
})