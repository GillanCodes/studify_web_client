import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Modules/Loading';
import { isEmpty } from '../Utils';
import File from './HomeScreen/File';

export default function Homescreen() {

    const [isLoading, setIsLoading] = useState(true);

    const sheetsData = useSelector(state => state.sheetsReducer);
    const userData = useSelector(state => state.userReducer);

    useEffect(() => {
      if (!isEmpty(sheetsData) && !isEmpty(userData)) {
          setIsLoading(false);
      }
    }, [isLoading, sheetsData, userData]);
    
    const newSheetHandle = () => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/sheet`,
            withCredentials: true,
            data : {
                title: 'New Sheet',
                isPublic: false
            }
        }).then((res) => {
            window.location = `/sheet/${res.data._id}`
        }).catch((err) => {
            console.log(err);
        })
    }


    return (

        <div className='homescreen-container'>
                    
                    <div className="homescreen-content">

                    <div className="file" onClick={newSheetHandle}>
                        <div className="file-head">
                            <p><i className="fas fa-file-download"></i></p>
                        </div>
                        <div className="file-footer">
                            <h1 className='sheet-title'>Créer une Fiche</h1>
                        </div>
                    </div>

                    {isLoading ? (
                        <Loading />
                    ) : (
                        // TODO : Classer les fiches auteurs et les fiches de team
                        <>
                            {sheetsData.map((sheet) => {
                                if (sheet.author === userData._id || sheet.team.includes(userData._id)) {
                                    return <File sheet={sheet} key={sheet._id}/>
                                } 
                                return null
                            })}
                        </>
                    )}
                    </div>
                </div>
    );
}
