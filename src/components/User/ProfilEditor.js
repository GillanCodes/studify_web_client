import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';


export default function ProfilEditor({ user }) {


    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    const [displayName, setDisplayName] = useState(user.displayName ? user.displayName : user.username);

    const sheetsData = useSelector(state => state.sheetsReducer);

    const saveHandle = () => {
        console.log(displayName);
    }


    useEffect(() => {
        if (!isEmpty(sheetsData)) {
            setIsLoading(false);
        }
    }, [sheetsData]);

    return (
        <div className='profil-container'>
            
            <div className="profil-content profil">
                <p className="button" onClick={() => setEditing(!editing)}><i className="fas fa-edit"></i></p>
                {editing ? (
                    <div className="head">
                        <p className="button" onClick={saveHandle}><i className="far fa-save"></i></p>
                        <img src={user.userPic} alt="PP"/>
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
