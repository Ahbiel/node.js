import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { useContext } from "react";
import { Context } from "../../context/UserContext.jsx";
import "./navbar.css";
export default function NavBar() {
  const { authenticated,logout } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src={Logo} alt="Get a Pet" />
        <h2>Get a Pet</h2>
      </div>
      <ul>
        <li>
          <Link to={"/"}>Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>Entrar</Link>
            </li>
            <li>
              <Link to={"/register"}>Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
