import React, { useEffect, useState } from "react";
import { AdminPageContainer } from "../../../components/AdminPageContainer";
import { SidebarComponent } from "../../../components/sidebar/index";
import "./styles.css";
import api from "../../../services/api";

export function Ranking() {
  const [userStreaks, setUserStreaks] = useState<{ email: string; streak: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get("/admin/metrics");
        const topUsers = response.data.topUsers.map((user: any) => ({
          email: user.email, 
          streak: user.streak || 0, 
        })).sort((a:any, b:any) => b.streak - a.streak)
        ;
        setUserStreaks(topUsers);
      } catch (err) {
        console.error("Erro ao buscar métricas:", err);
        setError("Erro ao carregar os dados.");
      }
    };
    fetchMetrics();
  }, []);

  return (
    <AdminPageContainer padding="0px">
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <SidebarComponent />
      </div>

      <div className="content-1">
        <section className="cadastro-1-relatory" style={{ backgroundColor: "#FFCE04" }}>
          <h1 style={{ marginLeft: "1%" }}>Ranking</h1>
          {/* Leitores mais engajados */}
          <div className="content-ranking-leitor">
            <section className="ranking-leitor">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Usuários Mais Engajados</h1>
              {userStreaks.length > 0 ? (
                <ul className="top-list">
                  {userStreaks.map((user, index) => (
                    <li key={index} style={{ fontSize: "16px", margin: "5px 0", listStyle: "none", marginLeft: "130px" }}
                      className="top-item">
                      {user.email} - <strong>Streak: </strong> {user.streak}🔥
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: "center", fontSize: "16px" }}>Nenhum leitor encontrado.</p>
              )}
            </section>
          </div>
        </section>
      </div>
    </AdminPageContainer>
  );
}
