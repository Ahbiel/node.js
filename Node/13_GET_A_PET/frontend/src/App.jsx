import Container from "./components/layout/Container.jsx";
import Footer from "./components/layout/Footer.jsx";
import NavBar from "./components/layout/NavBar.jsx";
// import Home from "./components/page/Home.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { Outlet } from "react-router-dom";
import Message from "./components/layout/Message.jsx";

export default function app() {
  return (
    <UserProvider>
      <NavBar />
      <Message/>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </UserProvider>
  );
}
