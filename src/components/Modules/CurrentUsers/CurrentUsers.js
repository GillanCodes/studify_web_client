import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip';
import { isEmpty } from '../../Utils'

export default function CurrentUsers({currentUsers}) {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if(!isEmpty(currentUsers)) {
          setIsLoading(false);
      }
    }, [currentUsers])
    

  return (
    <div className='current'>
        {isLoading ? (
            <h1>Loading</h1>
        ) : (
            <>
                {currentUsers.reverse().map((user) => {
                    return (
                        <>
                            <a href={`./${user.username}`}><img src={user.userPic} alt="" data-tip={user.username} /></a>
                            <ReactTooltip effect='solid' />
                        </>
                    )
                })}
            </>                 
        )}
    </div>
  )
}
