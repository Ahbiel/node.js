import {DataTypes} from 'sequelize'
import conn from '../db/conn.js'

const Task = conn.define('Task', {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    done: {
        type: DataTypes.BOOLEAN,
    },
})

export default Task