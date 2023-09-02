// step two

import { Sequelize } from "sequelize";
const sequelize = new Sequelize('toughts', 'root', 'Ab123456',{
    host:'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Autenticado com sucesso!!')
}).catch((err)=>console.log(err))

export default sequelize;