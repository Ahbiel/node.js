## Passo-à-passo

Digitar o **npm init -y**

Digitar o **npm install chalk inquirer**

Adicioar o "start": "node index.js" no script do package.json. Poderemos executar com o comando **npm start**

Usaremos o **inquerer** como modulo externo e o **fs** como interno com o import e o export
- Add "type": "module" to your package.json.
- Replace "main": "index.js" with "exports": "./index.js" in your package.json.

