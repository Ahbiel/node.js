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
var repetir = texto.repeat(3) //Hello, World!Hello, World!Hello, World!

var frutas = ["maçã", "banana", "uva", "laranja"];
var resultado = frutas.join(", "); // Retorna "maçã, banana, uva, laranja"


