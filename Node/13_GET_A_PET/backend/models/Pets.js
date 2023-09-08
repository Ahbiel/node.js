//-----------------------------------------------step 4 -------------------------------------------
import conn from '../db/conn'
import { DataTypes } from 'sequelize'

const Pet = conn.define('Pet',{
    name:{
        type: DataTypes.STRING,
        required: true
    },
    age:{
        type: DataTypes.NUMBER,
        required: true
    },
    weight:{
        type: DataTypes.NUMBER,
        required: true
    },
    color:{
        type: DataTypes.STRING,
        required: true
    },
    images:{
        type: DataTypes.ARRAY,
        required: true
    },
    available:{
        type: DataTypes.BOOLEAN,
    },
    user: Object,
    adopter: Object
})

export default Pet;