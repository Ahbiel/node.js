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
  - receber uma requisição e enviar código HTML como resposta, por exemplo. Nesse caso, sempre trabalhamos com uma requisição (req) e uma resposta (res)
  - Vamos utilizar alguns métodos como **createServer**, para criação do servidor;
  - E também listen, para determinar a porta;
- **path**: extrair informações de paths (caminhos) de arquivos;
- **fs**: file system, leitura e escrita de arquivos;
- **url**: módulo para trabalhar com URLs;
  - O módulo url serve para decompor uma URL que passamos para o método parse.
  - Podemos resgatar as seguites informações de uma requisição: **host**, **path**, **search**, **query** e etc;

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

