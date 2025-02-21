import React, { useEffect, useState } from "react";
import { AdminPageContainer } from "../../../components/AdminPageContainer";
import { SidebarComponent } from "../../../components/sidebar/index";
import api from "../../../services/api";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles.css";

// Registrando os elementos do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export function Engajamento() {
  const [streakByDay, setStreakByDay] = useState<{ day: string; streakCount: number }[]>([]);
  const [streakOverTime, setStreakOverTime] = useState<{ date: string; totalStreaks: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await api.get("/admin/metrics");

        if (!response.data || !response.data.topUsers) {
          setError("Erro ao carregar os dados.");
          return;
        }

        // ---------------------
        // Engajamento ao longo do tempo (Gráfico de Linha)
        // ---------------------
        const streakHistory: { [date: string]: number } = {};

        response.data.topUsers.forEach((user: any) => {
          if (user.lastOpened) {
            const date = new Date(user.lastOpened).toLocaleDateString("pt-BR");
            streakHistory[date] = (streakHistory[date] || 0) + user.streak;
          }
        });

        const streakTrend = Object.keys(streakHistory).map((date) => ({
          date,
          totalStreaks: streakHistory[date],
        }));

        setStreakOverTime(streakTrend);

        // ---------------------
        // Comparação dias da semana (Gráfico de Barras)
        // ---------------------
        const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const streaksByWeekday: { [key: string]: number } = {
          Segunda: 0,
          Terça: 0,
          Quarta: 0,
          Quinta: 0,
          Sexta: 0,
          Sábado: 0,
        };

        response.data.topUsers.forEach((user: any) => {
          if (user.lastOpened) {
            const dayIndex = new Date(user.lastOpened).getDay();
            if (dayIndex !== 0) {
              // Exclui domingo
              const weekDay = weekDays[dayIndex - 1]; 
              streaksByWeekday[weekDay] += user.streak;
            }
          }
        });

        const dailyStreaks = weekDays.map((day) => ({
          day,
          streakCount: streaksByWeekday[day] || 0,
        }));

        setStreakByDay(dailyStreaks);
      } catch (err) {
        console.error("Erro ao buscar estatísticas:", err);
        setError("Erro ao carregar os dados.");
      }
    };

    fetchStatistics();
  }, []);

  return (
    <AdminPageContainer padding="0px">
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <SidebarComponent />
      </div>

      <div className="content-1">
        <section className="cadastro-1-relatory" style={{ backgroundColor: "#FFCE04" }}>
          <h1 style={{ marginLeft: "1%" }}>Engajamento</h1>

          {/* Gráfico de Engajamento ao Longo do Tempo */}
          <div className="content-engajamento-leitor">
            <section className="engajamento-leitor">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Engajamento ao longo do tempo</h1>
              <div style={{ width: "90%", height: "300px", margin: "auto" }}>
                <Line
                  data={{
                    labels: streakOverTime.map((d) => d.date),
                    datasets: [
                      {
                        label: "Total de Streaks",
                        data: streakOverTime.map((d) => d.totalStreaks),
                        borderColor: "#240E0B",
                        backgroundColor: "rgba(36, 14, 11, 0.2)",
                        borderWidth: 2,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                      point: {
                        radius: 4, // Pontos visíveis na linha
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 365,
                        ticks: {
                          stepSize: 10,
                        },
                      },
                    },
                  }}
                />
              </div>
            </section>
          </div>

          {/* Gráfico de Comparação entre Dias da Semana */}
          <div className="content-popular-dia">
            <section className="popular-dia">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Comparação Entre Dias da Semana</h1>
              <div style={{ width: "90%", height: "300px", margin: "auto" }}>
                <Bar
                  data={{
                    labels: streakByDay.map((d) => d.day),
                    datasets: [
                      {
                        label: "Total de Streaks",
                        data: streakByDay.map((d) => d.streakCount),
                        backgroundColor: "#FF8C00",
                        borderRadius: 5,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 365, 
                        ticks: {
                          stepSize: 50, 
                        },
                      },
                    },
                  }}
                />
              </div>
            </section>
          </div>
        </section>
      </div>
    </AdminPageContainer>
  );
}
