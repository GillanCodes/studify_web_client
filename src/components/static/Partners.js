import React from 'react'

export default function Partners() {
  return (
    <div className='partners-container'>
        
        <h1>Nos Partenaires</h1>
        
        <div className="content">
           
            <div className="box">
                <img className='icon' src="/cdn/content/partenaires/gillancodes.png" alt="OpenCodes" />
                <p className='name'>GillanCodes</p>
                <p className='desc'>Fondateur, RevTon'Bac & OpenCodes</p>
            </div>

            <div className="box">
                <img className='icon' src="/cdn/content/partenaires/opencodes.png" alt="OpenCodes" />
                <p className='name'>OpenCodes</p>
                <p className='desc'>Fondateur, Editeur et Developpeur du projet</p>
            </div>

        </div>

    </div>
  )
}
