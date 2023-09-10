import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const getUserByToken = async (res,token) =>{
    if(!token){
        return res.status(401).json({message: "Acesso negado!"})
    }
    const decoded = jwt.verify(token, "nossosecret")
    const userid = decoded.id
    const user = await User.findOne({where:{id:userid}, raw:true})
    return user
}

export default getUserByToken