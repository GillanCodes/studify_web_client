import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';
import axios from 'axios';


export default function ProfilEditor({ user }) {

    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    const [displayName, setDisplayName] = useState(user.displayName ? user.displayName : user.username);
    const [file, setFile] = useState();

    const sheetsData = useSelector(state => state.sheetsReducer);

    const saveHandle = (e) => {    
        
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
                return
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
                        <input type="text" name="username" id="username" defaultValue={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                    </div>
                ) : (
                    <div className="head">
                        <img src={user.userPic} alt="PP"/>
                        <h3 className='username'>{displayName}</h3>
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
