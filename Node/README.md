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

## Utilizando o import/export

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
Para remover um pacote utilizamos o comando: **npm uninstall _Pacote_**. Isso faz com que o pacote seja removido do package.json também;

# Express
O Express é um framework para Node.js muito utilizado, que serve para criarmos aplicações web. Nele podemos _criar rotas_, renderizar HTML, conectar a um banco de dados, entre outros.

Principais recursos e funcionalidades do Express.js:

- **Roteamento**: O Express.js oferece um sistema de roteamento flexível e poderoso que permite mapear URLs para funções de manipulação de solicitações. Isso permite que você defina facilmente as rotas para diferentes partes do seu aplicativo.
- **Middlewares**: Os middlewares são funções intermediárias que podem ser usadas para processar solicitações antes que elas atinjam as rotas finais. Eles são úteis para a execução de ações comuns a várias rotas, como autenticação, manipulação de erros e muito mais.
  - Middlewares são códigos que podem ser executados no meio/entre (middle) de alguma ação e outra.
  - Por exemplo: verificar se usuário está logado, podemos ter um para esta verificação;
  - O método que nos dá acesso a utilizar middlwares é o use no Express
```js
const express = require('express');
const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log(`Solicitação recebida para: ${req.url}`);
  next(); // Passa o controle para o próximo middleware/rota
});

// Rota
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
```
- **Gerenciamento de Solicitação e Resposta**: O Express.js simplifica a manipulação de solicitações HTTP e respostas, fornecendo métodos e ferramentas para configurar cabeçalhos, definir códigos de status e enviar dados para o cliente.
- **Integração com Middleware de Terceiros:** O Express.js possui uma ampla gama de middlewares de terceiros disponíveis que facilitam a integração de recursos adicionais em seu aplicativo, como autenticação, compactação de respostas, sessões, entre outros.
- **Suporte a Modelos de Visualização:** Embora o Express.js não inclua um mecanismo de modelo de visualização integrado, ele permite que você escolha e integre facilmente mecanismos de modelos populares, como Handlebars, EJS e Pug.

**O que são rotas**

Rota é um conceito super importante e presente em aplicações web. basicamente são as URL’s que acessamos. Se criamos uma rota **/produtos**, podemos acessar através da URL **www.nossosite.com/produtos**. Quando o usuário acessa podemos acessar várias lógicas, como carregar produtos do banco de dados. Ou seja, rotas são uma ponte entre o usuário e a lógica da aplicação.


**Passo-à-passo** da utilização do Express

- Importar o Express e invocá-lo;
```js
const express = require('express')
const app = express()
```
- Definir uma porta base para a aplicação;
```js
const port = 3000 // pode ser passado variáveis de ambiente
```
- Criar uma rota (URL que será acessada);
```js
app.get("/", (req,res)=>{ //nesse caso, a rota é a raiz do projeto (/)
    res.send('<h2>Hello world</h2>')
})
```
- Executar o método listen na porta especificada;
```js
app.listen(port, () =>{
    console.log(`App rodando na porta ${port}`)
})
```

## Renderizando html com o express e o Path

Para enviar HTML como resposta do usuário, utilizamos o método **sendFile**. Para que não ocora nenhum erro, nesse primeiro momento, precisamos passar o path absoluto do arquivo html para o sendFile, e para isos, vamos utilizar método **join** o core Module **path**, passando o path absoluto com a variável de ambiente **__dirname**
```js
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname,"dir_do_html")
app.get('/',(req,res)=>{
  res.sendFile(`${basePath}/index.html`)
})
```

## Parâmetros por URL

Podemos resgatar os parâmetros da URL por meio do **req**. Acessamos **req.params _nome_**, onde nome deve ser o que está definido na URL do Express; que fica desta forma: **/users/:id**. Neste caso estaríamos buscando o usuário no banco de dados pelo id;

## Enviando dados por POST

Para enviar os dados vamos precisar criar um form e mandar os dados via POST para alguma URL. No Express precisamos colocar alguns middlewares como o express.json para ler os dados do body. E também uma roda que vai receber estes dados, utilizando o método post do Express;

middlewares que podemos utilizar
- Criando um próprio middlewares
```js
app.use(
    express.urlencoded({
      extended: true,
    }),
)
app.use(express.json())
```
- **app.use(...):** O método use() é usado para adicionar middlewares ao aplicativo Express. Middlewares são funções que podem manipular as requisições HTTP enquanto passam pelo pipeline do aplicativo. Eles podem realizar diversas tarefas, como analisar corpos de requisição, autenticar usuários, manipular cabeçalhos e muito mais.
- **express.urlencoded({...}):** Este middleware é usado para analisar os corpos das requisições HTTP com o tipo de conteúdo application/x-www-form-urlencoded. Esse tipo de conteúdo é comum em formulários HTML tradicionais. O middleware urlencoded é responsável por analisar os dados enviados pelo cliente no corpo da requisição e transformá-los em um formato que o servidor possa entender. O objeto de configuração { extended: true } permite que esse middleware analise dados mais complexos, como arrays e objetos aninhados, em vez de apenas dados simples.
- **app.use(express.json()):** Este middleware é usado para analisar os corpos das requisições HTTP com o tipo de conteúdo application/json. Esse tipo de conteúdo é amplamente utilizado para enviar dados em formato JSON (JavaScript Object Notation), que é um formato de intercâmbio de dados muito comum em APIs REST. O middleware json analisa o corpo da requisição, se estiver no formato JSON, e transforma-o em um objeto JavaScript que pode ser manipulado facilmente no servidor.

Importando um middlewares
```js
const bodyParser = require('body-parser'); // Middleware para lidar com dados do corpo das requisições
app.use(bodyParser.json());
```

## Rotas

O **express.Router** é uma classe no framework Express.js que permite criar roteadores modulares para organizar e separar suas rotas em módulos independentes. Ele oferece uma maneira flexível de gerenciar suas rotas em aplicativos Express, tornando seu código mais organizado e fácil de manter.

Podemos unir várias rotas em um módulo, isso vai deixar nosso código mais organizado. Normalmente criamos uma pasta ou arquivo que contém estas rotas.

Vantagens:
- **Modularização de Rotas:** O express.Router permite criar um conjunto de rotas separadas em arquivos diferentes, dividindo a lógica do roteamento em módulos independentes. Isso é especialmente útil em aplicativos maiores, onde você pode ter muitas rotas e deseja manter seu código organizado.
- **Criação e Configuração:** Você pode criar um roteador utilizando o método express.Router(). A partir daí, você pode definir rotas usando os métodos HTTP como get, post, put, delete, etc., assim como faria no aplicativo principal do Express.
- **Middleware**: Assim como no aplicativo principal, você pode adicionar middlewares ao roteador usando router.use(...). Isso permite que você aplique middlewares específicos para determinadas rotas ou para todo o roteador.
- **Montagem no Aplicativo:** Depois de definir as rotas em um roteador, você pode montá-lo em um aplicativo Express usando app.use(...). Isso faz com que todas as rotas definidas no roteador estejam disponíveis sob o caminho especificado.
- **Parâmetros e Controladores:** O express.Router também suporta o uso de parâmetros em rotas, permitindo que você capture valores específicos das URLs. Além disso, você pode usar funções de controle (controllers) para separar ainda mais a lógica de negócios das rotas em si.
- **Reusabilidade:** A modularidade oferecida pelo express.Router torna mais fácil reutilizar rotas em diferentes partes do aplicativo ou até mesmo em diferentes aplicativos.

Exemplo:

```js
// routes/posts.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Lista de posts');
});

router.get('/:id', (req, res) => {
  const postId = req.params.id;
  res.send(`Detalhes do post ${postId}`);
});

module.exports = router;
```

```js
// app.js
const express = require('express');
const app = express();

const postsRouter = require('./routes/posts');

app.use('/posts', postsRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

```

# Seção 7 - Template engine

Uma template engine no Node.js é uma ferramenta que permite que você combine dados dinâmicos com templates estáticos para gerar conteúdo HTML de forma mais eficiente e organizada. Em outras palavras, é uma biblioteca que ajuda a separar a lógica de apresentação do seu código, facilitando a criação de páginas da web dinâmicas.

Basicamente é uma forma de deixar o HTML dinâmico, inserindo variáveis do back-end no front-end. Podemos também criar layouts, que são reaproveitados, o que é essencial para projetos que usam banco de dados, que não são estáticos;

Algumas das template engines populares no ecossistema Node.js incluem:

- **EJS (Embedded JavaScript):** Permite que você insira código JavaScript diretamente em seus templates HTML. Os pedaços de código JavaScript são interpretados e executados no servidor, gerando o conteúdo dinâmico.
- **Handlebars**: Usa um sistema de expressões delimitadas por chaves duplas {{}} para inserir dados nas templates. Ele é mais focado em simplicidade e legibilidade.
- **Pug (anteriormente conhecido como Jade):** Oferece uma sintaxe compacta e de estilo mais próximo ao Markdown. Ele é ideal para quem procura uma maneira mais concisa de escrever templates.
- **Nunjucks:** Inspirado no Jinja2 do Python, ele fornece uma ampla gama de funcionalidades para controle de fluxo, herança de templates e reutilização de blocos.
- **Mustache:** Uma engine de template minimalista que foca em simplicidade e legibilidade. É bastante flexível e está disponível em várias linguagens de programação.

Todos atingem o mesmo objetivo, porém há algumas diferenças de setup e funcionalidades;

## O que é Handlebars 

O Handlebars é uma das template engines mais utilizadas, e colocamos os dados dinâmicos no HTML entre {{ }} para serem impressos. Podemos criar condicionais e também loops no template. Conhecido pela sua sintaxe limpa no front, nos força a não executar lógica no HTML. Utilizamos o método **render** para enviar esta view para a requisição, e não mais o **send** ou **sendFile**

O nome do pacote é express-handlebars;

Exemplo utilizando o Handlebars:
```html
<!DOCTYPE html>
<html>
<head>
  <title>{{pageTitle}}</title>
</head>
<body>
  <h1>Bem-vindo, {{username}}!</h1>
  <ul>
    {{#each items}}
      <li>{{this}}</li>
    {{/each}}
  </ul>
</body>
</html>
```

## Instalando e utilizando o Handlebars
```bash
npm install nodemon express express-handlebars
```
No index precisamos importar os pacotes instalados, e também adicionar ao Express a engine do Handlebars. Criaremos uma view no diretório views, com a extensão handlebars;

```js
// index.js
import express from 'express'
import exphbs from 'express-handlebars'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/',(req, res)=>{
    res.render('home',{layout:false})
})
app.listen(3000)
```

- **app.engine('handlebars', exphbs.engine()):** define o mecanismo de template Handlebars para o Express. Isso indica que, quando você renderiza um arquivo com a extensão .handlebars, o Express usará o mecanismo Handlebars para processar o template.
- **app.set('view engine', 'handlebars'):** define o mecanismo de visualização padrão como Handlebars. Isso informa ao Express que ele deve usar o mecanismo Handlebars ao renderizar arquivos com extensão .handlebars.
- **res.render('home', { layout: false }):** renderiza um arquivo de template chamado 'home' (assumindo que existe um arquivo 'home.handlebars') usando o mecanismo de template Handlebars. O segundo argumento { layout: false } é um objeto de contexto que é passado para o template. Neste caso, ele define a opção de layout como falso, o que significa que nenhum layout padrão será aplicado ao template.

Agora, vamos precisar criar um diretório **views** no na raiz do nosso projeto, com o nome **home.handlebars** 

## Criando layout

Dentro da template engine Handlebars, você pode criar layouts para estruturar o conteúdo das suas páginas da web de maneira consistente e reutilizável. Layouts permitem que você defina uma estrutura comum que envolve diferentes páginas, mantendo partes compartilhadas como cabeçalhos, rodapés e menus consistentes em todas as páginas do seu site ou aplicativo.

Vamos criar uma pasta chamada layouts em views, e nela criamos o template que será repetido. Colocamos uma tag especial {{{ body }}}, Para que neste local o ‘corpo’ do site seja inserido. Em todas as nossas views agora o layout é repetido;

## Passando dados para a view

Vamos passar os dados por meio do método **render**. Enviamos um objeto com chaves e valores, e isso nos possibilita acessar estes dados no template. Vamos utilizar a sintaxe de {{ dado }} e o dado será impresso!

## Utilizando condicionais

Utilizar uma estrutura condicional nos permite mais flexibilidade no layout. Podemos utilizar o if no Handlebars. A sintaxe é: {{#if algumacoisa }} ... {{/if }}. Só imprime o que está entre as condicionais, se o resultado dela for verdadeiro.
```html
{{#if auth}}
<p>
  Você está autenticado no sistema, <a href="/dashboard">clique aqui</a> para acessar a área de membros
</p>
{{/if}}
```

O else é um complemento do if. Utilizamos no Handlebars para a exibição de outra parte do layout, caso a condição seja falsa, isso nos dá mais flexibilidade ainda. A sintaxe é: {{#if alguma coisa}} ... {{else }} ... {{#/if }}

## Estrutura de Repetição

As estruturas de repetição no Handlebars são feitas pelo operador **each**. A sintaxe é {{#each }} ... {{/each }} (semelhante ao if/else). Em um array podemos chamar os itens com: {{this }},Então cada um dos itens é acessado na view. Como o Handlebars prega um template mais limpo, devemos mandar apenas o necessário para o front-end;

## Utilizando o with

O with nos permite abstrair um objeto, ou seja, podemos acessar as propriedades sem nos referenciarmos
sempre ao objeto antes. A sintaxe é: {{#with objeto}} ... {{/with}}. Desta maneira nossa código fica ainda mais simples.

## CSS com Handlebars e Express

A inclusão de CSS no Handlebars é muito semelhante a que realizamos apenas com Express. Precisamos definir a pasta dos arquivos estáticos, e vamos linkar o CSS com o nosso layout em comum para todas as
páginas. Isso torna possível a estilizar os nossos projetos;

# Seção 8 Node.js com MySql

O MySQL é um SGBD (Sistema Gerenciador de Banco de Dados) que vai nos ajudar a trabalhar com bancos relacionais
- Os bancos de dados relacionais são constituídos por algumas entidades;
  - **Banco de dados:** Um banco para guardar os dados do projeto;
  - **Tabelas:** Onde categorizamos os dados e os inserimos;
  - **Colunas:** Onde separamos os dados em uma tabela;
  - **Dados:** O que é inserido, modificado, atualizado e removido em uma tabela;
  - **Relacionamentos:** Ligações entre as tabelas;

Também é o mais utilizado atualmente em sistemas e aplicações. Muitos projetos de Node.js utilizam MySQL. Precisamos instalar o software e deixar ele em execução para que o node possa se conectar aos bancos que temos disponíveis.

## instalação do MySql no linux

A instalação será feita via terminal, executando os serguintes comandos:

```sh
sudo apt install -y mysql-server #instala o mysql
sudo mysql_secure_installation # inicia os protocolos de segurança para a instalação do mysql
systemctl status mysql.service # Visualiza se o serviço está mesmo ativo
sudo mysql -u root # Estabelece uma conexão com o MySql

# Uma vez logado
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ab123456';
CREATE DATABASE nodeapp;
SHOW DATABASES
```

Nesse caso, todo o gerenciamento do banco de dados será feito através do terminal, porem, temos a possibilidade de usar softwares para o gerenciamento do MySql por meio de uma interface gráfica:
- workbench
- HeidiSQL
- DBeaver-ce

## Integração do MySQL e Node.js

Primeiramente vamos precisar instalar o driver, que é um pacote chamado **mysql**, e vamos instalá-lo com o **npm**! Depois precisamos conectar ao nosso banco de dados, inserindo informações como: **host, user, password e o banco.**

Criando conexão com o MySql

```js
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ab123456",
    database: "nodeapp"
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log("Conectou ao MySql")
    app.listen(port)

})
```

- **const conn = mysql.createConnection({ ... }):** Aqui, um objeto de configuração para a conexão com o banco de dados MySQL é criado usando o método createConnection do módulo mysql. O objeto de configuração especifica o host do banco de dados, nome de usuário, senha e o nome do banco de dados a ser conectado.
- **conn.connect((err) => { ... }):** Esta é a função que tenta estabelecer uma conexão com o banco de dados usando a configuração fornecida. Ela recebe uma função de retorno de chamada que é executada após a tentativa de conexão. Se um erro ocorrer durante a conexão, o parâmetro err conterá informações sobre o erro e a função de retorno de chamada será chamada. Se não houver erros, a função de retorno de chamada não receberá nenhum parâmetro.

## Criando tabelas no bando de dados criado

Vamos criar uma tabela simples com 3 colunas: id, title e quantidade de páginas, como no exemplo abaixo

```Sql
CREATE TABLE nodeapp.books (
    id INT auto_increment NOT NULL,
    title varchar(255) NULL,
    pageqty INT NULL,
    PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
```

## Inserindo dados através do Node.js

Para inserir dados no banco vamos precisar criar e executar uma **query** fazendo o uso da instrução **INSERT**. A query em si é uma **string**, seguindo os padrões do MySQL. Já para executar vamos utilizar o método query do pacote mysql;

```js
app.post('/books/insertbook',(req,res)=>{
    const {title, pageqty} = req.body
    console.log(title,pageqty)

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}')`
    conn.query(query, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})
```

## Resgatando os dados utilizando o Node.js

Para resgatar dados vamos precisar criar uma query, que será um **SELECT**. Podemos escolher quais dados são retornados, determinando as colunas, e podemos imprimi-los nas nossas views.

```js
app.get('/book',(req,res)=>{
    const query = "SELECT * FROM books"
    conn.query(query, (err,data)=>{
        if(err){
            console.log(err)
        }
        const book = data
        // console.log(book)
        res.render('book', {book})
    })
})
```

Podemos tembém resgatar um dado específico utilizando a instrução **WHERE**. Desta maneira conseguimos filtrar por uma coluna e um valor, como por exemplo: achar os livros através do ID

```js
app.get('/book/:id',(req,res)=>{
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id = ${id}`
    conn.query(query, (err,data)=>{
        if(err){
            console.log(err)
        }
        const book = data
        res.render('book', {book})
    })
})
```

## Atualizando dados

Para editar algum dado temos antes alguns preparos a realizar:
- Primeiramente vamos resgatar os dados **(SELECT)**
- E normalmente preenchemos o formulário de dados com os dados que foram resgatados **(WHERE)**;
- Isso faz com que o usuário lembre dos dados cadastrados e possa escolher o que editar
- Precisamos criar uma nova rota como POST.
  - Isso porque o navegador só consegue interpretar dois verbos atualmente **(GET ou POST)**
- E então faremos uma query de **UPDATE** para processar a atualização;
  - Note que precisamos passar o id do livro neste formulário também, onde nesse caso podemos passar um input do tipo hidden com o valor do ID

```js
app.post("/books/updatebook",(req,res)=>{
  const {id,title,pageqty} = req.body
  console.log(id,title,pageqty) 
  const query = `UPDATE books SET title = '${title}', pageqty = '${pageqty} id = ${id}'`
  conn.query(query,(err)=>{
      if(err){
          console.log(err)
          reutnr
      }
      res.redirect('/book/edit/:id')
  })
})
```

## Remover itens
Para remover um item vamos utilizar a query **DELETE**. Precisamos enviar para a rota um POST com o id do item a ser removido

```js
app.post('/book/remove/:id',(req,res)=>{
    const id = req.params.id;
    const query = `DELETE FROM books WHERE id = ${id}`
    conn.query(query,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/book/')
    })
})
```

```html
    <form action="/book/remove/{{this.id}}" method="POST">
        <input style="margin-left: 10px;" type="submit" value="Delete">
    </form>
```

## Connection Pool

Connection Pool é um recurso para otimizar as conexões, criando um cache e permitindo sua reutilização. O driver mysql tem este recurso desenvolvido, podemos aplicá-lo. Este recurso também controla as conexões abertas, fechando assim que se tornam inativas;

```js
const conn  = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Ab123456",
    database: "nodeapp"
})
```

Aqui, você está criando uma pool de conexões com o banco de dados MySQL. Uma pool de conexões é um conjunto de conexões de banco de dados pré-criadas que podem ser reutilizadas, em vez de abrir e fechar uma nova conexão toda vez que for necessário interagir com o banco de dados. Vamos analisar os parâmetros:

- **connectionLimit**: Define o número máximo de conexões simultâneas permitidas na pool. No exemplo, está definido como 10, o que significa que a pool pode conter até 10 conexões simultâneas.

## Preparando a query

Uma forma de nos defendermos de SQL Injection. Podemos utilizar interrogações em vez dos valores, e substituir através de um segundo passo, para a query ser executada corretamente. Esta técnica deve ser utilizada em qualquer programa que vá para a produção.

```js
app.post('/books/insertbook',(req,res)=>{
    const {title, pageqty} = req.body
    const query = `INSERT INTO books (??, ??) VALUES (?,?)`
    const data = ['title', 'pageqty', title, pageqty]
    conn.query(query,data, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})
```

- Uma consulta SQL preparada está sendo construída usando o template query. O uso de ?? na consulta indica placeholders para nomes de colunas que serão escapados automaticamente, ajudando a prevenir **injeções de SQL**. Os valores reais serão passados posteriormente como parte dos dados da consulta.
- Um array **data** está sendo criado, contendo os valores que serão inseridos na consulta. As primeiras duas strings ("title" e "pageqty") são os nomes das colunas, enquanto **title** e **pageqty** são os valores extraídos do corpo da requisição.
- Os placeholders **??** (chave) e **?** (valor) serão substituídos pelos valores fornecidos no array **data**.

## Apêndice: Comandos iniciais no MySql

Comandos dentro do MySQL

- **CREATE DATABASE nome_do_banco;** -> cria um banco de dados
- **SHOW DATABASES;** -> lista os bancos de dados
- **USE nome_do_banco;** -> selecionar um banco de dados em específico
- **DROP DATABASE database_name;** -> exclui um database
- **CREATE TABLE nome_da_tabela (coluna1 tipo1, …);** -> Cria uma tabela
- **SHOW TABLES;** -> lista todas as tabelas
- **DESCRIBE nome_da_tabela;** -> exibe a estrutura de uma tabela
- **INSERT INTO nome_da_tabela (coluna1, ...) VALUES (valor1, ...);** -> Insere dados em uma tabela
- **SELECT * FROM nome_da_tabela;** seleciona todos os dados de uma tabela
- **DELETE FROM nome_da_tabela WHERE condição;** -> Excluir dados de uma tabela (ex: delete from cadastro where nome=’angelo’; )
- **UPDATE nome_da_tabela SET coluna1 = valor1, coluna2 = valor2, ... WHERE condição;** -> Atualizar dados em uma tabela
- **DROP TABLE nome_da_tabela;** -> exclui uma tabela
- **SHOW STATUS;** -> Exibe informações sobre o servidor
- **TRUNCATE TABLE _table_:** Delete tudo em uma tabela, inclusive o ID

Os arquivos do MySql ficam no diretório **/var/lib/mysql**

# Seção 9 - Sequilize (ORM)

**O que é uma ORM?**

ORM é uma abreviação para **Object-Relational Mapping** ou Mapeamento Objeto-Relacional em português. É uma técnica de programação que permite que você acesse e manipule dados em um banco de dados relacional usando objetos e métodos orientados a objetos. Em vez de escrever consultas SQL manualmente (queries), você interage com os dados do banco de dados como se estivesse manipulando objetos em uma linguagem de programação (em resumo, Abstrai a complexidade das queries, para trabalharmos com métodos)

Em alguns casos uma ORM pode trazer prejuízos de performance, pois query pura executa mais rapidamente do que a ORM. E temos código “gerado”, ou seja, não vemos por baixo dos panos.

Com um ORM, as tabelas do banco de dados são mapeadas para classes de objetos e as colunas são mapeadas para atributos dessas classes. Isso facilita a interação com o banco de dados, abstraindo as complexidades do SQL subjacente e tornando o código mais legível e manutenível.

Uma ORM muito utilizada para Node.js é a **Sequelize**

**Mais sobre o Sequelize**

Sequelize é uma biblioteca Node.js de mapeamento objeto-relacional (ORM) para bancos de dados SQL e é baseada em promises (then, catch). Ele oferece uma camada de abstração sobre bancos de dados relacionais, permitindo que você manipule dados de bancos de dados SQL usando objetos JavaScript.

Caracteristicas:
- **Mapeamento de Tabelas e Colunas:** O Sequelize permite que você defina modelos JavaScript que mapeiam tabelas e colunas no banco de dados. Isso facilita a criação, leitura, atualização e exclusão de registros do banco de dados usando objetos.
- **Consultas e Relacionamentos:** O Sequelize fornece uma API para executar consultas complexas, como JOINs, filtros e ordenações. Além disso, ele permite definir relacionamentos entre modelos, como associações de um-para-um, um-para-muitos e muitos-para-muitos.
- **Migrações:** O Sequelize também suporta migrações, que são scripts que podem ser usados para criar e atualizar automaticamente o esquema do banco de dados conforme seu modelo evolui.
- **Compatibilidade com Diferentes Bancos de Dados:** O Sequelize suporta vários bancos de dados SQL, como MySQL, PostgreSQL, SQLite e Microsoft SQL Server.
- **Validações:** A biblioteca também fornece validações para garantir que os dados inseridos ou atualizados no banco de dados estejam em conformidade com regras específicas.

## Instalando o Sequelize

Para instalar o Sequelize utilizamos o pacote **sequelize** e o pacote do **mysql2** para que o sequelize crie uma ponte até a o mysql. E para conectar precisamos passar os mesmos dados que no outro pacote: **banco, usuário e senha**, instanciando a classe Sequelize. É possível checar a conexão com o método authenticate;

```js
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('orm', 'root', 'Ab123456', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Sequelize conectado com sucesso');
} catch (error) {
    console.log('Não foi possível conectar', err);
}

export default sequelize;
```
- Primeiro, a biblioteca sequelize é importada. Ela permite criar uma instância do Sequelize para interagir com bancos de dados SQL usando ORM.
- Segundo, uma instância do Sequelize é criada com as informações de conexão ao banco de dados. No exemplo, a instância é criada para se conectar a um banco de dados MySQL chamado 'orm', usando o usuário 'root' e a senha 'Ab123456'. O host indica que o banco de dados está localizado no localhost. O dialect define o tipo de banco de dados (neste caso, MySQL).
- Terceiro, O bloco try tenta autenticar a conexão com o banco de dados usando o método authenticate() da instância do Sequelize. Se a autenticação for bem-sucedida, uma mensagem é exibida no console. Se ocorrer algum erro durante a autenticação, o bloco catch captura o erro e exibe uma mensagem de erro.

## Criando um Model

Como com o sequelize não usamos queries para acessar as tabelas, vamos utilizar os Models
- Um "Model" é uma representação em código de uma tabela no banco de dados relacional. Ele permite que você interaja com os dados do banco de dados de maneira orientada a objetos, abstraindo as complexidades das consultas SQL. O id também pe criado automaticamente

Para criar um Model temos que instanciar uma classe que representará uma tabela. Um **Model User** cria uma nova tabela chamada users. Colocamos os campos e os tipos dele como propriedades do Model. E futuramente ele será utilizado para as operações entre aplicação e banco. O método **sync** faz a criação das tabelas baseada nos models.

```js
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    // Definindo os atributos do Model
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Sincroniza o Model com o banco de dados
sequelize.sync();

export default User;
```

- **DataTypes**: é uma enumeração fornecida pelo Sequelize que define os tipos de dados que podem ser usados ao definir os atributos de um Model. Ela permite que você especifique o tipo de dado que cada coluna da tabela do banco de dados irá armazenar.
- User é o nome do Model.
- Os atributos **firstName**, **lastName** e **email** correspondem às colunas na tabela Users no banco de dados.
- **DataTypes.STRING:** indica que os campos são do tipo string.
- **allowNull:** false indica que os campos não podem ser nulos.
- **unique:** true garante que o valor do campo email seja único.
- **required:** true indica diz que não pode ser um campo 'vazio', tem q ser preenchido.

De todo modo, podemos exportar esse arquivo, e importar no nosso index.js, e estabelecer a comunicação com o servidor apenas se a tabela for criada com sucesso, dessa forma:

```js
import conn from './db/conn.js' //importa a instancia com as informações do DB

conn.sync().then(()=>{
    app.listen(port)
}).catch((err)=>{
    console.log(err)
})
```

Se utilizarmos um gerenciador de banco de dados, podemos visualizar que duas coluns tam´bem foram criadas, o createdAt e o updatedAt. O **createdAt e updatedAt** são colunas especiais que muitos ORM (Object-Relational Mapping) utilizam para acompanhar quando um registro foi criado e quando foi atualizado pela última vez em uma tabela do banco de dados.
- **createdAt (Criado Em):** Essa coluna registra a data e hora exata em que um registro foi inserido na tabela. Geralmente, ela é preenchida automaticamente quando um novo registro é adicionado à tabela.
- **updatedAt (Atualizado Em):** Essa coluna registra a data e hora em que um registro foi atualizado pela última vez. Sempre que um registro é alterado, essa coluna é atualizada para refletir o momento da alteração.

## Inserindo dados com o sequelize

Para inserir um dado vamos precisar do **Model que criamos**, utilizando o método **create**. Ele leva como parâmetro todos os campos, e insere o registro na tabela. Podemos utilizar o **Async await** para evitar possivéis erros
```js
app.post('/users/create', async(req,res)=>{
    let {name, occupation, newsletter} = req.body
    console.log(name,occupation,newsletter)
    if(newsletter === 'on'){ // caso o newsletter for verdadeiro, o retorno será de 'on' 
        newsletter = true
    } else{
        newsletter = false
    }
    await User.create({name,occupation,newsletter})
    res.redirect('/')
})
```

## Lendo dados com o sequelize

Para ler os dados de uma tabela vamos utilizar o método **fetchAll**, que também requer o model (no nosso caso o User). Os dados vem em um objeto especial, para transformar em um array de objetos temos que inserir um parâmetro, que é o **raw** como **true**.

```js
app.get('/', async(req,res)=>{
    const users = await User.findAll({raw:true})
    console.log(users)
    res.render('home', {users})
})
```

## Utilizando o WHERE

Para filtrar dados com o Sequelize utilizando o WHERE, precisamos inserir um novo parâmetro, que será o where, um objeto onde colocamos a propriedades e valores que queremos filtrar. E para retornar apenas um resultado podemos utilizar o método findOne. 

Podemos passar apenas um valor para ser filtrado, como podemos passar mais de um valor. No exemplo abaixo, foi utilizado os métodos **then e catch** ao invés do **async/await**

```js
app.get('/users/:id', async(req,res)=>{
    const id = req.params.id;
    User.findOne({raw:true, where: {id:id}}).
        then(
            (user)=>{
                res.render('userview',{user})
            }
        ).
        catch((err)=>console.log(err))
})
```

## Removendo itens
Para remover itens utilizando o método **destroy** juntamente com o **where**.

```js
app.post('/users/delete/:id',(req,res)=>{
    const id = req.params.id;
    User.destroy({
        where: {id:id}
    }).then((user)=>{
        res.redirect('/')
    }).catch((err)=>console.log(err))
})
```

## Atualizando o dado no banco
Para realizar a query de UPDATE vamos utilizar o método **update** do Sequelize. Nele passamos o objeto atualizado do item, e também filtramos por meio do atributo **where**, que item vamos atualizar;

```js
app.post('/users/update',(req,res)=>{
    let {id,name,occupation,newsletter} = req.body;
    newsletter === 'on'? newsletter = true : newsletter = false
    const userData = {
        id,name,occupation,newsletter
    }
    User.update(userData,{
        where:{id}
    }).then((user)=>{
        res.redirect('/')
    }).catch((err)=>console.log(err))
})
```

## Refazer as tabelas
Podemos forçar a reconstrução das tabelas através do método sync, onde são sincronizados os models e as tabelas. Vamos colocar um atributo: **force como true**;
```js
conn.sync({force:true}).then(()=>{
    app.listen(port)
}).catch((err)=>{
    console.log(err)
})
``` 
Note que os dados são perdidos neste processo;

## Relacionamentos (Constraints)
Em bancos relacionais podemos criar relacionamentos entre as tabelas (onde uma tabela pode chamar a outra, como no caso de um determinado pedido associado a um usuário em questão). Para concretizar isso no Sequelize vamos precisar de dois Models, ou seja, precisamos criar mais um no nosso projeto. Depois precisamos inserir um método de relacionamento em algum dos models que vai criar a relação. Após o sync uma coluna que faz a relação entre as tabelas será criada

Isso representa a **FOREIGN KEY**

## Criando um model com relacionamento

Para criar um relacionamento entre models, vamos primeiro criar outro model que queremos fazer a associação, e por fim, vamos criar o relacionamento entre eles. Existem quatro tipos principais de relacionamentos suportados pelo Sequelize: "**hasOne**", "**belongsTo**", "**hasMany**" e "**belongsToMany**".

- **hasOne**: Um relacionamento "hasOne" é usado quando uma instância de um modelo está associada a uma única instância de outro modelo. Por exemplo, imagine um cenário onde um usuário tem uma única configuração. O modelo de usuário teria um relacionamento "hasOne" com o modelo de configuração.
- **belongsTo**: Um relacionamento "belongsTo" é a contrapartida do "hasOne". Ele é usado quando uma instância de um modelo está associada a uma única instância de outro modelo, mas é o modelo associado que mantém a chave estrangeira. Por exemplo, em um relacionamento entre um pedido e um cliente, o pedido "pertence a" um cliente.
- **hasMany**: Um relacionamento "hasMany" é usado quando uma instância de um modelo está associada a várias instâncias de outro modelo. Por exemplo, um autor pode ter vários livros. Nesse caso, o modelo de autor teria um relacionamento "hasMany" com o modelo de livro.
- **belongsToMany**: Um relacionamento "belongsToMany" é usado para modelar associações muitos-para-muitos entre dois modelos. Por exemplo, imagine um relacionamento entre alunos e disciplinas. Um aluno pode se inscrever em várias disciplinas e uma disciplina pode ter vários alunos. Esse relacionamento exigiria uma tabela intermediária no banco de dados para rastrear essas associações.

```js
import {DataTypes} from 'sequelize'
import db from '../db/conn.js'
import User from './User.js'

const Address = db.define('Address',{
    street: {
        type: DataTypes.STRING,
        required:true
    },
    number:{
        type: DataTypes.STRING,
        required: true
    },
    city:{
        type: DataTypes.STRING,
        required:true 
    }
});
Address.belongsTo(User) //O Model Address pertence ao model User
export default Address
// vamos Refazer as tabelas com o metodo force antes de começar a utilizar os relacionamentos
```

## Adicionando dado relacionado
Para adicionar o dado relacionado o fluxo é quase o mesmo. O grande detalhe é que precisamos passar o **id do item** que o relaciona.

HTML:
```html
<form action="/address/create" method="POST">
    <input type="hidden" name="UserId" value="{{user.id}}"> 
    <div>
      <label for="street">Rua:</label>
      <input type="text" name="street" placeholder="Digite o nome da rua">
    </div>
        <div>
      <label for="number">Número:</label>
      <input type="text" name="number" placeholder="Digite o número da residência">
    </div>
        <div>
      <label for="city">Cidade:</label>
      <input type="text" name="city" placeholder="Digite o nome da cidade">
    </div>
    <input type="submit" value="Incluir endereço">
</form>
```
Os campos "name" precisa ser igual a colua criada dentro do banco de dados "address"

Javascript:
```js
app.post('/address/create/',(req,res)=>{
    const {UserId, street, number,city} = req.body
    const UserData = {
        UserId,street,number,city
    }
    Address.create(UserData).then((user)=>{
        res.redirect(`/users/edit/${UserId}`)
    }).catch((err)=>console.log(err))
})
```
- **UserId**: Essa coluna representa uma **chave estrangeira** que se refere ao ID do usuário associado a este endereço. Isso indica qual usuário tem esse endereço. O relacionamento entre essa tabela de endereços e uma tabela de usuários é estabelecido através dessa chave estrangeira.

## Resgatando dados relacionados
Precisamos definir as relações entre os dois Models, podemos fazer isso no Model de endereços. Depois basta utilizar o operador **include** com o nome do Model, onde estamos resgatando o dado, isso faz com que os registros associados também venham na seleção. Como há dados relacionados, precisamos remover o **raw**

```js
app.get('/users/edit/:id',(req,res)=>{
    const id = req.params.id;
    User.findOne(
        {include:Address, where: {id:id}} //remover o "raw" e substituir pelo "include"
    ).then((user)=>{
        res.render('useredit', { user: user.get({plain:true}) })
    }).catch((err)=>console.log(err))
})
```
- **User.findOne(...):** Esta é uma operação de consulta à base de dados usando o modelo User. A função findOne é usada para encontrar um único registro na tabela de usuários com base em determinados critérios.
- **{ include: Address, where: { id: id } }:** Isso define as opções da consulta. Está solicitando ao banco de dados para encontrar um usuário com um determinado id e incluir os dados da relação com o modelo Address. Isso provavelmente significa que um usuário tem um endereço associado e você está buscando esses detalhes.
- **.then((user) => {...}):** Após a consulta ser concluída com sucesso, a função passada para then é executada. O objeto user é o resultado da consulta.
- **res.render('useredit', { user: user.get({ plain: true }) });:** Aqui, você está renderizando um modelo de visualização chamado 'useredit', passando os dados do usuário encontrado. O método get({ plain: true }) é usado para converter o objeto do usuário em um objeto JavaScript simples, sem os métodos e propriedades do Sequelize.


```html
<div class="address-list">
    <h2>Lista de endereços:</h2>
    {{#each user.Addresses}}
      <p>#{{this.id}} - {{this.street}} - {{this.number}} - {{this.city}}</p>
    {{/each}}
  </div>
```

Diferença entre **include** e **raw**

- **include**: O include é usado para realizar junções de tabelas (joins) no momento da consulta. Isso permite que você traga informações de tabelas relacionadas junto com a consulta principal. No seu caso, você está usando o include para trazer os detalhes do endereço relacionado ao usuário na consulta.
- **raw:** O raw é utilizado para obter os resultados da consulta em formato bruto, ou seja, não são instâncias de modelos Sequelize. Isso pode ser útil quando você deseja apenas os dados brutos sem a manipulação ou transformação feita pelo Sequelize.

## Removendo relacionados
Para remover itens relacionados utilizaremos o mesmo processo de remoção de itens. Criaremos um formulário que envia o id do item. E uma rota para receber estas informações e executar a remoção,
utilizando o método **destroy**;

```js
app.post('/address/delete',(req,res)=>{
    const id = req.body.id;
    Address.destroy({
        where:{id:id}
    }).then((user)=>{
        res.redirect('/')
    }).catch((err)=>console.log(err))
})
```



## Resumindo o Sequelize:

Sequelize é uma biblioteca Node.js de mapeamento objeto-relacional (ORM - permite o acesso e a manipulação de dados em um banco de dados relacional usando objetos e métodos orientados a objetos) para bancos de dados SQL e é baseada em promises (then, catch).

Para a utilização do Sequelize, precisamos baixar o **mysql2** e criar uma conexão com o banco de Dados da seguinte forma:

```js
const sequelize = new Sequelize(DB_name, user, passwd, {
    host: 'localhost',
    dialect: DB_type //mysql
});
```

Ao invés de utilizarmos Queries, vamos utilizar o Models para acessar e gerenciar as tabelas dentro do nosso banco de dados:

```js
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    // Definindo os atributos do Model
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Sincroniza o Model com o banco de dados
sequelize.sync();

export default User;
```

- O método **sync** faz a criação das tabelas baseada nos models.
- **DataTypes**: é uma enumeração fornecida pelo Sequelize que define os tipos de dados que podem ser usados ao definir os atributos de um Model. Ela permite que você especifique o tipo de dado que cada coluna da tabela do banco de dados irá armazenar.
- O **User** é um Model

Nesse exemplo, teremos uma tabela com 5 colunas:
- id
- firstName
- lastName
- email
- createdAt
- updatedAt

Temos também a opção de importar e exportar o sequelize como um promisse e liberar o **lister** da porta apenas se a conexão for estabelecida

```js
import conn from './db/conn.js' //importa a instancia com as informações do DB

conn.sync().then(()=>{
    app.listen(port)
}).catch((err)=>{
    console.log(err)
})
```

**Métodos do sequelize**

- **User.create({dados})**: insere dados dentro do DB (precisa corresponder as colunas)
- **User.findAll({raw:true})**: lê os dados de um DB (o "**raw=true** serve para transformar em um array de objetos simples os dados lidos)
- **User.findOne({raw:true, where: {id:id}})**: Serve para filtrar os dados com base no que foi passado dentro dos parâmetros (posso passar mais de uma informação para ser filtrado, ao invés de só o "id")
- **User.destroy({where: {id:id}})**: remove um item dentro do banco de dados (importante passar o **where** para que não seja deletado todas as colunas)
- **User.update(userData,{where:{id}})**: serve para atualizar os dados dentro de um db 


## Seção 10 - MVC

**O que é MVC?**

MVC significa "Model-View-Controller" (Modelo-Visão-Controlador), que é um padrão de arquitetura de software amplamente utilizado no desenvolvimento de aplicativos (as deixando mais organizadas), especialmente em aplicações web. A principal vantagem do padrão MVC é a separação clara de preocupações (A aplicação é dividida em camadas, cada uma com sua responsabilidade). Isso facilita a manutenção, a escalabilidade e a reutilização do código, pois cada componente é independente dos outros. Além disso, diferentes equipes podem trabalhar em paralelo em diferentes partes da aplicação sem interferir umas com as outras. O padrão MVC separa a aplicação em três componentes distintos, cada um com sua própria responsabilidade:
- **Modelo (Model):** 
  - É uma camada onde vamos interagir com o banco de dados e normalmente interage com os arquivos do Controller.
  - Responsável por resgatar, atualizar, remover e criar dados (crud)
  - É comum que cada tabela seja um Model, assim como fazemos com o setup do Sequelize.
  - Os Models são quem controlam a arquitetura do sistema
- **Visão (View):** 
  - A visão é responsável pela apresentação dos dados que estão no banco ao usuário. 
  - Ela lida com a interface gráfica e a representação visual dos dados. A visão não contém lógica de negócios, apenas exibe as informações ao usuário de acordo com as instruções do **controlador**.
  - E também nas views temos a interação com o usuário, como formulários para inserir dados no sistema (É correto não haver lógica/regra de negócios na view, ou o mínimo possível).
- **Controlador (Controller):** 
  - O controlador atua como intermediário entre o Model e a View. 
  - Ele recebe as entradas do usuário, processa as ações correspondentes e atualiza o modelo ou a visão conforme necessário. 
  - O controlador também contém a lógica que coordena o fluxo de dados e a interação entre o modelo e a visão.
  - Os Controllers terão um código parecido com os das rotas

## Estrutura de pastas com o MVC
- **controllers**: pasta que ficam os arquivos de Controller;
- **models**: pasta que ficam os arquivos de Model;
- **views**: pasta que ficam os arquivos de View;
- **routes**: pasta que ficam os arquivos de rotas;
- **index.js**: arquivo que inicializa a aplicação;

## Criando um MVC

- Primeiro vamos criar um Model chamado **Task**, passando essas informações:
- Depois, vamos criar um Controller, chamado **TaskController**, importando o Model criado
  - Dentro do arquivo TaskController, vamos criar uma classe chamada TaskController,
  - Depois vamos criar um método estático chamado createTask 
- Depois vamos em views, e vamos criar um diretório para nossas views
- Agora vamos criar as rotas
  - Vamos criar um arquivo chamado taskRoutes.js
  - Vamos importar:
    - Router do express
    - TaskController.js
  - Vou criar as rotas e logo em seguida exportar
  - No index.js, vamos dar um express.use() e usar as rotas criadas