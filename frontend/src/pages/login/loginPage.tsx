import { useState, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Button, Input, LoginContainer } from "./styles";
import Alert from "../../components/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
<LoginContainer>
{openAlert && <Alert title="Erro de login" description="Login  incorreto" onClose={handleClose} />}
<img src="src/assets/coffe-logo.webp" alt="logo" className="logo" style={{backgroundColor:"#FFCE04"}} />
<div className="login">
        
        <form className="container">
        <h2> the news</h2><br></br>
          <label htmlFor="name">Entre com email para iniciar</label>
          <Input id="name" placeholder="Login"   />
          <Button>Entrar</Button>
        </form>
      </div>
    </LoginContainer>

  );
};

export default Login;
