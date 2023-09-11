//-----------------------------------------------step 2-------------------------------------------
import {Sequelize} from 'sequelize'
const sequelize = new Sequelize('getapet', 'root', 'Ab12345*',{
    host: 'localhost',
    dialect: 'mysql',
})
sequelize.authenticate().then(()=>{
    console.log('Autenticado com sucesso!!')
}).catch((err)=>console.log(err))

export default sequelize;