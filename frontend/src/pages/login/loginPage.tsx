import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, LoginContainer } from "./styles";
import Alert from "../../components/Alert";
import { loginOrRegister } from "../../services/api"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Ativa o loading ao iniciar o login

    console.log("Submit");

    try {
      const response = await loginOrRegister(email); 

      if (response && response.token) {
        console.log("Login bem-sucedido:", response);
        localStorage.setItem("token", response.token); 
        navigate("/leitores"); 
      } else {
        console.log("Erro: resposta inválida do servidor.");
        setOpenAlert(true); 
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setOpenAlert(true); 
    } finally {
      setLoading(false); 
    }
};



  return (
    <LoginContainer>
      {openAlert && <Alert title="Erro de login" description="Login incorreto" onClose={handleClose} />}
      <img src="src/assets/coffe-logo.webp" alt="logo" className="logo" style={{ backgroundColor: "#FFCE04" }} />
      <div className="login">
        <form className="container" onSubmit={handleLogin}>
          <h2>the news</h2>
          <br />
          <label htmlFor="email">Entre com seu email para iniciar</label>
          <Input
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            <Button>{!loading ? 'Entrar' : <div className="loader" />}</Button>
        </form>
      </div>
    </LoginContainer>
  );
};

export default Login;
