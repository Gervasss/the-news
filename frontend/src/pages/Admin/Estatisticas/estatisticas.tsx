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
        <section className="cadastro-1-relatory" style={{backgroundColor:"#FFCE04"}}>
        <h1 style={{ marginLeft: "1%" }}>Estatísticas</h1>

        <div className='content-estatistica-tempo'>
            <section className="estatistica-tempo">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Período de Tempo</h1>
       
      
            </section>
             </div>

             <div className='content-estatistica-status'>
            <section className="estatistica-status">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Status do streak</h1>
       
      
            </section>
             </div>

             <div className='content-estatistica-newslatter'>
            <section className="estatistica-newslatter">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Newsletters mais abertos</h1>
       
      
            </section>
             </div>
       
        </section>
      </div>
    </AdminPageContainer>
  );
}
