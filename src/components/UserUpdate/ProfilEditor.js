import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import Quizz from '../Home/HomeScreen/Quizz';
import { resetProfilImage } from '../../action/user.action';


export default function ProfilEditor({ user }) {

    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    const [displaySheets, setDisplaySheets] = useState(true);
    const [displayQuizz, setDisplayQuizz] = useState(true);

    const [displayName, setDisplayName] = useState(user.displayName ? user.displayName : user.username);
    const [file, setFile] = useState();

    const sheetsData = useSelector(state => state.sheetsReducer);
    const quizzData = useSelector(state => state.quizzReducer);

    const errorType = document.getElementById('errorType');
    const errorSize = document.getElementById('errorSize');

    const [src, setSrc] = useState(user.userPic.imageUrl);

    const dispatch = useDispatch()

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0]));
    }

    const saveHandle = (e) => {
        setEditing(false)

        if (isEmpty(displayName)) {
            setDisplayName(user.username)
        }

        if (displayName !== user.displayName) {
            axios({
                method: 'PUT',
                withCredentials: true,
                url: `${process.env.REACT_APP_API_URL}/api/user/${user._id}`,
                data: {
                    displayName
                }
            }).then((res) => {
                if (file) {
                    handlePic()
                }
                setEditing(false);
                return;     
            }).catch((err) => console.log(err)); 
        }

        handlePic();
    }

    const handlePic = () => {
        if (file === "reset") {
            console.log("nop")
            return
        }

        const data = new FormData();
        data.append('username', user.username);
        data.append('userId', user._id);
        data.append('file', file);

        axios({
            method: 'POST',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/uplaod/picture/old`,
            data: data
        }).then((res) => {
            console.log(res.data.userPic);
            if (res.data.errors) {
                errorType.innerHTML = res.data.errors.type
                errorSize.innerHTML = res.data.errors.size
            }
        }).catch((err) => console.log(err));
    }

    const resetPicHandle = () => {
        setEditing(false)
        setSrc("./cdn/content/default-user-pics.png");
        setFile("reset");
        dispatch(resetProfilImage(user._id));
        
    }

    useEffect(() => {
        if (!isEmpty(sheetsData)) {
            setIsLoading(false);
        }
    }, [sheetsData]);

    return (
        <div className='profil-container app-container'>
            
            <div className="profil-content profil">
                <div className="buttons">
                    <p className="button" onClick={() => setEditing(!editing)}><i className="fas fa-edit"></i></p>
                    {/* {editing && (<p className="button" onClick={saveHandle}><i className="far fa-save"></i></p>)} */}
                </div>
                {editing ? (
                    <div className="head">
                        <div className="img-container">
                            <img src={src} alt="PP" />
                        </div>
                        <input type="file" name="userpic" id="userpic" accept='.jpg, .jpeg, .png' onChange={(e) => handleFile(e)} />
                        
                        <p id="errorType" className='errors'></p>
                        <p id="errorSize" className='errors'></p>
                        <input type="text" name="username" id="username" defaultValue={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                        <button className='button error' onClick={resetPicHandle}>Supprimer l'avatar</button>
                        <button className="button" onClick={saveHandle}>Sauvegarder</button>
                    </div>
                ) : (
                    <div className="head">
                        <div className="img-container">
                            <img src={src} alt="PP" />
                        </div>
                        <p className='username'>{displayName}</p>
                        <p className="icons">{user.certified && (<i className="fa-solid fa-circle-check icon" data-tip="Certifié"></i>)} {user.permissions.DASHBOARD && (<i className="fa-solid fa-desktop icon" data-tip="Staff"></i>)}</p>
                        <ReactTooltip effect='solid' />
                    </div>
                )}
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
        </div>
    );
}
