import React, { useEffect, useState } from 'react';
import { AdminPageContainer } from '../../../components/AdminPageContainer';
import { SidebarComponent } from '../../../components/sidebar/index';
import './styles.css';









export function VisaoGeral() {
   


 


  return (
    <AdminPageContainer padding="0px">
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <SidebarComponent  />
      </div>

      <div className="content-1">
        <section className="cadastro-1-relatory"  style={{backgroundColor:"#FFCE04"}}>
        <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Visão Geral</h1>


           <div className='content-total-leitores'>
            <section className="total-leitores">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Leitores Ativos</h1>
       
      
             </section>
             </div>


             <div className='content-media-streaks'>
            <section className="media-streaks">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Média de Streaks</h1>
       
      
             </section>
             </div>

             <div className='content-total-aberturas'>
            <section className="total-aberturas">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Aberturas Newsletters</h1>
       
      
             </section>
             </div>
             
        </section>
      </div>
    </AdminPageContainer>
  );
}
