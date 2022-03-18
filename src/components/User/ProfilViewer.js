import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';
import Report from '../Modules/Report';
import ReactTooltip from 'react-tooltip';


export default function ProfilViewer({ user }) {


    const [isLoading, setIsLoading] = useState(true);
    const sheetsData = useSelector(state => state.sheetsReducer);

    useEffect(() => {
        if (!isEmpty(sheetsData)) {
            setIsLoading(false);
        }
    }, [sheetsData]);

    return (
        <div className='profil-container'>
            
            
            {!user.ban.isBan ? (
                <>
                    <div className="profil-content profil">

                        <div className="head">
                            <img src={user.userPic} alt="PP"/>
                            <h1 className='username'>{user.displayName ? user.displayName : user.username } {user.certified && (<i className="fa-solid fa-circle-check icon" data-tip="Certifié"></i>) } {user.permissions.DASHBOARD && (<i className="fa-solid fa-desktop icon" data-tip="Staff"></i>)}</h1> 
                            <Report reported={user} type="user" />
                            <ReactTooltip effect='solid' />
                        </div>

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
                </>
                
            ) : (
                <div className="ban">
                    <h1>This user is ban !</h1>
                </div>
            )}



        </div>
    );
}
