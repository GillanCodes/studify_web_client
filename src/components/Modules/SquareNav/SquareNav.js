import React, { useState } from 'react'
import TagEdit from './TagEdit';
import TitleEdit from './TitleEdit';

export default function SquareNav({sheet}) {

  const [active, setActive] = useState(false);

  const [popUp, setPopUp] = useState({active: false});

  return (
    <>
      <div className={active ? "navigation active" : "navigation"} onClick={() => setActive(!active)}>
        <span className="one"><i className="fa-solid fa-user-plus"></i></span>
        <span className='two'><i class="fa-solid fa-users"></i></span>
        <span className='three' onClick={() => setPopUp({title: "Edition du Titre", e:"title", active: true})}><i className="fa-solid fa-heading"></i></span>
        <span className='four'><i className="fa-solid fa-minus"></i></span>
        <span className='five'><i className="fa-solid fa-ban"></i></span>
        <span className='six' onClick={() => setPopUp({title: "Edition du Tag", e:"tag", active: true})}><i className="fa-solid fa-tag"></i></span>
        <span className='seven'><i className="fa-solid fa-user-minus"></i></span>
        <span className='eight'><i className="fa-solid fa-minus"></i></span>
        <span className='nine'><i className="fa-solid fa-minus"></i></span>
      </div>


      {popUp.active && (
        <div className='popup'>
            <div className="head">
            <h3>{popUp.title}</h3>
            <i className="fa-solid fa-circle-xmark" onMouseOver={(e) => e.target.className = e.target.className + " fa-shake"} onMouseLeave={(e) => e.target.className = "fa-solid fa-circle-xmark"} onClick={() => setPopUp({active: false})}></i>
            </div>
            <div className="body">
              {popUp.e === 'tag' && (<TagEdit sheetId={sheet._id} tag={sheet.tag} />)} 
              {popUp.e === 'title' && (<TitleEdit sheet={sheet} />)}              
            </div>
        </div>
      )}
    </>
  )
}
