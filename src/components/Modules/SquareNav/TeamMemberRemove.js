import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../Utils';
import ProfilModule from '../ProfilModule';

export default function TeamMemberRemove({ sheet }) {
    
    const [isLoading, setIsLoading] = useState(true);

    const usersData = useSelector(state => state.usersReducer);

    useEffect(() => {
      if (!isEmpty(usersData)) {
        setIsLoading(false);
      }
    }, [usersData])  

    return (
        <div className='usersPop'>
                {!isLoading ? (
                    <>
                        {usersData.map((user) => {
                            if (sheet.team.includes(user._id)) {
                                return <ProfilModule user={user} key={user._id} />
                            }
                            return null
                        })}
                    </>
                ) : (
                    <p>Loading</p>
                )}
        </div>
    )
}
