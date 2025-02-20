import React, { useEffect, useState } from 'react';
import { AdminPageContainer } from '../../../components/AdminPageContainer';
import { SidebarComponent } from '../../../components/sidebar/index';
import './styles.css';









export function Engajamento() {
   


 


  return (
    <AdminPageContainer padding="0px">
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <SidebarComponent  />
      </div>

      <div className="content-1">
        <section className="cadastro-1-relatory" style={{backgroundColor:"#FFCE04"}}>
        <h1 style={{ marginLeft: "1%" }}>Engajamento</h1>
       
        <div className='content-engajamento-leitor'>
            <section className="engajamento-leitor">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Engajamento ao longo do tempo</h1>
       
      
            </section>
             </div>
             <div className='content-popular-dia'>
            <section className="popular-dia">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Comparação Entre Dias da Semana</h1>
       
      
            </section>
             </div>
           

        </section>
      </div>
    </AdminPageContainer>
  );
}
