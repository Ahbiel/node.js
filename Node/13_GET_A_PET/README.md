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

## Verificando usuário pelo token

Primeiro, no arquivo **UserRoutes.js** vamos criar uma rota para o '/checkuser' chamando a função **checkUser** do arquivo **UserControllers.js**. E, dentro dessa função, vamos colocar o seguintes código:
```js
static async checkUser(req,res){
    let currentUser;
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        const token = getToken(req) // "pega o token"
        const decoded = jwt.verify(token, "nossosecret") // descriptografa o token com a chave que passamos no arquvo **create-user-token.js**
        currentUser = await User.findOne(
            {where:{id: decoded.id},
            attributes: {exclude: ['password']}
        })
        // currentUser.password = undefined
    }else{
        currentUser = null
    }
    res.status(200).send(currentUser)
}
```
Após isso, vamos criar um helper para conseguir pegar apenas a chave token. esse arquivo será o **get-token.js** e terá o seguinte bloco de código:

```js
const getToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //Esta linha verifica se authHeader não é nulo ou indefinido (usando o operador &&) e, se não for, divide o valor de authHeader em um array usando o espaço em branco como delimitador (usando split(" "))
    return token;
}
export default getToken;
```

Para testarmos, dentro o postman, podemos criar uma request com o metodo get para a rota **http://localhost:5000/users/checkuser**, ir em **Authorization** e depois em **Bearer Token**, e mandar a chave token através da requisição get. E assim, teremos acesso as informações do usuário com base no token dele

## Fazendo a atualização do usuário

Para isso, vamos dividir em - partes
- Primeiro, vamos resgatar o usuário pelo id
  - Vamos criar uma rota com o id dinâmico do usuário dentro do arquivo **UserRoutes.js** chamando a função getUserById dentro do arquivo **UserControllers.js**
  - Dentro da função, vamos pegar o id pelo parâmetro, e resgatar no banco de dados.
  - No postman, vamos criar outro request e passar a rota como **http://localhost:3000/users/{id}**
- Agora, vamos verificar o Token do usuário
  - Vamos criar uma rota com verificação de token. Vamos criar uma rota com o método **patch** chamando a função editUser do arquivo **UserControllers.js** passando o seguinte caminho: '/edit/:id'.
    - Vamos criar o arquivo **verify-token.js** como helper
    - Vamos criar uma funçãom como middleware para a validação do token.
    - Vamos passar esse bloco de comando:
    - Depois, vamos importa-lo dentro do arquivo **UserRoutes.js** e chamar antes da função editUser
    - dentro do postman, vamos criar outro request chamando essa rota com um determinado ID sem autenticação e com autenticação
```js
// verify-token.js
import jwt from "jsonwebtoken";
import getToken from "./get-token.js";

// middleware to validate token
const checkToken = (req,res,next) => {
    const token = getToken(req) //pega o token
    console.log(token)
    if(!req.headers.authorization){
        return res.status(401).json({
            message: "Acesso Negado!"
        })
    }
    if(!token){
        return res.status(401).json({
            message: "Acesso Negado!"
        })
    }
    try {
        const verify = jwt.verify(token,"nossosecret");
        req.user = verify //atribui o resultado da verificação à propriedade user do objeto req
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido!"
        })
    }
}
export default checkToken

// UserRoutes.js
router.patch('/edit/:id', checkToken,UserController.editUser)    
```
- Agora, vamos iniciar a validação por usuário
  - A primeira coisa que vamos fazer, é dentro da função **editUser** do arquivo **Usercontrollers.js**, vamos usar a função **get-token.js** e armazenar em uma variável chamada token.
  - Vamos criar outro helper chamado **get-user_by_token.js** para selecionar o usuário com base nas informações do token e retornar para o userControllers as informações do usuário.
  - Vamos fazer todas as validações e prosseguir
- Finalizando atualizações
  - Após todas as configurações, vamos usar o metodo update do sequelize para atualizar os seviços dentro do banco de dados, passando todos os dados da variável user.

## Upload de images

Para ajudar, vamos criar outro helper chamado **image-upload.js**.
```js
import multer from "multer";
import path from "path";

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    console.log(req)

    if (req.baseUrl.includes('users')) {
      folder = "users";
    } else if (req.baseUrl.includes('pets')) {
      folder = "pets";
    }
    cb(null, `public/images/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

export default imageUpload
```
onde:
- **multer**: é um middleware Node.js usado para processar uploads de arquivos.
- **path**: é um módulo Node.js que fornece utilitários para trabalhar com caminhos de arquivo.
**imageStorage**: é uma configuração de armazenamento para o multer.diskStorage. Isso define onde os arquivos enviados devem ser armazenados no servidor e como eles devem ser nomeados.
  - **destination:** É uma função que determina a pasta de destino para o armazenamento dos arquivos. A função verifica a URL base da solicitação (req.baseUrl) para decidir se os arquivos devem ser armazenados em uma pasta "users" ou "pets". A pasta de destino é definida com base na URL.
    - **cb** é uma função de callback fornecida pelo multer para controlar onde e como os arquivos enviados são armazenados.
    - **null** é o primeiro argumento passado para a função cb, indicando que não houve erros durante o processamento.
    - A **string public/images/${folder}/** é o caminho para o diretório de destino onde o arquivo enviado será armazenado. O diretório é construído dinamicamente com base no valor da variável folder.
  - **filename:** É uma função que determina como o arquivo deve ser nomeado. Neste caso, o nome do arquivo é definido como o carimbo de data e hora atual (em milissegundos) concatenado com a extensão original do arquivo.
- **imageUpload** é uma instância do middleware multer, que é configurada com base nas opções definidas em imageStorage.
  - **storage:** É definido como imageStorage, que especifica onde e como os arquivos serão armazenados.
  - **fileFilter:** É uma função que filtra os arquivos que podem ser enviados. Neste caso, ele permite apenas arquivos com extensão .png ou .jpg. Se um arquivo com uma extensão diferente for enviado, ele retornará um erro.
  - cb(undefined, true): Assim como no exemplo anterior, cb é uma função de callback fornecida pelo multer.
    - **undefined** é o primeiro argumento passado para a função cb, indicando que não houve erros durante o processo de filtragem.
    - **true** é o segundo argumento passado para a função cb, indicando que o arquivo enviado deve ser aceito e processado
Este middleware pode ser usado em suas rotas para processar o upload de imagens da seguinte maneira:
```js
router.patch('/edit/:id', checkToken, imageUpload.single('image'),UserController.editUser)
```
Neste exemplo, a rota "/edit/:id" usa o middleware imageUpload.single("image") para processar o upload de uma única imagem com o nome de campo "imagem". O arquivo carregado estará disponível em req.file para processamento adicional.

Todos os arquivos são salvos dentro do req.file, ou seja, para acessarmos, precisamos da seguinte linha de comando dentro da função **editUser** no arquivo **UserControllers.js**
```js
if(req.file){
    user.image = req.file.filename
}
```
onde: 
- **if (req.file):** Esta linha verifica se a propriedade req.file está definida na requisição. Em muitos casos, quando você usa o middleware multer (como no exemplo anterior), os arquivos enviados pelo cliente são armazenados em req.file.
- **user.image = req.file.filename**: Se a condição do if for verdadeira (ou seja, um arquivo foi enviado), este trecho de código atribui o nome do arquivo carregado (req.file.filename) ao campo image do objeto user. Presumivelmente, o objeto user é uma representação de um usuário em sua aplicação, e você está atualizando o campo image com o nome do arquivo da imagem que o usuário enviou.
