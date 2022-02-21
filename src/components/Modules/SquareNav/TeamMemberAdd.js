import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../Utils';
import ProfilModule from '../ProfilModule';

export default function TeamMemberAdd({ sheet }) {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const usersData = useSelector(state => state.usersReducer);

    useEffect(() => {
      if (!isEmpty(usersData)) {
        setIsLoading(false);
      }
    }, [usersData])  

    return (
        <div className='usersPop'>

            <input type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} />

                {!isLoading ? (
                    <>
                        {usersData.map((user) => {
                            if (user.username.includes(search)) {
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
