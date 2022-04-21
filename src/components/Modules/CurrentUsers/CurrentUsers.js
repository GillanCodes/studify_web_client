import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip';
import { isEmpty } from '../../Utils'
import Loading from '../Loading';

export default function CurrentUsers({currentUsers}) {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if(!isEmpty(currentUsers)) {
          setIsLoading(false);
      }
    }, [currentUsers])
    

  return (
    <div className='current not-mobile'>
        {isLoading ? (
            <Loading />
        ) : (
            <>
                {currentUsers.reverse().map((user) => {
                    return (
                        <>
                            <a href={`./${user.username}`}>
                                <div className="img-display" data-tip={`${user.username} ${user.admin ? " - Admin" : ''}`}>
                                    <img src={user.userPic.imageUrl} alt={user.username} data-tip={`${user.username} ${user.admin ? " - Admin" : ''}`} />
                                </div>
                            </a>
                            <ReactTooltip effect='solid' />
                        </>
                    )
                })}
            </>                 
        )}
    </div>
  )
}
