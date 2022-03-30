import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import Quizz from '../Home/HomeScreen/Quizz';
import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@mui/material';


export default function ProfilEditor({ user }) {

    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    const [displayName, setDisplayName] = useState(user.displayName ? user.displayName : user.username);
    const [file, setFile] = useState();

    const sheetsData = useSelector(state => state.sheetsReducer);
    const quizzData = useSelector(state => state.quizzReducer);

    const errorType = document.getElementById('errorType');
    const errorSize = document.getElementById('errorSize');

    const [src, setSrc] = useState(user.userPic.imageUrl);
    const [scale, setScale] = useState(user.userPic.scale);
    const [pos, setPos] = useState({
        x:user.userPic.x, 
        y:user.userPic.y,
        cX: user.userPic.cX,
        cY: user.userPic.cY,
    });

    const imgRef = useRef();

    const changeHandle = (e) => {
        
        setPos({
            x: imgRef.current.calculatePosition().x,
            y: imgRef.current.calculatePosition().y,
            cX: e.x,
            cY: e.y,
        });
    }

    const zoomHandle = (e) => {
        
        setPos({
            x: imgRef.current.calculatePosition().x,
            y: imgRef.current.calculatePosition().y,
            cX: pos.cX,
            cY: pos.cY,
        });
        setScale(e.target.value)
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0]));
        console.log(file)
    }

    const saveHandle = (e) => {
        
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
                    handlePic(pos, scale)
                }
                setEditing(false);
                return;     
            }).catch((err) => console.log(err)); 
        }

        handlePic(pos, scale);
    }

    const handlePic = (pos) => {
        const data = new FormData();
        data.append('username', user.username);
        data.append('userId', user._id);
        data.append('file', file);
        data.append('posX', pos.x);
        data.append('posY', pos.y);
        data.append('posCX', pos.cX);
        data.append('posCY', pos.cY);
        data.append('scale', scale);

        axios({
            method: 'POST',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/uplaod/picture`,
            data: data
        }).then((res) => {
            console.log(res.data.userPic);
            if (res.data.errors) {
                errorType.innerHTML = res.data.errors.type
                errorSize.innerHTML = res.data.errors.size
            }
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        if (!isEmpty(sheetsData)) {
            setIsLoading(false);
        }
    }, [sheetsData]);

    return (
        <div className='profil-container'>
            
            <div className="profil-content profil">
                <div className="buttons">
                    <p className="button" onClick={() => setEditing(!editing)}><i className="fas fa-edit"></i></p>
                    {editing && ( <p className="button" onClick={saveHandle}><i className="far fa-save"></i></p>)}
                </div>
                {editing ? (
                    <div className="head">
                        <AvatarEditor width={180} height={180} image={src} scale={scale} border={0} borderRadius={20} ref={imgRef} position={{x: pos.cX, y:pos.cY}} onPositionChange={(e) => changeHandle(e)}  />
                        <Slider defaultValue={scale} step={1} min={1} max={10} onChange={(e) => zoomHandle(e)} />
                        {/* <img src={src} id="test" alt="PP"/> */}
                        <input type="file" name="userpic" id="userpic" accept='.jpg, .jpeg, .png' onChange={(e) => handleFile(e)} />
                        <p id="errorType" className='errors'></p>
                        <p id="errorSize" className='errors'></p>
                        <input type="text" name="username" id="username" defaultValue={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                    </div>
                ) : (
                    <div className="head">
                        <div className="img-container">
                            <img src={src} alt="PP" style={
                                {
                                    objectPosition:`${pos.x / scale}px ${pos.y / scale}px`, 
                                    transform: `scale(${scale})`,
                                    translate: `${(scale - 1)*50}% ${(scale - 1)*50}%`
                                }
                            }/>
                        </div>
                        <p className='username'>{displayName}</p>
                        <p className="icons">{user.certified && (<i className="fa-solid fa-circle-check icon" data-tip="Certifié"></i>)} {user.permissions.DASHBOARD && (<i className="fa-solid fa-desktop icon" data-tip="Staff"></i>)}</p>
                        <ReactTooltip effect='solid' />
                    </div>
                )}
            </div>

            <div className="profil-content sheets">
                <div className="sheets">
                    <h1 className='title'>Fiches de l'utilisateur</h1>
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
                </div>

                <div className="quizz">
                    <h1 className='title'>Quizz de l'utilisateur</h1>
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
                </div>
            </div>

        </div>
    );
}