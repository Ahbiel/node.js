// primeiramente, executar o comando "npm init"
// baixar algum módulo externo, como o minimist
// executar o comando da seguinte maneira: node index.js --name=Angelo

const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
console.log(args);
const nome = args["name"];
console.log(nome);