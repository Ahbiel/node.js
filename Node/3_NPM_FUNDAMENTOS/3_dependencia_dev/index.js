const _ = require("lodash");

const a = [1,2,3,4,5,7,10];
const b = [2,4,6,7,8];

const diff = _.difference(a, b);

console.log(diff); // [ 1, 3, 5 ]

//1 - Apagar o node_modules
//2 - Executar o comando "npm run dev"
//3 - Visualizar a mensagem de erro
//4 - Executar o comando "npm install"
//5 - Executar novamente o comando "npm run dev"