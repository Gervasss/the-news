import React, { useEffect, useState } from "react";
import { AdminPageContainer } from "../../components/AdminPageContainer";
import { CiLogout } from "react-icons/ci";
import api from "../../services/api"; 
import "./styles.css";
import "../../components/mensagemComponent/styles.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Mensagem } from "../Admin/mensagens/mensagens";
import MenssagemComponent from "../../components/mensagemComponent";
import MensagemComponent from "../../components/mensagemComponent";

export function Leitores() {
  const [streak, setStreak] = useState<number>(0);
  const [lastOpened, setLastOpened] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [latestMessage, setLatestMessage] = useState<{ id: number; conteudo: string } | null>(null);


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Usuário não autenticado.");
          logout();
          return;
        }

        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserId(response.data.id);
        setStreak(response.data.streak?.streak || 0);
        setLastOpened(response.data.streak?.lastOpened || null);

        setHistory((prevHistory) => {
          const newEntry = new Date(response.data.streak?.lastOpened).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          if (prevHistory.includes(newEntry)) {
            return prevHistory;
          }
          return [...prevHistory, newEntry];
        });
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError("Erro ao carregar dados.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const checkForNewMessage = async () => {
      if (!userId) return;
  
      try {
        const response = await api.get("/mensagens"); // Pegamos todas as mensagens
        const mensagens: { id: number; conteudo: string }[] = response.data;
  
        if (mensagens.length > 0) {
          const lastMensagem = mensagens[mensagens.length - 1]; // Última cadastrada
          const viewedMessages = JSON.parse(localStorage.getItem(`viewedMessages_${userId}`) || "[]");
  
          if (!viewedMessages.includes(lastMensagem.id)) {
            setHasNewMessage(true);
            setLatestMessage({ id: lastMensagem.id, conteudo: lastMensagem.conteudo });
          }
        }
      } catch (error) {
        console.error("Erro ao verificar mensagens:", error);
      }
    };
  
    checkForNewMessage();
  }, [userId]);
  

  return (
    <AdminPageContainer padding="0px">
    {userId && hasNewMessage && latestMessage && (
  <MensagemComponent userId={userId} message={latestMessage} />
     )}

      <div className="content-1">
        <section className="cadastro-1-leitor" style={{ backgroundColor: "#FFCE04" }}>
          <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Meus Dados</h1>
          <CiLogout size={30} className="log-out" onClick={logout} onMouseOver={() => setShowTooltip(true)} 
            onMouseOut={() => setShowTooltip(false)} />
              {showTooltip && (
              <span className="tooltip">Sair da conta</span>
            )}
          <div className="content-streak-leitor">
            <section className="streak-leitor">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Streak Atual</h1>
              <div style={{ width: 150, height: 150, margin: "auto" }}>
                <CircularProgressbar
                  value={(streak / 365) * 100}
                  text={`${streak} `}
                  styles={buildStyles({
                    textSize: "16px",
                    pathColor: "#483018",
                    textColor: "#240E0B",
                    trailColor: "#ddd",
                  })}
                />
              </div>
              <p>{streak} dias consecutivos</p>
              {lastOpened && <p>Última abertura: {new Date(lastOpened).toLocaleDateString("pt-BR")}</p>}
            </section>
          </div>
          <div className="content-historico-leitor">
            <section className="historico-leitor">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Histórico de Aberturas</h1>
              {history.length > 0 ? (
                <ul>
                  {history.map((date, index) => (
                    <li key={index} style={{ listStyleType: "none", fontSize: "16px", marginLeft: "-25px" }}>
                      📅 {date}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum registro encontrado.</p>
              )}
            </section>
          </div>
        </section>
      </div>
    </AdminPageContainer>
  );
}
