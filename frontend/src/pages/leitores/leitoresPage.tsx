import React, { useEffect, useState } from 'react';
import { AdminPageContainer } from '../../components/AdminPageContainer';
import { CiLogout } from "react-icons/ci";
import './styles.css';









export function Leitores() {
   


 


  return (
    <AdminPageContainer padding="0px">
    

      <div className="content-1">
       
        <section className="cadastro-1-leitor">
        
        <h1 style={{ marginLeft: "1%" }}>Seus Dados</h1>
        <CiLogout  size={30} className='log-out'/>
       
        </section>
      </div>
    </AdminPageContainer>
  );
}
