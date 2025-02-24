import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AdminPageContainer } from '../../../components/AdminPageContainer';
import { SidebarComponent } from '../../../components/sidebar/index';
import './styles.css';
import api from '../../../services/api';

export function Mensagem() {
  const [conteudo, setConteudo] = useState(""); 

  const handleSubmit = async () => {
    try {
      if (!conteudo.trim()) {
        alert("A mensagem não pode estar vazia!");
        return;
      }
      await api.post("/mensagens", { conteudo }, {
      });
      console.log("Mensagem enviada com sucesso!");
      setTimeout(() => {
        alert("Mensagem enviada com sucesso!");
      }, 2000);
      setConteudo(""); 
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <AdminPageContainer padding="0px">
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <SidebarComponent />
      </div>

      <div className="content-1">
        <section className="cadastro-1-relatory" style={{ backgroundColor: "#FFCE04" }}>
          <h1 style={{ marginLeft: "1%" }}>Mensagens</h1>

          <div className='content-msg-leitor'>
            <section className="msg-leitor">
              <h1 style={{ marginLeft: "1%", color: "#240E0B" }}>Mensagem motivacional para usuários</h1>
              <br />

              <ReactQuill
                style={{ height: '200px', width: '100%', marginLeft: '0px' }}
                value={conteudo} 
                placeholder='Adicione aqui o conteúdo...'
                onChange={setConteudo} 
                formats={[
                  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
                  'blockquote', 'list', 'bullet', 'indent', 'color', 'image'
                ]}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['clean'],
                    [{ color: [] }],
                    ['image'],
                  ],
                }}
              />

              <button className='button' onClick={handleSubmit}>
                Enviar
              </button>
            </section>
          </div>
        </section>
      </div>
    </AdminPageContainer>
  );
}
