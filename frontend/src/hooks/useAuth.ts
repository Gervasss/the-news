import { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Criando o contexto
export const AuthContext = createContext<AuthContextProps | null>(null);

// Definição das props para o Provider
interface AuthProviderProps {
  children: ReactNode;
}

// Definição do AuthProvider com tipagem correta
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Função para salvar o token
  const saveToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};
