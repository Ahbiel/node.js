import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('mvc', 'root', 'Ab123456',{
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize