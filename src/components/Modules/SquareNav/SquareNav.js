import axios from 'axios';
import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip';
import Report from '../Report';
import DeleteSheet from './DeleteSheet';
import TagEdit from './TagEdit';
import TeamMemberAdd from './TeamMemberAdd';
import TeamMemberRemove from './TeamMemberRemove';
import TeamMemberView from './TeamMemberView';
import TitleEdit from './TitleEdit';

export default function SquareNav({sheet , permission}) {

  const [active, setActive] = useState(false);
  const [popUp, setPopUp] = useState({active: false});
  const [isPublic, setIsPublic] = useState(!sheet.isPublic);

  const publicHandle = () => {
    setIsPublic(!isPublic)
    return axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheet._id}/public`,
        withCredentials: true,
        data: {
          isPublic
        }
    })
  }

  return (
    <>
      <div className={active ? "navigation active" : "navigation"} onClick={() => !active && setActive(true) }>
        {active ? (
          <>
            {permission ? (<span className="one" data-tip="Ajouter un member" onClick={() => setPopUp({title: "Ajout d'un membre", e:"teamAdd", active: true})}><i className="fa-solid fa-user-plus"></i></span>) : (<span className="one"></span>)}
            <span className='two' data-tip="Voir les members" onClick={() => setPopUp({title: "Membres", e:"teamView", active: true})}><i className="fa-solid fa-users"></i></span>
            <span className='three' onClick={() => setPopUp({title: "Edition du Titre", e:"title", active: true})} data-tip="Changer le Titre"><i className="fa-solid fa-heading"></i></span>
            <span className='four' onClick={() => setPopUp({e: "report", active: true, title: `Signalement - ${sheet.title}`})}><i className="fa-solid fa-flag"></i></span>
            {permission ? (<span className='five' onClick={() => setPopUp({title: "Supprimer la fiche", e:"delete", active: true})} data-tip="Supprimer la Fiche"><i className="fa-solid fa-ban"></i></span>) : (<span className='five'></span>)}
            <span className='six' onClick={() => setPopUp({title: "Edition du Tag", e:"tag", active: true})} data-tip="Changer l'??tiquette"><i className="fa-solid fa-tag"></i></span>
            {permission ? (<span className='seven' data-tip="Supprimer un membre" onClick={() => setPopUp({title: "Suppression d'un membre", e:"teamRmv", active: true})}><i className="fa-solid fa-user-minus"></i></span>) : (<span className='seven'></span>)}
            <span className='eight' onClick={() => setActive(false)} data-tip="Fermer le menu"><i className="fa-solid fa-minus"></i></span>
            <span className='nine' onClick={publicHandle}>{isPublic ? (<i className="fa-solid fa-eye-low-vision" data-tip='Rendre Public'></i>) :(<i className="fa-solid fa-eye" data-tip='Rendre Priv??'></i>) }</span>
            <ReactTooltip effect='solid' place='top' />
          </>
        ) : (
          <>
            <span className="one"></span>
            <span className='two'></span>
            <span className='three'></span>
            <span className='four'></span>
            <span className='five'></span>
            <span className='six' ></span>
            <span className='seven'></span>
            <span className='eight'></span>
            <span className='nine'></span>
          </>
        )}
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
              {popUp.e === 'teamAdd' && (<TeamMemberAdd sheet={sheet} />)}
              {popUp.e === 'teamRmv' && (<TeamMemberRemove sheet={sheet} />)}
              {popUp.e === 'teamView' && (<TeamMemberView sheet={sheet} />)}
              {popUp.e === 'delete' && (<DeleteSheet sheet={sheet} />)}
              {popUp.e === 'report' && (<Report reported={sheet} type="sheet" squareNav/>)}
            </div>
        </div>
      )}
      <ReactTooltip effect='solid' />
    </>
  )
}
