import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import { isEmpty } from '../Utils';
import Loading from '../Modules/Loading';


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
            
            <div className="profil-content profil">

                <div className="head">
                    <img src={user.userPic} alt="PP"/>
                    <h3 className='username'>{user.displayName ? user.displayName : user.username }</h3>
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



        </div>
    );
}
