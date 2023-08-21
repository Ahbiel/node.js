# Conceitos importantes sobre JavaScript

### Trabalhando com arrays em JS
Um array (arranjo ou vetor) é um conjunto de dados (que pode assumir os mais diversos tipos, desde do tipo primitivo, a objeto dependendo da linguagem de programação). Arrays são utilizados para armazenar mais de um valor em uma única variável

**Métodos de manipulação de array:**
- **push()**: Adiciona um ou mais elementos ao final do array.
- **pop()**: Remove e retorna o último elemento do array.
- **unshift()**: Adiciona um ou mais elementos ao início do array.
- **shift()**: Remove e retorna o primeiro elemento do array.
- **concat()**: Combina dois ou mais arrays, criando um novo array resultante.
- **join()**: Combina todos os elementos de um array em uma string, usando um separador especificado.
- **slice()**: Retorna uma cópia superficial de uma parte do array, especificada por um índice inicial e final.
- **splice()**: Modifica um array, adicionando, removendo ou substituindo elementos em posições específicas.
- **indexOf()**: Retorna o índice da primeira ocorrência do elemento no array.
- **lastIndexOf()**: Retorna o índice da última ocorrência do elemento no array.
- **every()**: Verifica se todos os elementos do array passam por um teste.
- **some()**: Verifica se pelo menos um elemento do array passa por um teste.
- **find()**: Retorna o primeiro elemento que passa por um teste.
- **findIndex()**: Retorna o índice do primeiro elemento que passa por um teste.
- **sort()**: Ordena os elementos do array de acordo com a função de classificação fornecida.
- **reverse()**: Inverte a ordem dos elementos no array.
- **includes()**: Verifica se um array contém um determinado elemento e retorna true ou false.
- **isArray()**: Verifica se um valor é um array.

**Métodos de loop com array**

**forEach():** o loop forEach é uma construção essencial na linguagem de programação JavaScript, usada para percorrer elementos de uma lista (como um array) e executar uma função para cada elemento individualmente
```js
array.forEach(function(element, index, array) {
  // código a ser executado para cada elemento
});
```
Onde: 
- **array:** O array que será percorrido.
- **element:** O elemento atual do array durante a iteração.
- **index (opcional):** O índice do elemento atual no array.
- **array (opcional):** O próprio array sendo percorrido.

**map()**: O método map() é uma função de alta ordem (higher-order function) em JavaScript que é utilizada para percorrer um array e criar um novo array, aplicando uma função de transformação a cada elemento do array original
```js
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(function(number) {
  return number * 2;
});
console.log(doubledNumbers); // [2, 4, 6, 8, 10]

```

**filter():** O método filter() é uma função de alta ordem (higher-order function) em JavaScript que é utilizada para percorrer um array e criar um novo array contendo apenas os elementos que atendem a um determinado critério ou condição. Ele é uma forma eficaz e conveniente de filtrar elementos de um array com base em um teste definido pela função de filtro.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = numbers.filter(function(number) {
  return number % 2 === 0;
});
console.log(evenNumbers); // [2, 4, 6, 8, 10]
```
**reduce():** O método reduce() é uma função de alta ordem (higher-order function) em JavaScript que é utilizada para percorrer um array e acumular seus elementos em um único valor. É uma maneira poderosa de realizar operações de redução em um array, como somar todos os elementos, calcular a média, concatenar strings, entre outros. O método reduce() permite que você aplique uma função iterativamente a cada elemento do array e acumule o resultado ao longo do processo.

```js
const resultado = arrayOriginal.reduce(function(acumulador, elemento, índice, array) {
  // Realiza uma operação no acumulador usando o elemento atual
  return novoValorDoAcumulador;
}, valorInicial);
```

- **arrayOriginal:** O array que será percorrido e reduzido.
- **acumulador:** O valor acumulado que é atualizado a cada iteração.
- **elemento:** O elemento atual do array durante a iteração.
- **índice (opcional):** O índice do elemento atual no array.
- **array (opcional):** O próprio array sendo percorrido.
- **valorInicial (opcional):** O valor inicial do acumulador.

Exemplo:
```js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(function(acumulador, number) {
  return acumulador + number;
}, 0);
console.log(sum); // 15
```

**Spread**: O operador spread (...) em JavaScript é uma funcionalidade poderosa que permite espalhar os elementos de um array, objeto ou string em lugares onde múltiplos elementos são esperados
```js
const originalObj = { a: 1, b: 2 };
const newObj = { ...originalObj, c: 3, d: 4 };
console.log(newObj); // { a: 1, b: 2, c: 3, d: 4 }
```
```js
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const concatenatedArray = [...array1, ...array2];

console.log(concatenatedArray); // [1, 2, 3, 4, 5, 6]
```
**rest:** o parâmetro rest (...) em JavaScript é uma característica que permite que uma **função** aceite um número variável de argumentos como um array. Ele é usado para capturar argumentos extras em uma função em forma de array, tornando mais flexível o processamento de entradas de diferentes tamanhos sem precisar declarar parâmetros individuais para cada um. O parâmetro rest é frequentemente usado quando não se sabe antecipadamente quantos argumentos serão passados para uma função.

```js
function calcularSoma(...numeros) {
  let soma = 0;
  for (const numero of numeros) {
    soma += numero;
  }
  return soma;
}

console.log(calcularSoma(1, 2, 3));       // Saída: 6
console.log(calcularSoma(5, 10, 15, 20)); // Saída: 50
```

**for... in:** o loop for...in é usado para percorrer as propriedades enumeráveis de um objeto. Ele itera sobre as chaves (nomes de propriedades) de um objeto, permitindo que você acesse os valores associados a essas propriedades.
```js
for (const key in objeto) {
  if (objeto.hasOwnProperty(key)) {
    const value = objeto[key];
    // Código a ser executado para cada propriedade
  }
}
```
onde:
- **key:** A chave (nome da propriedade) atual sendo iterada.
- **objeto:** O objeto que está sendo percorrido.

Exemplo:
```js
const person = {
  name: 'Alice',
  age: 30,
  occupation: 'Engineer'
};

for (const key in person) {
  console.log(key, person[key]);
}
```

**for...of:** o loop for...of é usado para percorrer os valores de objetos iteráveis, como arrays, strings, conjuntos (Set), mapas (Map) e outras estruturas semelhantes.

```js
for (const element of iteravel) {
  // Código a ser executado para cada elemento
}
```
onde:
- **element:** O elemento atual sendo iterado.
- **iteravel:** A coleção iterável que está sendo percorrida.

Exemplo:
```js
const numbers = [1, 2, 3, 4, 5];

for (const num of numbers) {
  console.log(num);
}
```
O loop **for...in** itera sobre as propriedades enumeráveis de um objeto, enquanto o loop **for...of** itera sobre os valores de coleções iteráveis.
O loop **for...in** é mais adequado para objetos, pois ele percorre propriedades de objetos, mas é menos recomendado para arrays, devido a possíveis problemas com propriedades herdadas.
O loop **for...of** é mais simples e direto para percorrer os elementos de uma coleção. É amplamente utilizado para iterar sobre arrays e outras estruturas iteráveis.

Em resumo, o **for...in** é usado para percorrer as propriedades de objetos, enquanto o **for...of** é usado para percorrer os valores de coleções iteráveis. A escolha entre eles depende da natureza dos dados que você está manipulando e do resultado que deseja alcançar.

## Armazenar dados no navegador:
- **localStorage.setItem("chave","valor")** -> cria um item no brawser
  - ou localStorage.chave = "valor"
- **localStorage.removeItem("chave")** remove este item do brawser
- **localStorage.getItem("chave")** obtém o valor do item no brawser
  - pode ser substituído por localStorage.chave
- verificar se a chave foi criada utilizando um **if(localStorage.key)/else**

### Trabalhando com objetos

Dentro do JavaScript, objetos são estruturas fundamentais que permitem armazenar e organizar dados de maneira flexível e eficiente. Um objeto é uma coleção de pares de chave-valor, em que cada chave é uma string única que identifica um valor associado a ela

1. Notação Literal de Objeto: Você pode criar objetos usando a notação literal, que envolve colocar pares chave-valor entre chaves {}. Por exemplo:

```js
const pessoa = {
    nome: "João",
    idade: 30,
    profissao: "Engenheiro"
};
console.log(pessoa.nome); // Saída: João
console.log(pessoa['idade']); // Saída: 30
```
2. Métodos: Além de propriedades, um objeto também pode conter métodos, que são funções associadas a ele:

```js
const calculadora = {
    soma: function(a, b) {
        return a + b;
    },
    subtracao(a, b) {
        return a - b;
    }
};

console.log(calculadora.soma(5, 3)); // Saída: 8
```

3. Usando o **New object**
```js
var restaurantes = new Object();
restaurantes.entrada = [
   "frango grelhado",
   "carne assada",
]
valor = "principal"
restaurantes[valor] = "estrogonofe"
restaurantes["bebidas"] = [
   "coca-cola",
   "pepsi",
]


restaurantes.sobremesa = "sorvete"
console.log(restaurantes);
```

4. Funções construtoras:

```js
function Escola(nota,aluno){
   this.notas = nota
   this.nome = aluno
}
aluno1 = new Escola(100,"Angelo")
aluno2 = new Escola(80,"João")
aluno3 = new Escola(87,"Caio")
console.log(aluno1,"\n",aluno2,"\n",aluno3);
```

IMPORTANTE:
- Dentro de objetos, utilizamos o atributo this para fazer referência ao objeto atual
- Podemos criar outros objetos e arrays dentro de objetos
- Podemos criar funções dentro de objetos

### OOP e classes

Programação orientada a objetos (POO ou OOP) é uma coleção de objetos que podem ou não comunicar entre si, ou seja, é um paradigma aplicado na programação que consiste na interação entre diversas unidades chamadas de objetos.
por meio das classes, eu posso instanciar novos objetos (os objetos são como classes vivas e dinâmicas)


Dentro de um objeto, podemos ter:
- **constructor**: ele é um método que é chamado toda vez que eu instanciar um determinado objeto, ou seja, ele será chamado durante a criação do objeto de uma determinada classe, podemos passar parâmetros para a classe e executar determinadas validações ou funções dentro desse contexto.
- **this**: trata-se do próprio escopo atual onde o mesmo está sendo referenciado, é usado para referenciarmos a própria classe (tratando-se apenas de OO) dentro de funções ou métodos.

```js
class Carro{ //criar uma classe chamada carro
   constructor(){ 
       this.cor = vermelho
       console.log(this.cor)
   }
}
let c1 = new Carro() //vou instanciar o objeto dessa classe
let c2 = new Carro() //o que eu fizer com uma instância, só se aplica a esta instância, e não a outras
//nesse exemplo, o método constructor será chamado duas vezes

//preciso usar o this para fazer referências às instâncias, se não será uma variável do método constructor
```
Outro exemplo de um POO:
```js
class Carro{
	constructor(c){
		this.cor=c
		console.log(this.cor)
	}
}
let c1=new Carro("vermelho")
let c2=new Carro("preto")
```

### Métodos de um OOP:

Além do método constructor, eu consigo criar outros métodos dentro de uma classe, porém, diferente do método constructor, os outros métodos é necessário ser chamado para ser executado

- **setter (set)**: serve para atribuir ou alterar valores dos atributos do objeto; esse método obrigatoriamente precisa de um parâmetro
```js
class Carro{
	constructor(c){
		this.cor=c
	}
    set mudar(v){ 
        this.cor = v
    }
}
let c1=new Carro("vermelho")
let c2=new Carro("preto")
c2.mudar = "Amarelo"
console.log(c1.cor) //vermelho
console.log(c2.cor) //amarelo
```
- **getter (get)**: pega o retorno de algum valor dentro da classe

```js
class Carro{
	constructor(c){
		this.cor=c
	}
    get readNovo(){
        return `${this.cor}`
    }
}
let c1=new Carro("vermelho")
let c2=new Carro("preto")
console.log(c1.readNovo)
console.log(c2.readNovo)
```

## Promise:

As Promises (Promessas) proporcionam uma maneira mais eficiente e estruturada de lidar com operações assíncronas, como chamadas de **API**, **leitura/gravação de arquivos** e outras tarefas que **não podem ser executadas imediatamente**. 
Basicamente, as Promises tornam um código **síncrono** em um código **assíncrono** (o processamento síncrono é aquele que acontece em sequência e ordenado, seguindo uma fila, e o outro processamento assíncrono só começa após o atual ser concluído.)

Uma Promise representa uma operação que está em andamento ou foi concluída, mas cujo resultado pode não estar disponível imediatamente. Ela pode estar em um dos três estados:
- **Pending (Pendente):** O estado inicial, onde a Promise ainda está em andamento e aguardando um resultado.
- **Fulfilled (Cumprida):** A operação foi concluída com sucesso e o resultado está disponível. Nesse caso, a Promise passa para o estado "cumprida" e chama a função de retorno (resolve) que você especificou ao criar a Promise.
- **Rejected (Rejeitada):** A operação falhou e o resultado não está disponível. A Promise entra no estado "rejeitado" e chama a função de retorno (reject) que você definiu ao criar a Promise.

Temos também os retornos das promessas, são elas:
- **.then:** retornar o resolve se o código executou corretamente
- **.catch:** retorna o erro caso o programa não tenha sido executado corretamente


1. Exemplos

```js
var testar = new Promise((res,rej)=>{
   let x = 130
   if(x==10){
       res("sucesso")
   }
   else{
       rej("ERRO")
   }
})
testar
    .then(sucesso=>console.log(sucesso))
   	.catch(erro =>console.log(erro))
```

2. exemplo

```js
const getTaxAmount = (price, taxRate) => {
   return Promise.resolve(Math.floor((price*taxRate) / 100))
};
getTaxAmount(100, 12).then((taxAmount) => console.log(taxAmount));
```

3. exemplo

```js
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    // Simulando uma chamada assíncrona, por exemplo, uma requisição HTTP
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: 'Usuário' });
      } else {
        reject('Usuário não encontrado');
      }
    }, 1000);
  });
};

// Usando a Promise
fetchUserData(1)
  .then(user => {
    console.log('Dados do usuário:', user);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
```

Na prática, não usamos muito o **new Promise**, pois nesse caso, estamos criando nossas próprias promessas. Na prática usamos muito mais promessas prontas como é o caso de requisições de APIs, na qual usamos o **.then** e o **.catch** normalmente, como no exemplo abaixo:

```js
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);
fetchPromise.then((resposta) => {
 console.log(`Resposta recebida: ${resposta.status}`);
});
console.log("Requisição iniciada…");
```


## Async e Await

O async/await fornece uma maneira mais simples e síncrona de lidar com operações assíncronas, tornando o código assíncrono mais parecido com o código síncrono tradicional.

O async/await é construído sobre o conceito de Promises e permite que você escreva código assíncrono de maneira mais linear, como se estivesse escrevendo código síncrono. Ele consiste em dois componentes principais:
- **Async Functions (Funções Assíncronas):** Uma função marcada como async automaticamente retorna uma Promise. Isso permite que você use o await dentro dessa função para pausar a execução até que uma Promise seja cumprida ou rejeitada. As funções assíncronas são ideais para encapsular operações assíncronas e tratá-las de maneira mais natural.
- **Await Operator (Operador Await):** O operador await é usado dentro de uma função assíncrona para aguardar o resultado de uma Promise. Ele pausa a execução da função até que a Promise seja cumprida, permitindo que você continue a execução do código de forma síncrona. Isso ajuda a evitar aninhamento excessivo de callbacks e torna o código mais legível.


1. exemplo:

```js
const loop = new Promise((res)=>{
   setTimeout(()=>{
       console.log("Hello world");
       res()
   },3000)
})
async function wait(){
   await loop
   console.log("Olá mundo")
}
wait()
```

2. exemplo:

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Dados obtidos com sucesso');
    }, 1000);
  });
}

async function main() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error('Erro:', error);
  }
}

main();
```


Função de callback