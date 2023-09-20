import Input from '../../form/Input'
import Api from '../../../utils/Api.jsx'
import { useState, useEffect } from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage.jsx'

import './profile.css'
import '../../form/form.css'
import RoundedImage from '../../layout/RoudedImage'

function Profile() {
  const {setFlashMessage} = useFlashMessage() 
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(()=>{
    Api.get('/users/checkuser', {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }).then((response)=>{
        setUser(response.data)
    }).catch((err)=>{
        console.log(err)
    })
  }, [token])

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function onFileChange(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let msgType = "success"
    const formData = new FormData() // Cria um objeto FormData para lidar com dados de formulário, especialmente para o envio de arquivos (imagens)
    
    // Itera sobre as chaves do objeto 'user' e anexa os valores correspondentes ao objeto 'formData'
    await Object.keys(user).forEach((key)=>{
        formData.append(key,user[key])
    })

    // Envia uma solicitação PATCH para uma API com os seguintes parâmetros:
    const data = await Api.patch(`/users/edit/${user.id}`, formData, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`, // Adiciona um cabeçalho de autorização com um token
            'Content-Type': 'multipart/form-data' // Define o tipo de conteúdo como 'multipart/form-data', necessário para enviar arquivos
        }
    }).then((response)=>{
        return response.data // Retorna os dados de erro da resposta da API
    }).catch((err)=>{
        msgType = 'error'
        return err.response.data // Retorna os dados de erro da resposta da API
    })
    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className="profile_header">
        <h1>Perfil</h1>
        {(user.image || preview) && (
            <RoundedImage
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/users/${user.image}` 
              }
              alt={user.name}
            />
        ) }
      </div>
      <form onSubmit={handleSubmit} className="form_container">
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  )
}

export default Profile