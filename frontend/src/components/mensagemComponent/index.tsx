import React, { useEffect, useState } from "react";
import "./styles.css";
import ReactQuill from "react-quill";

type MensagemComponentProps = {
  userId: string;
  message: { id: number; conteudo: string } | null;
};

const MensagemComponent: React.FC<MensagemComponentProps> = ({ userId, message }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (message) {
      setShowPopup(true);
    }
  }, [message]);
  
  const closePopup = () => {
    if (message) {
      const viewedMessages = JSON.parse(localStorage.getItem(`viewedMessages_${userId}`) || "[]");
      viewedMessages.push(message.id);
      localStorage.setItem(`viewedMessages_${userId}`, JSON.stringify(viewedMessages));
    }
    setShowPopup(false);
  };

  return (
    showPopup && message ? (
      <div className="pop-up-container">
        <div className="pop-up">
            <div className="popup-content-">
            <ReactQuill
                    style={{ height: '200px', width: '100%',marginTop:"-50px" }}
                    value={message.conteudo}
                    readOnly={true}
                    modules={{ toolbar: false }}
                  />
          <p></p>
          <button onClick={closePopup}>Fechar</button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default MensagemComponent;
