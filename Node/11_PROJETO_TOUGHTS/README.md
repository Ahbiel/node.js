# Projeto toughts

## step one: instalação
```bash
npm i bcryptjs connect-flash cookie-parser cookie-session express express-flash express-handlebars express-session mysql2 nodemon sequelize session-file-store
```

onde:
- **bcryptjs:** O bcryptjs é uma biblioteca utilizada para a criptografia de senhas em aplicações web. Ele é especialmente útil para armazenar senhas de forma segura no banco de dados. O bcryptjs utiliza um algoritmo de hash de senha seguro e lento, o que torna as senhas difíceis de serem quebradas por ataques de força bruta. Geralmente, é usado para criar hashes de senhas antes de armazená-las no banco de dados e para verificar se uma senha fornecida pelo usuário corresponde ao hash armazenado no banco de dados.
- **connect-flash:** O connect-flash é uma biblioteca usada em aplicações Node.js e Express.js para armazenar mensagens temporárias que podem ser exibidas ao usuário após uma redireção. Isso é útil para fornecer feedback ou mensagens de erro após uma operação, como o registro de um novo usuário ou uma tentativa de login
- **cookie-parser:** O cookie-parser é uma biblioteca utilizada para analisar e criar cookies em aplicações web. Cookies são pequenos pedaços de dados que podem ser armazenados no navegador do usuário e posteriormente enviados de volta para o servidor em cada solicitação subsequente. Esses cookies podem ser usados para rastrear informações sobre a sessão do usuário, como autenticação, preferências e outras informações personalizadas.
- **cookie-session:** O cookie-session é outra biblioteca que lida com cookies em aplicações web, mas, em vez de armazenar dados no lado do cliente, ele armazena dados na sessão do usuário no servidor e envia um identificador único (geralmente um cookie) para o cliente. Isso é útil para armazenar informações de sessão, como o estado de autenticação do usuário ou outros dados de sessão. O cookie-session é muitas vezes usado em conjunto com o cookie-parser para gerenciar sessões de usuário em aplicações Express.js.
- **express-flash:** O pacote express-flash é uma extensão do Express.js que simplifica o uso do connect-flash, mencionado anteriormente, para lidar com mensagens flash em sua aplicação. Mensagens flash são mensagens temporárias que podem ser exibidas ao usuário após uma redireção. O express-flash fornece uma maneira mais fácil de definir e recuperar mensagens flash em rotas do Express, tornando o processo mais conveniente. Ele é frequentemente usado em conjunto com o connect-flash para fornecer feedback ao usuário após ações como login, registro ou outras interações.
- **express-session:** O pacote express-session é usado para gerenciar sessões de usuário em aplicações web Express.js. Uma sessão é um mecanismo para armazenar dados do lado do servidor relacionados a um usuário específico, como informações de autenticação ou preferências. O express-session permite que você crie, armazene e gerencie sessões de usuário de forma transparente no Express.js. Ele utiliza cookies ou outros mecanismos de armazenamento para manter o estado da sessão entre as solicitações do cliente. Isso é útil para rastrear o estado do usuário e manter informações persistentes durante a interação do usuário com a aplicação.
- **session-file-store:** O pacote session-file-store é uma implementação específica de armazenamento de sessão para o express-session. Ele permite que você armazene dados de sessão em arquivos no sistema de arquivos do servidor. Cada sessão do usuário é armazenada em um arquivo separado. Isso é útil para aplicativos que precisam persistir informações de sessão em disco, em vez de usar um banco de dados. O session-file-store é uma alternativa ao armazenamento de sessão em memória ou a outros mecanismos de armazenamento, e é útil quando você deseja manter as sessões mesmo após o reinício do servidor.

## step two: estrutura de pastas

- **controllers**: intermediario entre o Model e a View (parecido com os das rotas)
- **db**: conexão com o banco de dados
- **models**: interação com o banco de dados e com o controllers
- **public**: Estilos através do css
  - **css**: diretório do arquivo styles.css
- **routes**: conjunto de rotas com base do Controllers
- **sessions:** guarda as sessões do sistema (salva através do session-file-store)
- **views**: Diretório pela apresentação dos dados que estão no banco ao usuário
  - **layouts**: onde fica o arquivo main.handlebars
- **index.js**: arquivo raiz do nosso projeto
- **package-lock.json:** criado após a instalação dos pacotes
- **package.json**: npm init -y  
- **node_modules**: criado após a instalação dos pacotes

## step three: configurando a estrutura

Primeiro, vamos criar um banco de dados chamado **toughts** e em seguida vamos instânciar nosso banco dentro do sequelise (criando o arquivo **conn.js** dentro do diretório **db**)

```js
import { Sequelize } from "sequelize";
const sequelize = new Sequelize('toughts', 'root', 'Ab123456',{
    host:'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Autenticado com sucesso!!')
}).catch((err)=>console.log(err))

export default sequelize;
```

Depois, vamos configurar o arquivo **index.js**
```js
// step one
import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import FileStore from 'session-file-store'
import conn from './db/conn.js'
import flash from 'express-flash'
import path from 'path'
import os from 'os'

const app = express()

const FileStoreSession = FileStore(session) //Crie uma instância do FileStore com o express-session.
/*Em resumo, essa linha de código está preparando o FileStore para ser usado como o mecanismo 
de armazenamento de sessão no express-session */

const Path = path.join(os.tmpdir(),'session') //configura o diretório "session" 
/* Aqui, é configurado o diretório onde as sessões serão armazenadas. 
Ele utiliza o módulo path para criar um caminho que é uma subpasta chamada 
"session" no diretório temporário do sistema operacional. */

//step two
app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')
app.use(
    express.urlencoded({
        extended:true
    })
)
// step three
app.use(express.json())
app.use(
    session({
        name: 'session', // Nome da sessão
        secret: "nosso_secret", // Segredo usado para assinar a sessão
        resave: false, // Evita que as sessões sejam regravadas no armazenamento a menos que sejam modificadas
        saveUninitialized: false, // Evita que sessões não inicializadas sejam salvas no armazenamento
        store: new FileStoreSession({
            logFn: () =>{}, // Função de log (vazia no exemplo, mas necessita ser criado)
            path: Path // Diretório onde os arquivos de sessão serão armazenados
        }),
        cookie: {
            secure: false, // Define se os cookies devem ser seguros (HTTPS)
            maxAge: 360000, // Tempo de vida máximo do cookie da sessão em milissegundos
            httpOnly: true // Impede que o cookie seja acessível por meio de JavaScript no navegador
        }
    })
)

//step four - flash message
app.use(flash())
/*Nesta etapa, o middleware express-flash é configurado para lidar com mensagens flash 
na aplicação. Isso permite que mensagens temporárias sejam enviadas e exibidas para os 
usuários após redirecionamentos. */

//step five - public path
app.use(express.static('public'))

//step six - salvar a sessão da resposta para poder utilizar a flash message
app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session //manda os dados do usuário para a "resposta", permitindo o acesso no frontend
    }
})
/*Nesta etapa, um middleware personalizado é usado para verificar se a sessão de um usuário
possui um campo "userid". Se sim, os dados da sessão são armazenados nas variáveis locais 
da resposta (res.locals.session). Isso permite que os dados da sessão sejam acessíveis 
no frontend da aplicação. */

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=>console.log(err))
```

Configurações da sessão:
- **name: 'session':** Define o nome da sessão. Isso é usado para identificar o cookie de sessão no navegador do cliente.
- **secret: "nosso_secret":** Especifica um segredo que é usado para assinar as sessões. Isso ajuda a garantir que as sessões não sejam falsificadas por terceiros. Certifique-se de substituir "nosso_secret" por uma chave secreta mais segura em um ambiente de produção.
- **resave: false:** Esta opção evita que as sessões sejam regravadas no armazenamento a menos que sejam modificadas. Isso ajuda a otimizar o desempenho e evitar gravações desnecessárias.
- **saveUninitialized: false:** Impede que sessões não inicializadas sejam salvas no armazenamento. Isso é útil para economizar recursos do servidor, pois sessões não utilizadas não serão criadas ou armazenadas.
- **store: new FileStoreSession({ ... }):** Especifica o mecanismo de armazenamento de sessão. No exemplo, você está usando o session-file-store como armazenamento de sessão e configurando-o para armazenar os dados de sessão em arquivos no diretório especificado em path.
- **cookie.secure: false:** Define se os cookies de sessão devem ser seguros, ou seja, se eles só podem ser transmitidos através de conexões HTTPS. Neste caso, está configurado como false, o que significa que os cookies podem ser transmitidos através de conexões não seguras (HTTP). Em um ambiente de produção, é recomendável definir isso como true quando você estiver usando HTTPS.
- **cookie.maxAge: 360000:** Define o tempo de vida máximo do cookie da sessão em milissegundos. Neste exemplo, o cookie expirará após 360.000 milissegundos, ou seja, 6 minutos.
- **cookie.httpOnly: true:** Impede que o cookie seja acessível por meio de JavaScript no navegador. Isso ajuda a proteger o cookie contra ataques de script entre sites (XSS).

## Step four: Criando Models

Agora, vamos criar nossos Models. Dentro do diretório models, vamos criar dois arquivos: User.js e Tought.js. Primeiro vamos criar o User.js com todas as configurações necessárias, e logo depois vamos criar o Tought.js, e logo depois vamos relacionar o Model Tought com o Model User

```js
// User.js
import { DataTypes } from "sequelize";
import conn from '../db/conn.js'

const User = conn.define('User',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
})
export default User;    
```
```js
// Tought.js
import {DataTypes} from 'sequelize'
import conn from '../db/conn.js'
import User from './User.js';

const Tought = conn.define('Tought',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Tought.belongsTo(User) //"Os pensamentos pertence a um determinado usuário"
User.hasMany(Tought) //"Um usuário pode ter mais de um pensamentos"

export default Tought;
```
Após criado, podemos importar os models dentro do arquivo **index.js**

## Step five: Criando a home do projeto

Primeiro, vamos configurar o layout inicial da aplicação, criando a nav bar, o main e o footer. Logo após, vamos começar a configurar o **controller** da nossa aplicação, e as **rotas** que iremos querer utilizar inicialmente para a **Home**
```js
//      ./controllers/ToughstController
import Tought from '../models/Tought.js'
import User from '../models/User.js'

export default class ToughtsController {
    static async showToughts(req,res) {
        res.render('toughts/home') //aqui precisamos criar o arquivo home.handlebars dentro do diretório toughts
    }
}
```

```js
//      ./routes/toughtsRoutes
import express from 'express'
import ToughtController from '../controllers/ToughtsController.js'
const router = express.Router()

router.get('/', ToughtController.showToughts)

export default router
```

E, por fim, vamos importar o toughtsRoutes e o ToughstController no index.js e atribuir a seguinte linha de código:
```js
//step seven - usar as rotas
app.use('/toughts', toughtsRoutes)
app.get('/', ToughtsController.showToughts)
```

## Step six: Inicinado a autenticação

Primeiro, vamos criar mais dois arquivos, uma rota chamado **authRoutes.js** e um controller chamado **AuthController.js**

Esses dois arquivos serão para direcionar o usuário para a tela de "register" ou a tela de "login". Para ambas pricisamos criar uma view para a interação com o usuário.

```js
//authRoutes.js
import {Router} from 'express'
import AuthController from '../controllers/AuthController.js'
const router = Router()

router.get('/login', AuthController.login)
router.get('/login', AuthController.register)

export default router
```
```js
//AuthController.js
export default class AuthController {
    static login(req,res){
        res.render('auth/login')
    }
    static register(req,res){
        res.render('auth/register')
    }
}
```
Vamos criar uma pasta chamada "auth" dentro de "views", e criar os arquivos "register" e "login", ambos com um formulário cujo método será o de POST. E depois, vamos importar o authRoutes para dentro do arquivo index.js e atribuir a seguinte linha de comando:
```js
app.use('/', authRoutes) //Não teremos conflito com outras rotas por não ter nada atrelado ao '/'
```

## Step seven: flash message inicio do registro

Vamos criar uma flash message caso as senhas não combinem, e para isso, precisamos seguir o seguinte passo a passo:
- Em authRoutes, criar um post com o '/register' chamando a função **registerPost**
- Em AuthController, vamos armazenar todos os valores passado no formulário de registro em variávies (constantes)
- Vamos fazer uma validação (password != confirmpassword)
- Vamos criar as "messages", com o código req.flash('message', 'mensagem')
  - Este código está usando o método flash para adicionar uma mensagem flash à sessão do usuário  associada à requisição req.
  - '**message**': Este é o nome da chave sob a qual a mensagem será armazenada na sessão. No código HTML ou em um mecanismo de visualização, você pode recuperar a mensagem usando esta chave.
  - **mensagem**: Este é o conteúdo da mensagem flash que você está armazenando.
- agora em **main.handlebars**, vamos adcionar a seguinte instrução:
```handlebars
{{#if messages.message}}
    <div class="message">
        {{messages.message}}
    </div>
{{/if}}
- Podemos tambem fazer a validação por email, tentando buscar no Banco de dados se aquele email existe
```
  - **messages.message** é a chamada do "req.flash" com base na chave que atribuimos

## Step eight: Registrando usuários no sistema

Para efetuamos o registro, vamos seguir o seguinte passo-à-passo ainda no arquivo **AuthController.sj**:
- Primeiro, vamos criar um hash de senhas de forma segura antes de armazenar no banco de dados
 - para isso, vamos usar o código **bcrypt.genSaltSync(10)** que é uma sequência aleatória de caracteres que é adicionada à senha antes de ser realizada a hash
 - Depois vamos usar o código **bcrypt.hashSync(password, salt)** para criar uma hash segura da senha original 
- Agora, vamos criar um objeto passando o Nome, o email, e a senha segura (password:hash) dentro do método **User.create()**
- após isso, vamos criar uma sessão para o usuário, utilizando a seguinte linha de comando:
```js
const createUser = await User.create(user)
req.flash('message','Cadastro realizado com sucesso')
req.session.userid = createUser.id
req.session.save(()=>{
    res.redirect('/')
})
```
  - **req.session.userid = createUser.id:** Aqui, está armazenando o ID do usuário recém-criado na sessão do usuário. A sessão é geralmente usada para manter informações do usuário entre várias solicitações HTTP, de modo que o servidor possa identificar o usuário entre as solicitações. O ID do usuário pode ser útil para autenticação e autorização em solicitações futuras.
  - **req.session.save(() => { res.redirect('/') }):** Nesta parte, a sessão é salva, o que geralmente é necessário para garantir que todas as alterações na sessão sejam persistidas. Após a sessão ser salva, o código redireciona o usuário para a rota '/'. Isso geralmente é feito após um login ou registro bem-sucedido para levar o usuário à página inicial ou a uma página de destino após a ação.
Após isso, podemos adcionar uma validação dentro do **main.handlebars** com a seguinte linha de código:
```handlebars
 <ul>
    <li><a href="/">Pensamentos</a></li>
    {{! URL após a autenticação }}
    {{#if session.userid}}
        <li><a href="/tougths/dashboard">Dashboard</a></li>
        <li><a href="/logout">Sair</a></li>
    {{else}}
        <li><a href="/login">Entrar</a></li>
        <li><a href="/register">Registrar</a></li>
    {{/if}}
</ul>
```

Para finalizar, podemos criar uma forma do usuário fazer o logout do sistema, para isso vamos:
- criar uma rota dentro do **authRoutes** para o /logout, criando a função logout dentro do **AuthController**.
- Dentro da função, vamos utilizar o método **req.session.destroy();** para remover a sessão do usuário.

**importante**

Para o registro funcionar corretamente, precisamos da seguinte linha de código dentro do arquivo **index.js**
```js
app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})
```

## Step nine: Criando um sistema de login

Para criar o sistema de login, vamos trabalhar nos arquivos **authRoutes.js** e **AuthController.js**
- Dentro do arquivo **authRoutes.js**, vamos criar uma rota do tipo POST para o /login chamando a função **loginPost**
- agora dentro do arquivo **AuthController.js**, vamos utilizar o seguinte bloco de código:
```js
static async loginPost(req,res){
    const {email,password} = req.body
    //find user
    const user = await User.findOne({where:{email:email}})
    const passwordMatch = bcrypt.compare(password, user.password)
    if(!user){
        req.flash('message','Usuário não encontrado')
        res.render('auth/login')
        return
    }else if(!password){
        req.flash('message','A senha não combina com o sistema')
        res.render('auth/login')
        return
    }
    req.session.userid  = user.id
    req.flash('message','Login efetuado com sucesso')
    res.render('auth/login')
    req.session.save(()=>{
        res.redirect('/')
    })
}
```
  - **const passwordMatch = bcrypt.compare(password, user.password):** Aqui, a biblioteca bcrypt é usada para comparar a senha fornecida na requisição com a senha armazenada no registro do usuário encontrado anteriormente. A função compare verifica se as senhas coincidem e retorna um valor booleano (true se coincidirem, false caso contrário).
  - **req.session.userid = user.id:** Se o usuário for encontrado e a senha estiver correta, o ID do usuário é armazenado na sessão do usuário. Isso provavelmente é usado para rastrear a autenticação do usuário em sessões subsequentes.

## Step ten: Middleware de verificação de autenticação

Se eu fizer login na minha aplicaçao, e ir na seção 'dashboard' e der um reload no site, eu continuarei nessa seção, porem não estarei mais logado no sistema.
- Primeiro vamos configurar a seção dashboard
  - No arquivo **toughtsRoutes**, vamos criar uma rota do tipo get para /dashboard chamando a função dashboard
  - No arquivo **ToughtsController**, vamos criar a função dashboard apenas renderizando o 'toughts/dashboard'
  - Vamos criar um arquivo chamado **dashboard.handlebars** dentro do diretório views/toughts/
- Agora vamos criar outro diretório chamado "helper" e então criar um arquivo **auth.js** com o seguinte código:
```js
export const checkAuth = (req,res,next) => {
    const userid = req.session.userid
    if(!userid){
        res.redirect('/login')
    }
    next()
}
```
  -**const userid = req.session.userid:** Aqui, a função está tentando obter o userid a partir do objeto req.session. Isso sugere que a aplicação usa algum tipo de sistema de sessão para rastrear usuários autenticados. O userid é armazenado na sessão do usuário, que é uma maneira comum de manter o estado de autenticação do usuário entre as solicitações. 
  - **if (!userid):** Esta linha verifica se não há um userid. Isso implica que a verificação de autenticação falhou, pois um usuário autenticado geralmente teria um userid associado à sua sessão.
  - **res.redirect('/login'):** Se o userid não estiver presente (ou seja, o usuário não está autenticado), a função redirecionará o usuário para a rota /login. Isso é comum em sistemas de autenticação web, onde os usuários não autenticados são redirecionados para uma página de login para entrar antes de acessar certas partes do aplicativo.
- Depois disso, vamos chamar essa função dentro do arquivo **toughtsRoutes.js**

## Step eleven: Criação de pensamentos

Primeiro, vamos criar a rota dentro do **toughtsRoutes.js** para o caminho '/add' chamando a função createTought. Depois, vamos criar uma função chamada **createTought** renderizando o arquivo /views/toughts/create

Agora, para inserir os pensamentos no banco de dados, vamos:
- Criar uma rota do tipo post para o '/toughts/add' chamando a função createToughtSave dentro do arquivo **toughtsRoutes.js**
- Vamos criar a função createToughtSave dentro do arquivo **ToughtsController.js**
 - Dentro dessa função, vamos passar os pensamentos com o **UserId** igual ao id do usuário que está logado (req.session.userid)
 - Vamos armazenar o pensamento com o comando **tought.create()**

Podemos ainda Resgatar esses pensamentos, seguindo os seguintes passos:
- vamos configurar a função dashboard dentro do arquivo **ToughtsController.js**
```js
    const userId = req.session.userid;
    const user = await User.findOne({
        where:{id:userId},
        include: Tought, //tráz todos os pensamentos do usuário
        plain: true
    })
    if(!user){
        res.redirect('/login')
    }
    console.log(user.Toughts)
    // const toughts = user.Toughts.map((result)=>{
    //     console.log(result.dataValues)
    // })
    const toughts = user.Toughts.map((result)=>result.dataValues)
    res.render('toughts/dashboard', {toughts})
```
onde: 
- **const userId = req.session.userid;:** Aqui, o código está obtendo o ID do usuário a partir do objeto de sessão da solicitação HTTP
- **const user = await User.findOne({ where: { id: userId }, include: Tought, plain: true }):** Este trecho de código está fazendo uma consulta ao banco de dados usando o modelo User. Ele está procurando um usuário com o ID userId especificado e incluindo os dados relacionados aos "Toughts" (pensamentos) do usuário. O plain: true significa que você deseja apenas os dados brutos do usuário, em vez de um objeto complexo. A consulta é feita de forma assíncrona usando await.
- **if (!user) { res.redirect('/login') }:** Aqui, o código verifica se a consulta ao banco de dados encontrou um usuário com o ID fornecido. Se não encontrou, ele redireciona o cliente para a página de login.
- **const toughts = user.Toughts.map((result) => result.dataValues):** Aqui, o código está mapeando os "Toughts" do usuário para uma matriz chamada toughts. Ele está acessando os dados brutos de cada "Tought" usando result.dataValues e armazenando-os na matriz.

## Removendo pensamentos.
Para remover os pensamentos, no arquivo **dashboard.handlebars**, temos a linha de código que envia como formulário o id do pensamento em questão, isso é importante para conseguirmos referencia-lo na hora de remover
- Em **toughtsRoutes.js**, vamos criar uma rota do tipo post para o "/remove" chamando a função removeTought
- Agora em **ToughtsController.js**, vamos criar a função removeTought

## Editando pensamentos
Para editar, primeiro vamos exibir os pensamentos no formulário de edição antes de dar um update

- Primeiro, precisamos criar uma rota get dinamica dentro do **ToughtsRoutes.js**, chamando a função updateTought. 
- Agora, dentro do **ToughtsController.js**, vamos criar a função updateTought
- Vamos resgatar os dados do banco de dados e mandar para o arquivo '/views/toughts/edit.handlebars'

Agora, para atualizar os dados dentro do banco de dados, vamos:
- Criar uma rota do tipo post dentro do arquivo **toughtsRoutes.js**, chamando a função updateToughtSave
- Dentro do aruqivo **ToughtsController.js** vamos criar a função updateToughtSave com o seguinte código:
```js
const id = req.body.id
const userId = req.session.userid;
const toughts = {
    title: req.body.title
};
await Tought.update(toughts,{where:{id:id}, userId: userId})
res.redirect('dashboard')
```
## Resgatando os pensamentos para o Home
Para resgatar todos os pensamentos para a home, vamos usar a rota raiz ja criada usando a função **showToughts** do **ToughtsController.js**
```js
await Tought.findAll({include: User}).then((data)=>{
    const toughts = data.map((value)=>{
        return value.get({plain:true})
    })
    res.render('toughts/home',{toughts})
}).catch((err)=>{
    console.log(err)
})
```

## Criando funcionalidade de Busca

Dentro do arquivo **home.handlebars**, vamos criar a seguinte linha de código:
```handlebars
<form action="/" method="GET">
    <input type="text" name="search" placeholder="Está buscando por algo?">
    <input type="submit" class="btn" value="Buscar">
</form>
```
E, como esse formulário está com a rota pra raiz do site vamos configurar essa funcionalidade dentro da função **showToughts** dentro do arquivo **ToughtsController.js**. O formulário está armazenando o valor dentro da url, onde, preciso resgatar esse valor através do **req.query**.

Para criarmos esse filtro, vamos precisar importar a seguinte biblioteca
```js
import { Op } from 'sequelize'
```
- A importação de { Op } permite que você use operadores Sequelize em consultas, como where e find, para definir condições mais avançadas. Por exemplo, você pode usar o operador $eq para verificar se um valor é igual a outro, o operador $gt para verificar se um valor é maior que outro, e assim por diante.

Agora, vamos editar a chamada da função **findAll**
```js

```