import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';
import Report from '../Modules/Report';
import ReactTooltip from 'react-tooltip';
import Quizz from '../Home/HomeScreen/Quizz';


export default function ProfilViewer({ user }) {


    const [isLoading, setIsLoading] = useState(true);
    const sheetsData = useSelector(state => state.sheetsReducer);
    const quizzData = useSelector(state => state.quizzReducer);

    const [displaySheets, setDisplaySheets] = useState(true);
    const [displayQuizz, setDisplayQuizz] = useState(true);

    useEffect(() => {
        if (!isEmpty(sheetsData) && !isEmpty(quizzData)) {
            setIsLoading(false);
        }
    }, [sheetsData, quizzData]);

    return (
        <div className='profil-container app-container'>
            
            
            {!user.ban.isBan ? (
                <>
                    <div className="profil-content profil">

                        <div className="head is-mobile-spaced">
                            <div className='img-container'>
                                <img src={user.userPic.imageUrl} alt="PP"/>
                            </div>
                            <p className='username'>{user.displayName ? user.displayName : user.username }</p>
                            <p className="icons">{user.certified && (<i className="fa-solid fa-circle-check icon" data-tip="Certifié"></i>)} {user.permissions.DASHBOARD && (<i className="fa-solid fa-desktop icon" data-tip="Staff"></i>)}</p> 
                            <Report reported={user} type="user" />
                            <ReactTooltip effect='solid' />
                        </div>

                        </div>

                        <div className="profil-content docs">
                
                            <div className="sheets">
                                <h2 className='title' onClick={() => setDisplaySheets(!displaySheets)}>Fiches de l'utilisateur {displaySheets ? (<i class="fa-solid fa-angle-down open"></i>) : <i class="fa-solid fa-angle-down closed"></i>}</h2>
                                {displaySheets && (
                                    <>
                                        {isLoading ? (
                                            <Loading />
                                        ) : (
                                            <div className='content'>
                                                {sheetsData.map((sheet) => {
                                                    if (sheet.author === user._id) {
                                                        return <File sheet={sheet} key={sheet._id} />
                                                    }
                                                    return null
                                                })}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            
                            <div className="quizz">
                                <h2 className='title' onClick={() => setDisplayQuizz(!displayQuizz)}>Quizz de l'utilisateur {displayQuizz ? (<i class="fa-solid fa-angle-down open"></i>) : <i class="fa-solid fa-angle-down closed"></i>}</h2>
                                {displayQuizz && (
                                    <>
                                        {isLoading ? (
                                            <Loading />
                                        ) : (
                                            <div className='content'>
                                                {quizzData.map((quizz) => {
                                                    if (quizz.author === user._id) {
                                                        return <Quizz quizz={quizz} key={quizz._id} />
                                                    }
                                                    return null
                                                })}
                                        </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                </>
                
            ) : (
                <div className="ban">
                    <h1>This user is ban !</h1>
                </div>
            )}



        </div>
    );
}
