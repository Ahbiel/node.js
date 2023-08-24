import mysql from 'mysql'

const conn  = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Ab123456",
    database: "nodeapp"
})

export default conn