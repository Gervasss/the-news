import React, { useEffect, useState } from 'react';
import { AdminPageContainer } from '../../components/AdminPageContainer';
import { CiLogout } from "react-icons/ci";
import './styles.css';









export function Leitores() {
   


 


  return (
    <AdminPageContainer padding="0px" >
    

      <div className="content-1">
       
      <section className="cadastro-1-leitor"  style={{backgroundColor:"#FFCE04"}}>
        
        <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Seus Dados</h1>
        <CiLogout  size={30} className='log-out'/>
   
            <div className='content-streak-leitor'>
            <section className="streak-leitor">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>streak Atual</h1>
       
      
            </section>
             </div>
             <div className='content-historico-leitor'>
            <section className="historico-leitor">
       
            <h1 style={{ marginLeft: "1%",color:"#240E0B" }}>Histórico de Aberturas</h1>
       
      
            </section>
             </div>

             

        </section>
      </div>
    </AdminPageContainer>
  );
}
