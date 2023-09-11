import jwt from "jsonwebtoken";
import getToken from "./get-token.js";

// middleware to validate token
const checkToken = (req,res,next) => {
    const token = getToken(req) //pega o token
    if(!req.headers.authorization){
        return res.status(401).json({
            message: "Acesso Negado!"
        })
    }
    if(!token){
        return res.status(401).json({
            message: "Acesso Negado!"
        })
    }
    try {
        const verify = jwt.verify(token,"nossosecret");
        req.user = verify
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido!"
        })
    }
}
export default checkToken