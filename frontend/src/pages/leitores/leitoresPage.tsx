import React, { useEffect, useState } from "react";
import { AdminPageContainer } from "../../components/AdminPageContainer";
import { CiLogout } from "react-icons/ci";
import api from "../../services/api"; 
import "./styles.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export function Leitores() {
  const [streak, setStreak] = useState<number>(0);
  const [lastOpened, setLastOpened] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
 

  
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Obtém os dados do usuário autenticado
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

       
        setStreak(response.data.streak?.streak || 0);
        setLastOpened(response.data.streak?.lastOpened || null);

        // Atualiza o histórico, garantindo que os dados sejam mantidos corretamente
        setHistory((prevHistory) => {
          const newEntry = new Date(response.data.streak?.lastOpened).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          if (prevHistory.includes(newEntry)) {
            return prevHistory; // Evita duplicatas
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

  return (
    <AdminPageContainer padding="0px">
      <div className="content-1">
        <section className="cadastro-1-leitor" style={{ backgroundColor: "#FFCE04" }}>
          <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Meus Dados</h1>
          <CiLogout size={30} className="log-out" onClick={logout} onMouseOver={() => setShowTooltip(true)} 
            onMouseOut={() => setShowTooltip(false)} />
              {showTooltip && (
              <span
              className="tooltip"
              >
                Sair da conta
              </span>
            )}
           {/* Streak Atual*/}
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
           {/* Histórico de aberturas */}
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
