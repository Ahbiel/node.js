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

