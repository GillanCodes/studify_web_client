import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';


export default function ProfilEditor({ user }) {

    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    const [displayName, setDisplayName] = useState(user.displayName ? user.displayName : user.username);
    const [file, setFile] = useState();

    const sheetsData = useSelector(state => state.sheetsReducer);

    const errorType = document.getElementById('errorType');
    const errorSize = document.getElementById('errorSize');


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
                    handlePic()
                }
                setEditing(false);
                return;     
            }).catch((err) => console.log(err)); 
        }

        if (file && displayName === user.displayName) {
            handlePic();
        }
    }

    const handlePic = () => {
        const data = new FormData();
        data.append('username', user.username);
        data.append('userId', user._id);
        data.append('file', file);

        axios({
            method: 'POST',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/uplaod/picture`,
            data: data
        }).then((res) => {
            console.log(res.data);
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
                        <img src={user.userPic} alt="PP"/>
                        <input type="file" name="userpic" id="userpic" accept='.jpg, .jpeg, .png' onChange={(e) => setFile(e.target.files[0])} />
                        <p id="errorType" className='errors'></p>
                        <p id="errorSize" className='errors'></p>
                        <input type="text" name="username" id="username" defaultValue={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                    </div>
                ) : (
                    <div className="head">
                        <img src={user.userPic} alt="PP"/>
                        <h1 className='username'>{displayName}</h1>
                        <p className="icons">{user.certified && (<i className="fa-solid fa-circle-check icon" data-tip="Certifié"></i>)} {user.permissions.DASHBOARD && (<i className="fa-solid fa-desktop icon" data-tip="Staff"></i>)}</p>
                        <ReactTooltip effect='solid' />
                    </div>
                )}
            </div>

            <div className="profil-content sheets">
                <h1 className='title'>Fiches de l'utilisateur</h1>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className='sheets-container'>
                        {sheetsData.map((sheet) => {
                            if (sheet.author === user._id) {
                                return <File sheet={sheet} key={sheet._id} />
                            }
                            return null
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
