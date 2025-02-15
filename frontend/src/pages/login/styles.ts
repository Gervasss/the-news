import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  .logo {
    width: 50%;
    height:98%;
    &:hover{
      transform:scale(1.0);
    }
  }


  .login {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 60%;
      height: 50%;
      margin-top: 1%;
      margin-right: -4%;
    }
  }
`;

export const Input = styled.input`
  width: 46%;
  height: 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 0 10px;
  margin-top: 18px;
`;

export const Button = styled.button`
  width: 50%;
  height: 3rem;
  border: none;
  border-radius: 5px;
  background-color:#483018;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
   background-color:#240E0B;
    transform: scale(1.02)
   
  }
  

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
