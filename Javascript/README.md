# Conceitos importantes sobre JavaScript

## Using the DOM API

DOM stands for Document Object Model. It is an object-oriented representation of structured documents like XML and HTML. Setting the **textContent** property of an Element is one way to output text on a web page.

```html
<p id="paragraph"></p>

<script>
    document.getElementById("paragraph").textContent = "Hello, World";
</script>
```

You can also use JavaScript to **create a new HTML element** programmatically. For example, consider an HTML document with the following body:
```html
<body>
    <h1>Adding an element</h1>
</body>

<script>
    var element = document.createElement('p');
    element.textContent = "Hello, World";
    document.body.appendChild(element); //add the newly created element to the DOM
</script>
```

## Properity window

**window.alert(message)**: The alert method displays a visual alert box on screen. The alert method parameter is displayed to the user in plain text:

**window.prompt(message)**: An easy way to get an input from a user is by using the prompt() method.

**window.confirm(message)**: The window.confirm() method displays a modal dialog with an optional message and two buttons, OK and Cancel (is a boolean). Window.confirm() is typically used to ask for user confirmation before doing a dangerous operation like deleting something in a Control Panel

## Trabalhando com String:

- **length**: O método length retorna o número de caracteres em uma string.
- **charAt(index):** Retorna o caractere localizado no índice especificado.
- **concat(str1, str2, ...):** Combina duas ou mais strings e retorna uma nova string resultante da concatenação.
- **toUpperCase() e toLowerCase():** Convertem todos os caracteres em maiúsculas ou minúsculas.
- **substring(start, end):** Extrai uma porção da string com base nos índices de início e fim (não inclui o caractere no índice de fim).
- **indexOf(substring, startIndex) e lastIndexOf(substring, startIndex): **Encontra a primeira (ou última) ocorrência de uma substring a partir de um índice específico
- **replace(oldValue, newValue):** Substitui a primeira ocorrência de uma substring por outra.
- **split(separator):** Divide uma string em um array de substrings com base no separador especificado.
- **trim():** Remove espaços em branco no início e no final da string.
- **charAt(index): **Retorna o caractere localizado no índice especificado.
- **join():** é utilizado para converter um array em uma string, concatenando os elementos do array usando um separador especificado. Ele retorna uma nova string contendo os elementos do array, separados pelo separador fornecido.
- **reverse():** é utilizado para inverter a ordem dos elementos em um array. Ele modifica o array original, reorganizando os elementos na ordem inversa.

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

```js
var texto = "Hello, World!";
var tamanho = texto.length; // Retorna 12
var caractere = texto.charAt(4); // Retorna "o"
var maiusculo = texto.toUpperCase(); // Retorna "HELLO, WORLD!"
var minusculo = texto.toLowerCase(); // Retorna "hello, world!"
var subtexto = texto.substring(0, 5); // Retorna "Hello"
var primeiraOcorrencia = texto.indexOf("World"); // Retorna 7
var ultimaOcorrencia = texto.lastIndexOf("l", 15); // Retorna 10
var novoTexto = texto.replace("World", "Mundo"); // Retorna "Hello, Mundo!"
var dividir = texto.split(","); // retorna [ 'Hello', ' World!' ]
var caractere = texto.charAt(4); // Retorna "o"
var slice = texto.slice(0,5) //hello
var include = texto.includes('Hello') //true

var frutas = ["maçã", "banana", "uva", "laranja"];
var resultado = frutas.join(", "); // Retorna "maçã, banana, uva, laranja"
var repetir = texto.repeat(3) //Hello, World!Hello, World!Hello, World!
```