import { SelectUnstyledContext } from '@mui/base';
import axios from 'axios';
import React, { useState } from 'react'

export default function Contact() {

  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [content, setContent] = useState("");
  const [send, setSend] = useState(false);
  
  const sendHandle = () => {

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/contact`,
      data: {
        email, pseudo, content
      }
    }).then(() => {
      setSend(true);
      setContent('');
      setEmail('');
      setPseudo('');
    }) 

  }

  return (
    <div className='contact-container'>
      
      <h1>Nous Contacter</h1>

      <div className="fields">
      {send && (<p>Message Envoyé !</p>)}
        <div className="field">
          <span>Email*</span>
          <input type="email" name="email" id="email" value={email} required  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="field">
          <span>Pseudo</span>
          <input type="text" name="pseudo" id="pseudo" value={pseudo}  onChange={(e) => setPseudo(e.target.value)}/>
        </div>
        <div className="field">
          <span>Contenu de l'e-mail*</span>
          <textarea name="content" id="content" value={content} required onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="field">
          <button className='send' onClick={sendHandle}>Envoyer</button>
        </div>
      </div>

     
      <div className="social">
        <h2>Nos réseaux sociaux</h2>
        <div className="links">
          <a href="https://twitter.com/opencodess">Twitter</a>
          <a href="mailto:contact.codeed@gmail.com">Mail</a>

        </div>
      </div>

    </div>
  )
}
