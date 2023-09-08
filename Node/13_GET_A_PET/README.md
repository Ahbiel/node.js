# GET A PET

## Configurações inicias

Primeiro, vamos instalar as seguintes bibliotecas
```sh
npm i bcrypt cookie-parser cors express jsonwebtoken mysql2 sequelize mongoose multer nodemon 
```
onde:

- **bcrypt:** É uma biblioteca para criptografar senhas. É comumente usada para armazenar senhas de forma segura em bancos de dados.
- **cookie-parser:** é uma biblioteca que facilita a manipulação de cookies HTTP em aplicativos Node.js. Os cookies são pequenos pedaços de dados armazenados no lado do cliente (navegador) e são frequentemente usados para manter o estado da sessão, lembrar preferências do usuário e realizar a autenticação do usuário.
- **cors:** O CORS é uma sigla para Cross-Origin Resource Sharing, que se refere a uma política de segurança implementada pelos navegadores da web. Essa política restringe solicitações feitas a um domínio diferente do domínio da página que está fazendo a solicitação. Isso é uma medida de segurança para evitar ataques de origem cruzada (cross-origin attacks). A biblioteca cors em Node.js ajuda a lidar com essas políticas de segurança de forma programática. Ela permite que você configure quais domínios podem acessar recursos do seu servidor, definindo os cabeçalhos HTTP apropriados nas respostas do servidor. Isso é especialmente útil ao construir APIs que precisam ser acessadas por clientes em diferentes domínios, como aplicações web front-end.
- **jsonwebtoken:** JSON Web Tokens (JWTs) são uma forma de representar informações de maneira segura entre duas partes. Eles são frequentemente usados para autenticação e autorização em aplicativos web e APIs. O jsonwebtoken permite criar tokens com informações específicas, assiná-los com uma chave secreta e verificá-los posteriormente para garantir sua integridade.
  - **Token:** Um JWT é um token que consiste em três partes: cabeçalho (header), payload (carga útil) e assinatura (signature).
  - **Cabeçalho (Header):** O cabeçalho contém informações sobre o tipo de token e o algoritmo de assinatura usado.
  - **Payload (Carga Útil):** A carga útil contém as informações que você deseja transmitir, como dados do usuário.
  - **Assinatura (Signature):** A assinatura é gerada usando a chave secreta do servidor e é usada para verificar se o token foi alterado.
- **mysql2:** É um driver para interagir com bancos de dados MySQL a partir de aplicativos Node.js. Ele permite que você execute consultas SQL em um banco de dados MySQL.
- **sequelize:** Uma biblioteca ORM (Object-Relational Mapping) que simplifica a interação com bancos de dados relacionais, como MySQL, PostgreSQL, SQLite e outros, através de modelos JavaScript.
- **mongoose:** É uma biblioteca de modelagem de objetos para MongoDB, um banco de dados NoSQL. É usado para definir esquemas e modelos de dados para aplicativos que usam o MongoDB.
- **multer:** Facilita o upload de arquivos, como imagens e documentos, em seu aplicativo Node.js.

## Estrutura MVC

- **helpers**: para funcões sem locais de uso fixo (para ajudar)
- **controllers**: intermediario entre o Model e a View (parecido com os das rotas)
- **db**: conexão com o banco de dados
- **models**: interação com o banco de dados e com o controllers
- **routes**: conjunto de rotas com base do Controllers
- **public**: Diretório para salvar imagens
  - **images**: images de animais e usuários

## Configurnado index.js

```js
import express from 'express'
import cors from 'cors'

const app = express()

//config JSON response (no need urlencoded, data will be only in json)
app.use(express.json())
// Solve CORS - allows the API to access this route without issue
app.use(cors({credentials: true, origin: 'http://localhost:3000'})) //Porta frontend
//public folder for images
app.use(express.static('public'))
//Routes - no need for route '/', let's specify in the front end
app.listen(5000) //Port backend

// "start": "nodemon index.js localhost 5000"
```

## Criando os Models

Primeiro, vamos criar a conexão com o banco de dados no arquivo **db** e depois vamos criar os models **User.js** e **Pets.js**

## Criando as Rotas de usuário

Agora, vamos ir no diretório Router e criar a primeira rota de usuário, **UserRoutes.js**, e depois, no diretório controllers, vamos criar o arquivo **UserController.js**.
Vamos configurar os dois arquivos e depois importar dentro do index.js o arquivo de UserRoutes, desta forma:
```js
//Routes - no need for route '/', let's specify in the front end
import UserRoutes  from './router/UserRoutes.js'
app.use('/users', UserRoutes)
```

## Validações de usuários

Dentro da função **register** no arquivo **UserController**, vamos armazenar todos os dados do usuário em variáveis através do req.body e testa-las através do postman

## Registrando usuários no sistema

Primeiro, ainda na função **register**, vamos codificar a senha do usuário através do bcrypt.genSalt. Depois vamos criar um objeto passando todos os valores que recebemos do req.body, e usar o método create do sequelize para armazenar os dados dentro do banco de dados

## Retornando Token JWT

Esse token serve para assim que o usuário se registrar, já aparecer como "logado" automaticamente

Para isso, vamos criar o arquivo **create-user-token.js** dentro do arquivo **helpers**, e colocar o seguinte bloco de comando:
```js
import jwt from "jsonwebtoken";

const createUserToken = async (user,req,res) =>{
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user.id
    })
}
export default createUserToken
```
onde:
- jsonwebtoken: Esta biblioteca é comumente usada para criar e verificar tokens JWT (Tokens JWT (JSON Web Tokens) são uma forma de representar informações em um formato seguro e autenticado. Eles são amplamente usados para autenticação e autorização em sistemas web e aplicativos. Aqui estão os principais conceitos e características dos tokens JWT:) em aplicativos Node.js.
- jwt.sign: método utilizado para criar um token JWT. Este método recebe dois argumentos:
  - Um objeto contendo os dados que serão incluídos no token. No código, ele inclui o nome do usuário (user.name) e o ID do usuário (user._id).
  - Uma string secreta chamada "nossosecret". Esta string é usada como a chave secreta para criar e verificar o token. É importante manter essa chave em segredo, pois é usada para assinar e verificar a autenticidade do token.
- Após a criação bem-sucedida do token JWT, a função envia uma resposta JSON de volta ao cliente usando o método res.status(200).json().

Após a configuração, vamos chamar essa função nos seguintes arquivos:
- no UserController.js, na função register e login, onde vamos passar como parametros o usuário criado, a requisição e a resposta.

## Criando função de login no sistema

Vamos criar uma nova rota dentro do **UserRoutes.js** chamando a função login dentro do arquivo **UserControllers.js**, fazendo a verificação de se existe o email passado dentro do banco de dados e a senha descriptografada