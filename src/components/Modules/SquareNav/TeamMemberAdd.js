import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { teamMemberAdded } from '../../../action/sheets.action';
import { isEmpty } from '../../Utils';
import ProfilModule from '../ProfilModule';

export default function TeamMemberAdd({ sheet }) {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const usersData = useSelector(state => state.usersReducer);

    const dispatch = useDispatch();

    const addMemberHandle = (e, user) => {
        e.preventDefault();
        dispatch(teamMemberAdded(user._id, sheet._id));
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
                        {search.length >= 3 && (
                            <div className='search-options'>
                                <table>
                                    <tr>
                                        <th>Action</th>
                                        <th>User</th>
                                    </tr>
                                    {usersData.map((user) => {
                                        if (user.username.includes(search)) {
                                            if (!sheet.team.includes(user._id)) {
                                                return (
                                                    <tr>
                                                        <td><input type="submit" value="ADD" onClick={(e) => addMemberHandle(e, user)} /></td>
                                                        <td><ProfilModule user={user} key={user._id} />    </td>
                                                    </tr>
                                                )
                                            }
                                            return null
                                        }
                                        return null
                                    })}
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </div>
    )
}
