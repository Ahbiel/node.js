import {DataTypes} from 'sequelize'
import conn from '../db/conn.js'
import User from './User.js';

const Tought = conn.define('Tought',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Tought.belongsTo(User) //"Os pensamentos pertence a um determinado usuário"
User.hasMany(Tought) //"Um usuário pode ter mais de um pensamentos"

export default Tought;