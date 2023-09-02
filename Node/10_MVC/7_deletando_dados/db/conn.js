import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('mvc','root','Ab123456',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Autenticado')
}).catch((err)=>{
    console.log(err)
})

export default sequelize;