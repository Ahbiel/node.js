//-----------------------------------------------step 4 -------------------------------------------
import conn from '../db/conn.js'
import User from './User.js'
import { DataTypes } from 'sequelize'

const Pet = conn.define('Pet',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    available:{
        type: DataTypes.BOOLEAN,
    },
    user: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    adopter: {
        type: DataTypes.JSON,
    },
})

Pet.belongsTo(User)
User.hasMany(Pet)

export default Pet;