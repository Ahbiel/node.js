import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('mvc','root','Ab123456',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then((users)=>{
    console.log('Autenticado')
}).catch((err)=>{
    console.log(`Não autenticado`,err)
})

export default sequelize