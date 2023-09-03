// step one
import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import FileStore from 'session-file-store'
import conn from './db/conn.js'
import flash from 'express-flash'
import path from 'path'
import os from 'os'
// import User from './models/User.js'
import toughtsRoutes from './routes/toughtsRoutes.js'
import ToughtsController from './controllers/ToughtsController.js'
import authRoutes from './routes/authRoutes.js'

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
        saveUninitialized: true, // Evita que sessões não inicializadas sejam salvas no armazenamento
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
    next()
})


/*Nesta etapa, um middleware personalizado é usado para verificar se a sessão de um usuário
possui um campo "userid". Se sim, os dados da sessão são armazenados nas variáveis locais 
da resposta (res.locals.session). Isso permite que os dados da sessão sejam acessíveis 
no frontend da aplicação. */

//step seven - usar as rotas
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)
app.get('/', ToughtsController.showToughts)

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=>console.log('Erro',err))

