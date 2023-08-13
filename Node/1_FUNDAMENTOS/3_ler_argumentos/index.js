// executar o comando "node index.js nome=Angelo" na linha de comando
console.clear()
console.log(process.argv);
const args = process.argv.slice(2);
console.log(args);
const nome = args[0].split("=")[1];
console.log(nome);