import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

export default function Report({ reported, type, squareNav }) {

    const userData = useSelector(state => state.userReducer);

    const [active, setActive] = useState(squareNav ? true : false);
    const [isReported, setIsReported] = useState(false);

    const reportHandle = (reason) => {
        if (!isReported){
            const data = {
                reporter : userData._id,
                reported : reported._id,
                reason : reason,
                rType : type
            }
    
            return axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/report/`,
                withCredentials: true,
                data
            }).then((res) => {
                setIsReported(true);
            }).catch((err) => console.log(err));
        }
    }

  return (
    <>
        {!squareNav && (
            <div className='report-btn' onClick={() => setActive(!active)} data-tip={`Signaler ${type === "user" ? "l'utilisateur" : ""} ${type === "sheet" ? "la fiche" : ""}`}>
                <i className="fa-solid fa-flag"></i>
            </div>
        )}

        {active && (
            <div className='popup'>
                <div className="head">
                    <h3>Signalement - {type === "user" && reported.username } {type === "sheet" && reported.title }</h3>
                    <i className="fa-solid fa-circle-xmark" onMouseOver={(e) => e.target.className = e.target.className + " fa-shake"} onMouseLeave={(e) => e.target.className = "fa-solid fa-circle-xmark"} onClick={() => setActive(!active)}></i>
                </div>
                <div className="body">
                    <div className="reportPop">
                        <h3 className='title'>Raisons</h3>
                        {type === "user" && (
                            <div className="fields user">
                                <p className="reason" onClick={() => reportHandle("offensive_username")}> Nom d'utilisateur offensant</p>   
                                <p className="reason" onClick={() => reportHandle("offensive_picture")}>Image de profile inappropriée / offensante</p>
                            </div>
                        )}

                        {type === "sheet" && (
                            <div className="fields user">
                                <p className="reason" onClick={() => reportHandle("offensive_content")}>Contenu Offensant/innaproprié</p>  
                                <p className="reason" onClick={() => reportHandle("offensive_title")}>Titre inapproprié</p>   
                                <p className="reason" onClick={() => reportHandle("offensive_tag")}>Tag inapproprié</p>   
                            </div>
                        )}
                        {isReported && (<p className='success'>Signalement envoyer avec success !</p>)}
                    </div>
                </div>
            </div>
        )}

        {squareNav && (
            <div className='reportPop'>
                <h3 className='title'>Raisons</h3>
                {type === "user" && (
                    <div className="fields user">
                        <p className="reason" onClick={() => reportHandle("offensive_username")}> Nom d'utilisateur offensant</p>   
                        <p className="reason" onClick={() => reportHandle("offensive_picture")}>Image de profile inappropriée / offensante</p>
                    </div>
                )}

                {type === "sheet" && (
                    <div className="fields sheet">
                        <p className="reason" onClick={() => reportHandle("offensive_content")}>Contenu Offensant/innaproprié</p>  
                        <p className="reason" onClick={() => reportHandle("offensive_title")}>Titre inapproprié</p>   
                        <p className="reason" onClick={() => reportHandle("offensive_tag")}>Tag inapproprié</p>   
                    </div>
                )}
                {isReported && (<p className='sucess'>Signalement envoyer avec success !</p>)}
            </div>
            
        )}



        <ReactTooltip effect='solid' />
    </>
  )
}
