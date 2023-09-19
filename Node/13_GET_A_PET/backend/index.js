import express from 'express'
import cors from 'cors'
import conn from './db/conn.js'


const app = express()
//config JSON response (no need urlencoded, data will be only in json)
app.use(express.json())
// Solve CORS - allows the API to access this route without issue
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })) //Porta frontend

//public folder for images
app.use(express.static('public'))

//Routes - no need for route '/', let's specify in the front end
import UserRoutes from './router/UserRoutes.js'
import PetRoutes from './router/PetRoutes.js'
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

conn.
  //sync({force:true}).
  sync().
    then(()=>{
  app.listen(5000)
}).catch((err)=>console.log(err))
// "start": "nodemon index.js localhost 5000"