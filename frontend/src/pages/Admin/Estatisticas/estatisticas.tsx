import React, { useEffect, useState } from "react";
import { AdminPageContainer } from "../../../components/AdminPageContainer";
import { SidebarComponent } from "../../../components/sidebar/index";
import api from "../../../services/api";
import "./styles.css";

export function Estatisticas() {
  const [usersLast7Days, setUsersLast7Days] = useState<{ email: string; lastOpened: string; streak:number }[]>([]);
  const [streakAbove, setStreakAbove] = useState<{ email: string; streak: number }[]>([]);
  const [topNewsletters, setTopNewsletters] = useState<{postId : string; openCount: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await api.get("/admin/metrics");
        if (!response.data || !response.data.topUsers || !response.data.newsletterStats) {
          setError("Erro ao carregar os dados.");
          return;
        }
        // Filtrar usuários ativos nos últimos 7 dias
        const last7DaysUsers = response.data.topUsers.map((user: any) => ({
          email: user.email,
          lastOpened: user.lastOpened
            ? new Date(user.lastOpened).toLocaleDateString("pt-BR")
            : "N/A",
          streak: user.streak || 0,
        })).sort((a:any, b:any) => b.streak - a.streak); 
        ;
        setUsersLast7Days(last7DaysUsers);
        // Filtrar usuários com streak acima de 6 dias
        const usersWithStreak = response.data.topUsers
          .filter((user: any) => user.streak > 6)
          .map((user: any) => ({
            email: user.email,
            streak: user.streak,
          }
        )).sort((a:any, b:any) => b.streak - a.streak); 
        ;
        setStreakAbove(usersWithStreak);
        // Ordenar newsletters mais abertas 
        const newsletters = response.data.newsletterStats
          .map((newsletter: any) => ({
            postId: newsletter.postId, 
            openCount: newsletter.openCount,
          }))
          .sort((a: any, b: any) => b.openCount - a.openCount); 
  
        setTopNewsletters(newsletters);
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
          <h1 style={{ marginLeft: "1%" }}>Estatísticas</h1>
          {/* Período de Tempo */}
          <div className="content-estatistica-tempo">
            <section className="estatistica-tempo">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Top Usuários (Última semana)</h1>
              {usersLast7Days.length > 0 ? (
                <ul className="tempo-list">
                  {usersLast7Days.map((user, index) => (
                    <li key={index} style={{ fontSize: "16px", margin: "5px 0", listStyle: "none", marginLeft: "130px" }}
                    className="tempo-item">
                      {user.email} - <strong>Last Open</strong> {user.lastOpened} - <strong>Streak </strong>{user.streak}🔥
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: "center", fontSize: "16px" }}>Nenhum usuário ativo nos últimos 7 dias.</p>
              )}
            </section>
          </div>
          {/* Status do Streak */}
          <div className="content-estatistica-status">
            <section className="estatistica-status">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Usuários com Streak acima de 6 dias</h1>
              {streakAbove.length > 0 ? (
                <ul className="days-list">
                  {streakAbove.map((user, index) => (
                    <li key={index} style={{ fontSize: "16px", margin: "5px 0", listStyle: "none", marginLeft: "130px" }}
                    className="days-item">
                      {user.email} - <strong>Streak </strong>{user.streak}🔥
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: "center", fontSize: "16px" }}>Nenhum usuário com streak acima de 6 dias.</p>
              )}
            </section>
          </div>
          {/* Newsletters Mais Abertos */}
          <div className="content-estatistica-newslatter">
            <section className="estatistica-newslatter">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Newsletters Mais Abertos</h1>
              {topNewsletters.length > 0 ? (
                <ul className="topNews-list">
                  {topNewsletters.map((newsletter, index) => (
                    <li key={index} style={{ fontSize: "16px", margin: "5px 0", listStyle: "none", marginLeft: "130px" }}
                    className="topNews-item">
                      📰 {newsletter.postId} -  <strong>{newsletter.openCount}</strong> aberturas
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: "center", fontSize: "16px" }}>Nenhuma newsletter aberta.</p>
              )}
            </section>
          </div>
        </section>
      </div>
    </AdminPageContainer>
  );
}
