import React, { useEffect, useState } from "react";
import { AdminPageContainer } from "../../../components/AdminPageContainer";
import { SidebarComponent } from "../../../components/sidebar/index";
import api from "../../../services/api";
import "./styles.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registra os componentes necessários para os gráficos
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function VisaoGeral() {
  const [totalOpens, setTotalOpens] = useState<number>(0);
  const [averageStreak, setAverageStreak] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<{ email: string }[]>([]);
  const [userStreaks, setUserStreaks] = useState<{ email: string; streak: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get("/admin/metrics");
        setTotalOpens(response.data.totalOpens);
        setActiveUsers(response.data.topUsers.map((user: any) => ({ email: user.email })));
        // Lista de usuários e seus streaks
        const streaksData = response.data.topUsers.map((user: any) => ({
          email: user.email,
          streak: user.streak || 0, 
        }));
        setUserStreaks(streaksData);
        // Média de streaks por usuário
        const streakSum = response.data.topUsers.reduce((sum: number, user: any) => sum + user.streak, 0);
        const avg = streaksData.length ? streakSum / streaksData.length : 0;
        setAverageStreak(avg);
      } catch (err) {
        console.error("Erro ao buscar métricas:", err);
        setError("Erro ao carregar os dados.");
      }
    };
    fetchMetrics();
  }, []);

 

  return (
    <AdminPageContainer padding="0px">
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px" }}>
        <SidebarComponent />
      </div>

      <div className="content-1">
        <section className="cadastro-1-relatory" style={{ backgroundColor: "#FFCE04" }}>
          <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Visão Geral</h1>

          {/* Leitores Ativos */}
          <div className="content-total-leitores">
            <section className="total-leitores">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Leitores Ativos</h1>
              {activeUsers.length > 0 ? (
                <ul className="ativos-list">
                  {activeUsers.map((user, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "16px",
                        margin: "5px 0",
                        listStyle: "none",
                        marginLeft: "130px",
                      }}
                      className="ativos-item"
                    >
                      {user.email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: "center", fontSize: "16px" }}>Nenhum leitor ativo encontrado.</p>
              )}
            </section>
          </div>

          {/* Média de Streaks por Usuários */}
          <div className="content-media-streaks">
            <section className="media-streaks">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Média de Streaks por Usuário</h1>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#240E0B",
                  textAlign: "center",
                }}
              >
                {averageStreak.toFixed(2)}
              </p>
             {/* Gráfico de Barra Única - Representando a Média de Streaks */}
            <div style={{ width: "50%", height: "300px", margin: "auto" }}>
            <Bar
             data={{
             labels: ["Média de Streaks"], 
             datasets: [
            {
            label: "Média de Streaks",
            data: [averageStreak], 
            backgroundColor: "#FF8C00",
            borderRadius: 5,
            },
            ],
            }}
           options={{
           responsive: true,
           maintainAspectRatio: false,
           plugins: {
           legend: { display: false }, 
           title: {
           display: true,
           text: "Gráfico ",
           font: { size: 16 },
           },
          },
          scales: {
          x: { ticks: { font: { size: 12 }, color: "#240E0B" } },
          y: {
          beginAtZero: true,
          max: 365, 
          ticks: {
            stepSize: 50, 
            font: { size: 12 },
            color: "#240E0B",
           },
         },
        },
      }}
     />
    </div>
            </section>
          </div>

          {/* Total de Aberturas */}
          <div className="content-total-aberturas">
            <section className="total-aberturas">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Aberturas de Newsletters</h1>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#240E0B",
                  textAlign: "center",
                }}
              >
                {totalOpens}
              </p>
            </section>
          </div>
        </section>
      </div>
    </AdminPageContainer>
  );
}
