import { useState, useContext } from "react";
import '../../form/form.css'
import Input from "../../form/Input";
import { Context } from "../../../context/UserContext.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  const handleChange = (e) =>{
    
  }
  
  return (
    <section className="form_container">
      <h1>Login</h1>
      <form>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value={"cadastrar"} />
      </form>
      <p>
        Não tem conta? <Link to='/register'>Clique aqui.</Link>
      </p>
    </section>
  );
}
