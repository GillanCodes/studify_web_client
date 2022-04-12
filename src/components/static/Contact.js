import React from 'react'

export default function Contact() {
  return (
    <div className='contact-container'>
      
      <h1>Nous Contacter</h1>

      <div className="fields">
        <div className="field">
          <span>Email*</span>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="field">
          <span>Pseudo</span>
          <input type="text" name="pseudo" id="pseudo" />
        </div>
        <div className="field">
          <span>Contenu de l'e-mail*</span>
          <textarea name="content" id="content" required></textarea>
        </div>
        <div className="field">
          <button className='send'>Envoyer</button>
        </div>
      </div>

     
      <div className="social">
        <h2>Nos réseaux sociaux</h2>
        <div className="links">
          <a href="https://twitter.com/opencodess">Twitter</a>
          <a href="mailto:opencodess@gmail.com">Mail</a>

        </div>
      </div>

    </div>
  )
}
