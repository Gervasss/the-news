import React, { useEffect, useState } from 'react';
import { AdminPageContainer } from '../../../components/AdminPageContainer';
import { SidebarComponent } from '../../../components/sidebar/index';
import './styles.css';









export function Estatisticas() {
   


 


  return (
    <AdminPageContainer padding="0px">
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <SidebarComponent  />
      </div>

      <div className="content-1">
        <section className="cadastro-1-relatory">
        <h1 style={{ marginLeft: "1%" }}>Estatísticas</h1>
       
        </section>
      </div>
    </AdminPageContainer>
  );
}
