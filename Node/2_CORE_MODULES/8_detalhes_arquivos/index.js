const read = require('readline-sync')
const fs = require('fs')
const path = require('path')

var arquivo, dir, conteudo, current_dir

console.log('Dejesa criar um arquivo na raiz (a), um diretório (d) ou um arquivo em um diretório (ad)?\n')
const resposta = read.question('Respostas: ')


const create_arquivo = () =>{
    arquivo = dir + arquivo
    if(!fs.existsSync(arquivo)){
        conteudo = read.question ('Digite um conteúdo: ')
        console.log(dir)
        fs.writeFile(arquivo, conteudo, (err) =>{
            err
        })
    } else{
        console.clear()
        console.log('Esse arquivo já existe')
    }
}

switch (resposta) {
    case 'a':
        arquivo = read.question("Digite um nome: ") + '.txt'
        if(!fs.existsSync(arquivo)){
            conteudo = read.question ('Digite um conteúdo: ')
            console.clear()
            fs.writeFile(arquivo, conteudo, (err) =>{
                err
            })
        } else{
            console.clear()
            console.log('Esse arquivo já existe')
        }
        fs.stat(arquivo, (err,stats)=>{ //verifica algumas informações do arquivo
            if(err){
                return
            }
            console.log("Caminho do arquivo:",path.resolve(arquivo))
            console.log(`Informações sobre o arquivo ${arquivo}`)
            console.log("É um arquivo?: "+stats.isFile())
            console.log("É um diretório?: "+stats.isDirectory())
            console.log("è um link simbólico?: "+stats.isSymbolicLink())
            console.log("Quando foi criado?: "+stats.ctime)
            console.log("Qual o tamanho?: "+stats.size)
        })
        break;
    case 'd':
        dir = read.question("Digite um nome para o diretório: ") + '.txt'
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        } else {
            console.clear()
            console.log('Esse diretório já existe')
        }
        fs.stat(dir, (err,stats)=>{ //verifica algumas informações do arquivo
            if(err){
                return
            }
            console.log("Caminho do arquivo:",path.resolve(dir))
            console.log(`Informações sobre o arquivo ${dir}`)
            console.log("É um arquivo?: "+stats.isFile())
            console.log("É um diretório?: "+stats.isDirectory())
            console.log("è um link simbólico?: "+stats.isSymbolicLink())
            console.log("Quando foi criado?: "+stats.ctime)
            console.log("Qual o tamanho?: "+stats.size)
        })
        break;
    case 'ad':
        arquivo = read.question("Digite o nome do arquivo: ") + '.txt'
        current_dir = path.resolve()
        dir = read.question("Digite o nome de um diretório existente: ")
        dir = current_dir + '/' + dir + '/'
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
            create_arquivo()
        } else {
            create_arquivo()
        }

    default:
        break;
}
