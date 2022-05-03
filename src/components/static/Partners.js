import React from 'react'

export default function Partners() {
  return (
    <div className='partners-container'>
        
        <h1>Nos Partenaires</h1>
        
        <div className="content">
           
            <div className="box">
                <img className='icon' src="/cdn/content/partenaires/gillancodes.png" alt="GillanCodes" />
                <p className='name'>GillanCodes</p>
                <p className='desc'>Fondateur, Studify & Codeed</p>
            </div>

            <div className="box">
                <img className='icon' src="/cdn/content/partenaires/codeed.png" alt="Codeed" />
                <p className='name'>Codeed</p>
                <p className='desc'>Fondateur, Editeur et Developpeur du projet</p>
            </div>

            <div className="box">
                <img className='icon' src="/cdn/content/partenaires/pufferstyl.png" alt="Puffer" />
                <p className='name'>Puffer</p>
                <p className='desc'>Porteur du Projet, Beta-Testeur & Graphiste</p>
            </div>

        </div>

    </div>
  )
}
