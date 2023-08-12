# Conceitos importantes sobre JavaScript

#### Trabalhando com arrays em JS
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
