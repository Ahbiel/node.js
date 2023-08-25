// Fazer a conexão com o Sequelize a partir do conn
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('orm', 'root', 'Ab123456', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Sequelize conectado com sucesso');
} catch (error) {
    console.log('Não foi possível conectar', err);
}

export default sequelize;