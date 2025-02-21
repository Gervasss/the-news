/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */


import { useNavigate } from 'react-router-dom';
import Sidebutton from './Sidebutton';
import { Sidebar } from './styles';
import "./styles.css"



export function SidebarComponent() {
  const navigate = useNavigate();




  return (
    <Sidebar>
   <div className="top">
   <img src="/src/assets/coffe-logo.webp" alt="Logo" className="top-image"   />
</div>


      <section className="admin-buttons">

        <div className="buttons">



          <Sidebutton tittle="Dashboard" onClick={() => navigate('/admin')} />

          <Sidebutton tittle="Visão Geral" onClick={() => navigate('/admin/visaogeral')} />

          <Sidebutton tittle="Ranking" onClick={() => navigate('/admin/ranking')} />

          <Sidebutton tittle="Estatísticas" onClick={() => navigate('/admin/estatistica')} />

          <Sidebutton tittle="Engajamento" onClick={() => navigate('/admin/engajamento')} />

          <Sidebutton tittle="Mensagem" onClick={() => navigate('/admin/mensagem')} />

         
        





        </div>
      </section>
    </Sidebar>
  );
}
