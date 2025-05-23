import axios from "axios";

{/*const API_BASE_URL = "https://7f8a-191-251-10-127.ngrok-free.app";  */}
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
export const getUserStreak = async (token: string) => {
  const response = await api.get(`/user/streak`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Retorna { streak, lastOpened }
};
export const getUserProfile = async (token: string) => {
  const response = await api.get(`/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Retorna { id, email, createdAt, streak }
};
export const testWebhookQuery = async (email: string, postId: string) => {
  const response = await api.get("/webhook/newsletter-open", {
    params: { email, id: postId }
  });
  return response.data; // Retorna { message: "Registro atualizado!" }
};
export const getDashboardMetrics = async () => {
  const response = await api.get(`/admin/metrics`);
  return response.data; // Retorna { totalUsers, totalOpens, topUsers }
};
// Endpoints de Mensagens
export const createMensagem = async (conteudo: string, token: string) => {
  const response = await api.post("/mensagens", { conteudo }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const getMensagens = async (token: string) => {
  const response = await api.get("/mensagens", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const getMensagemById = async (id: string, token: string) => {
  const response = await api.get(`/mensagens/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const updateMensagem = async (id: string, conteudo: string, token: string) => {
  const response = await api.put(`/mensagens/${id}`, { conteudo }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const deleteMensagem = async (id: string, token: string) => {
  const response = await api.delete(`/mensagens/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;
