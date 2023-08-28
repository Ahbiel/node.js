// Fazer a conexão com o Sequelize a partir do conn
import {Sequelize} from 'sequelize'

//instanciar o sequelize com as informações de conexão ao banco de dados
const sequelize = new Sequelize('orm', 'root', 'Ab123456', {
    host: 'localhost',
    dialect: 'mysql'
});

// Baicamente, esse código abaixo é apenas para verificar se a conexão foi estabelecida. Como se fosse um "ping"

// try {
//     sequelize.authenticate();
//     console.log('Sequelize conectado com sucesso');
// } catch (error) {
//     console.log('Não foi possível conectar', err);
// }

export default sequelize;