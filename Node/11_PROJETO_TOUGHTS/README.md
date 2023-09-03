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
