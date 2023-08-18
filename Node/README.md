# node.js
O Node.js é uma runtime de JavaScript. Ou seja, uma biblioteca utilizada por um compilador durante a
execução do programa que está construída na V8 engine (escrita em C++) da Google. Possibilitando criar softwares em JS no lado do servidor. Resumindo, temos então um código JS rodando em C++ para garantir alta performance;

### O que é npm?
O npm é um gerenciador de pacotes do Node.
Vamos poder utilizar bibliotecas de terceiros, baixando elas pelo npm, e também executar determinados scripts no nosso programa;
Dificilmente um software em Node.js não utiliza o npm.
Os módulos externos ficam numa pasta chamada node_modules.
Ela deve ser descartável, ou seja, a cada instalação do projeto baixamos todos os pacotes novamente;

### O que são módulos?

Basicamente, módulos são scripts reaproveitáveis, que utilizamos bastante na hora de programar.
Eles são divididos em três categorias;

**Internos**: módulos que nós desenvolvemos;
- Os módulos internos são criados nas pastas do nosso projeto.
- Podemos utilizar a instrução **module.exports** para exportar um módulo, e importar usando a instrução **require**;

**Core Modules**: módulos que vem com o Node.js;
- No Node temos diversos Core Modules, que são os que vêm prontos para serem utilizados (baixados quando instalamos o node)
- Eles resolvem diversos problemas, como: trabalhar com arquivos e diretórios, servir aplicações e etc.
- Precisamos importar estes módulos no projeto para poder utilizar

**Externos**: módulos que instalamos via npm;
- Os módulos externos podem ser instalados via **npm**
- Para isso precisamos inicializar o npm no projeto, com: **npm init**;
- A partir daí os módulos ficam mapeados e podemos instalar módulos, que são salvos na pasta node_modules;
- Podemos instalar módulos com **npm install _nome_**

### export e import

Com o Node.js também é possível utilizar o **export e import** do ES6;
São funcionalidades mais modernas de importação e exportação, com mais recursos do que as que vimos anteriormente e com maior flexibilidade também
Para isso precisamos modificar os nossos arquivos para a extensão **.mjs**.
E então podemos exportar uma com **export default** e importar com **import**, uma única função, caso seja necessário;

## sync e async
Em Node.js temos duas opções ao executar métodos, conhecidas como sync (síncrona) e async (assíncrona:):
- **Forma síncrona**: o código espera ser totalmente executado para prosseguir;
- **Forma assíncrona:** o código continue progredindo e em um ponto futuro obtém a resposta da execução assíncrona;

## Lidando com erros em Node

Temos duas formas principais para gerar ou evidenciar erros em Node.js;
- **throw:** uma forma de encerrar um programa, gerando um novo erro;
- **try catch:** uma forma de evidenciar algo que deu errado em um bloco de código e exibir a mensagem de erro;

# Seção 3 - Node core modules

**Core modules mais utilizados**

- **http**: módulo para criar servidores HTTP;
  - receber uma requisição e enviar código HTML como resposta.
  - **http.createServer**: Cria o servidor, passando como parâmetros a requisição (req) e uma resposta (res)
    - **res.write('Hello World')**: Escreve uma mensagem na tela
    - **res.end()**: Finaliza a execução do servidor. Podemos apssar um código html a ser executado também.
    - **res.statusCode = code**: informa o Status da nossa aplicação
    - **res.setHeader("nome","valor")** é uma função que permite definir cabeçalhos HTTP personalizados para uma resposta (response) que será enviada do servidor para o cliente
      - Ex: **res.setHeader('Contenty-Type', 'text/html')**
    - **res.writeHead**: Comando que engloba as funcionalidade do **statusCode e setHeader**
      - Ex: **res.writeHead(200, { "Content-Type": "text/html" })**
    - **listen(port, ()=>{}?):** expor a aplicação em uma determinada porta
- **path**: extrair informações de paths (caminhos) de arquivos;
  - **path.resolve(arquivo)**: exibe qual o path completo até o arquivo em questão
  - **path.join()**: cria um path dinâmico, com variáveis e valores fixos
- **fs**: file system, leitura e escrita de arquivos;
  - **fs.readFile(path, funcion(err,data)=>{})**: permite a leitura de um determinado arquivo
  - **fs.writeFile(path, content, (err)?)**: permite criar (caso não exista) e criar um conteúdo dentro desse arquivo
  - **fs.writeFileSync(path, 'content')**: cria um arquivo, e para a execução do programa até que seja criado o arquivo.
  - **fs.appendFile(path, content, (err)?)**: semelhante ao writeFile, porém não vai sobrescrever o conteúdo por cima do outro, e sim dar um "Append"
  - **fs.existsSync(path)**: verifica se um determinado arquivo/diretório existe
  - **fs.mkdirSync(path/nome)**: vai criar um diretório (caso não exista).
  - **fs.stat (path, (err,stats) =>{})**: verifica algumas algumas informações de um arquivo ou diretório, e armazena essas informações na variável "stats".
    - stats.isFile()
    - stats.isDirectory()
    - stats.isSymbolicLink()
    - stats.ctime
    - stats.size
- **url**: módulo para trabalhar com URLs;
  - O módulo url serve para decompor uma URL que passamos para o método parse.
  - **new url.URL(address)**: criar um objeto URL a partir de um endereço ou URL fornecido. Isso faz parte do módulo url incorporado no Node.js. Podemos buscar as seguintes informações:
    - parseURL.protocol
    - parseURL.host
    - parseURL.port
    - parseURL.pathname
    - parseURL.search
    - parseURL.hash
    - parseURL.searchParams
    - parseURL.searchParams.get('')

**Usando o http com o url**

```js
var urlInfo = require('url').parse(req.url, true);
```
Esse código em JavaScript está usando o módulo url embutido no Node.js para analisar a URL de uma requisição HTTP. A função require('url').parse() é usada para analisar uma URL em seus componentes individuais.
- **require('url'):** Isso está importando o módulo url embutido no Node.js, que fornece utilitários para análise e formatação de URLs.
- **.parse(req.url, true)**: Aqui, a função parse é chamada com dois argumentos:
  - **req.url:** Este é um objeto que representa a URL da requisição HTTP. Geralmente, é passado como parte de um objeto req ao lidar com solicitações HTTP (por exemplo, em um servidor HTTP Node.js).
  - **true:** O segundo argumento é um booleano que, quando definido como true, faz com que a função parse analise também os parâmetros de consulta da URL, transformando-os em um objeto JavaScript.

O resultado da chamada à função parse é armazenado na variável urlInfo. Esse resultado é um objeto que contém informações detalhadas sobre a URL analisada, incluindo:
- **protocol**: O protocolo usado na URL (por exemplo, "http" ou "https").
- **host:** O nome do host da URL (por exemplo, "www.example.com").
- **pathname:** O caminho da URL após o host.
- **query:** Um objeto JavaScript contendo os parâmetros de consulta da URL (disponível somente quando o segundo argumento da função parse é true).

Exemplo:

## Exibindo um arquivo html com o http

Para poder exibir um arquivo html com o http, terei que utilizar dois core modules: http e o fs. Irei usar o método readFile do modúlo fs para pegar as informações dentro do arquivo index.html e exibi-las como resposta do http

```js
const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req,res) =>{
    fs.readFile("index.html", (err,data) =>{
        res.writeHead(200, { "Content-Type": "text/html" }) 
        res.write(data)
        res.end()
    })
})
server.listen(port, () =>{
    console.log(`Servidor rodando da porta ${port} `)
})
```

Na nova versão do Js, a instrução require está caindo em desuso - alguns pacotes novos estão substituindo pelo import/export, como é o exemplo do inquirer. Como boas práticas, iremos também adotar esse método, porém, a algumas configurações que precisamos realizar para poder efetuar o uso do import/export sem erro. Após criarmos o aruqivo package.json com o comando **npm init -y**, vamos editar o arquivo da seguinte forma:
- Adcionar **"type": "module"** ao arquivo package.json.
- Trocar a instrução **"main": "index.js"** pelo **"exports": "./index.js"** no arquivo package.json.

Link: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

Seção 4 - Fundamentos do npm

Link para os pacotes do NPM: https://www.npmjs.com/

## O que npm?

É o principal gerenciador de pacotes do Node.js. A sigla significa: **Node Package Manager**. 
A maioria dos projetos que vamos trabalhar em Node, também terá atuação do npm, pois podemos não só instalar pacotes, mas também configurar o projeto e rodar scripts por meio do npm run.
A criação de um projeto gera sempre um arquivo, o **package.json**

## Instalando um pacote

Para instalar um pacote vamos utilizar o comando **npm install nome_pacote**. Quando fazemos desta maneira a instalação uma pasta node_modules é criada e nela todos os arquivos de módulos de terceiro são armazenados. Sempre que rodarmos o comando npm install, a pasta node_modules é recriada com todos os módulos do package.json;

exemplo:
```js
npm install lodash
```

Sempre que formos rodar um projeto em uma outra máquina, primeiro precisamos nos atentar a duas coisas:
- Todas as dependências do projeto fica no arquivo "package.json", no qual também é versionado com o restante dos arquivo
- Porém, o diretório node_modules não é versionado, então quando formos executar um projeto em outra máquina, precisamos instalar as dependências presente no package.json com o comando: **npm install**

## Instalando um pacote como dev

Há uma possibilidade de instalar pacotes apenas para o ambiente de desenvolvimento, utilizando a flag **--save-dev**. Isso faz com que ele seja separado no package.json dos demais. E então na build de produção não instalaremos estes módulos. 

Um exemplo: servidor para ambiente local, como o Nodemon (npm install --save-dev nodemon)

## Atualização de pacotes

Constantemente os pacotes do npm são atualizados por seus desenvolvedores, tendo a necessidade de atualizá-los. E, para isso temos então o comando **npm update**, que vai fazer a atualização de todos os pacotes instalados nopackage.json. Tambem é possível atualizar um pacote específico com npm update _nome_

Também temos a opção de checar se há atualizações disponiveis cajo o **npm update** não atualiza de forma automática. Para isso, executaremos os seguintes comando:
```sh
npx npm-check-updates -u
npm install
```

## Instalando pacote global
Um pacote global não fica salvo na pasta node_modules do projeto, ele fica salvo no computador do usuário. A vantagem é que podemos acessá-lo em qualquer local via terminal.

Para isso, utilizamos o seguinte comando: 
```sh
npm install -g _pacote_
```
## Executando scripts com npx

A principal função do npx é permitir que você execute comandos de pacotes instalados, que normalmente não seriam acessíveis diretamente pela linha de comando. Ele é especialmente útil para executar utilitários de linha de comando fornecidos por pacotes npm sem a necessidade de instalá-los previamente. Como por exemplo a instalação do React, que é feita pelo npx;

## Remover pacote com npm
●Para remover um pacote utilizamos o comando: npm uninstall <nome>
●Substituindo <nome> pelo nome do pacote;
●Isso faz com que o pacote seja removido do package.json também;
●Vamos ver na prática!

