const fs = require('fs')
console.log('início')
fs.writeFileSync('arquivo.txt', 'Hello world')
console.log('Fim') //so é executado após a criação/escrita do arquivo acima