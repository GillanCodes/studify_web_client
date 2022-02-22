import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { teamMemberRemove } from '../../../action/sheets.action';
import { isEmpty } from '../../Utils';
import ProfilModule from '../ProfilModule';

export default function TeamMemberRemove({ sheet }) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const usersData = useSelector(state => state.usersReducer);

    const removeMemberHandle = (e, user) => {
        e.preventDefault();
        dispatch(teamMemberRemove(user._id, sheet._id))


    }

    useEffect(() => {
      if (!isEmpty(usersData)) {
        setIsLoading(false);
      }
    }, [usersData])  

    return (
        <div className='searchPop'>
             <div className="searchContent">
                <input type="text" name="" id="" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                {!isLoading ? (
                    <div className='searchContainer'>
                            <div className='search-options'>
                                <table>
                                    <tr>
                                        <th>Action</th>
                                        <th>User</th>
                                    </tr>
                                    {usersData.map((user) => {
                                            if (search.length !== 0) {
                                                if (user.username.includes(search) && sheet.team.includes(user._id)) {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td><input type="submit" value="REMOVE" onClick={(e) => removeMemberHandle (e, user)} /></td>
                                                            <td><ProfilModule user={user} /></td>
                                                        </tr>
                                                    )
                                                }
                                                return null
                                            }
                                            if (sheet.team.includes(user._id)) {
                                                return (
                                                    <tr>
                                                        <td><input type="submit" value="REMOVE" onClick={(e) => removeMemberHandle (e, user)} /></td>
                                                        <td><ProfilModule user={user} key={user._id} />    </td>
                                                    </tr>
                                                )
                                            }
                                            return null
                                    })}
                                </table>
                            </div>
                    </div>
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </div>
    )
}
