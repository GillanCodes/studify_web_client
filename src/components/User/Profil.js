import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../Modules/Loading';
import { isEmpty } from '../Utils';
import ProfilEditor from './ProfilEditor';
import ProfilViewer from './ProfilViewer';

export default function Profil() {

    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [logged, setLogged] = useState(false);

    const usersData = useSelector(state => state.usersReducer);
    const userData = useSelector(state => state.userReducer);

    useEffect(() => {
      if (!isEmpty(userData)) {
        setLogged(true);
        //TODO : add permissions
      }
    }, [userData]);

    useEffect(() => {
        if(!isEmpty(usersData)) {
            setIsLoading(false);
        }
    }, [usersData])
    
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {usersData.map((user) => {
                        if (user.username === username) {
                            return (logged ? (
                                <ProfilEditor user={user} />
                            ) : (
                                <ProfilViewer user={user} />
                            ))
                        }
                    })}
                </>
            )}
        </>
    );
}
