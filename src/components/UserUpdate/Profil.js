import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../Modules/Loading';
import { isEmpty } from '../Utils';
import ProfilEditor from './ProfilEditor';
import ProfilViewer from './ProfilViewer';
import { UIdContext } from '../App.context';

export default function Profil() {

    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const UId = useContext(UIdContext);

    const usersData = useSelector(state => state.usersReducer);

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
                            if (user._id === UId) {
                                return <ProfilEditor user={user} />
                            } else {
                                return <ProfilViewer user={user} />
                            }
                        }
                        return null
                    })}
                </>
            )}
        </>
    );
}
