import Api from "../utils/Api";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            Api.defaults.headers.Authorization = `Bearer ${JSON.stringify(token)}`
            setAuthenticated(true)
        }
    },[])

    async function register(user){
        let msgText = "Cadastro realizado com sucesso!!"
        let msgType = 'success'
        try {
            // rota para a criação do usuário no backend
            const data = await Api.post('/users/register', user).then((response)=>{
                return response.data
            })
            // console.log(data)
            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    async function authUser(data){
        console.log(data)
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }
    function logout(){
        const msgText = 'Logout realizado com sucesso!!'
        const msgType = 'Success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        Api.defaults.headers.Authorization = undefined;
        navigate('/')
        setFlashMessage(msgText,msgType)
    }

    return {authenticated,register,logout}
}

