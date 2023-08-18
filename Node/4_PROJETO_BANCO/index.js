import inquirer from 'inquirer';
import fs from 'fs';

console.log("Iniciando o Account");

operation()

function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }])
    .then((answer) => {
        const action = answer['action']

        switch (action) {
            case 'Criar conta':
                createAccount()
                break;
            case 'Consultar saldo':
                getAccountBalance()
                break;
            case 'Depositar':
                deposit()
                break;
            case 'Sacar':
                widthdraw()
                break;
            case 'Sair':
                console.log('Obrigado por usar o nosso programa!!')
                process.exit()
            default:
                break;
        }

    })
    .catch((err) => {
        console.log(err);
    })
}

function createAccount() {
    console.log('Define as opções da sua contea a seguir: ')
    buildAccount()
}
function buildAccount() {
    inquirer.prompt([
        {
            name:'accountName',
            message: "Digite um nome para a sua conta:"
        }
    ]).then((answer) =>{
        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.clear()
            console.log('Essa conta já existe, escolha outra!!')
            // função recursiva
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance": 0}',
            (err)=>{console.log(err)
          }
        )
        console.clear()
        console.log('Sua conta foi criada com sucesso!')
        operation()
    }).catch((err)=>console.log(err))
}

function deposit() {
    inquirer.prompt([
        {
            name:'accountName',
            message: "Qual o nome da sua conta?"
        }
    ]).then((answer)=>{
        const accountName = answer['accountName']
        if(!ckeckAccount(accountName)){
            return deposit()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message: "Quanto você deseja depositar?"
            }
        ]).then((answer)=>{
            const amount = answer['amount']
            addAmount(accountName, amount)
            operation()
        }).catch((err)=>console.log(err))
    }).catch((err)=>console.log(err))
}

function ckeckAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.clear()
        console.log('Essa conta não existe, tente novamente.')
        return 
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log('Ocorreu um erro')
        return
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err)=>console.log(err))
    console.clear()
    console.log(`Foi depositado o valor de R$${amount} na sua conta!`)
}
function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`)
    return JSON.parse(accountJSON)
}

function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: "Qual o nome da sua conta?"
        }
    ]).then((answer)=>{
        const accountName = answer['accountName']
        if(!ckeckAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)
        console.log(`Olá, o saldo da sua conta é de R$${accountData.balance}`)
        operation()
    }).catch((err)=>console.log(err))
}

function widthdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: "Qual o nome da sua conta?"
        }
    ]).then((answer)=>{
        const accountName = answer['accountName']
        if(!ckeckAccount(accountName)){
            return widthdraw()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message: "Quanto você deseja sacar?"
            }
        ]).then((answer)=>{
            const amount = answer['amount']
            removeAmount(accountName, amount)
        }).catch((err)=>console.log(err))


    }).catch((err)=>console.log(err))
}
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log('Ocorreu um erro')
        return widthdraw()
    }
    if(accountData.balance < amount){
        console.log('Valor indisponível')
        return widthdraw()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err)=>console.log(err))
    console.clear()
    console.log(`Você sacou o total de R$${amount} da sua conta!!`)
    operation()
}