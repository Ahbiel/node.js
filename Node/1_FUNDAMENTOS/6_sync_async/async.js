const fs = require('fs')
console.log('início')
fs.writeFile('arquivo.txt', 'Hello world', (err) =>{
    setTimeout(()=>{
        console.log('Meio')
    },1000)
})
console.log('Fim')

/* Saída:
Inicio
Fim
Meio //executa depois de um minuto
*/