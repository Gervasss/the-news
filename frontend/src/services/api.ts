import axios from "axios";

{/*const API_BASE_URL = "https://722e-191-251-11-23.ngrok-free.app";  */}
const API_BASE_URL = "http://localhost:4000"; 


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Função para login ou registro
export const loginOrRegister = async (email: string) => {
  const response = await api.post("/auth/login", { email });
  return response.data; // Retorna { token, user }
};

// Função para obter o streak do usuário autenticado
export const getUserStreak = async (token: string) => {
  const response = await api.get(`/user/streak`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Retorna { streak, lastOpened }
};

//  Função para obter o perfil do usuário autenticado
export const getUserProfile = async (token: string) => {
  const response = await api.get(`/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Retorna { id, email, createdAt, streak }
};

//  Função para processar manualmente um webhook (somente para testes)
export const testWebhook = async (email: string, postId: string) => {
  const response = await api.post("/webhook/newsletter-open", { email, id: postId });
  return response.data; // Retorna { message: "Registro atualizado!" }
};

//  Função para obter métricas do dashboard administrativo
export const getDashboardMetrics = async () => {
  const response = await api.get(`/admin/metrics`);
  return response.data; // Retorna { totalUsers, totalOpens, topUsers }
};

export default api;
