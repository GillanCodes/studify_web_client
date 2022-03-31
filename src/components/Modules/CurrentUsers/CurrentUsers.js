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
    <div className='current'>
        {isLoading ? (
            <Loading />
        ) : (
            <>
                {currentUsers.reverse().map((user) => {
                    return (
                        <>
                            <a href={`./${user.username}`}>
                                <div className="img-display" data-tip={user.username}>
                                    <img src={user.userPic.imageUrl} alt="" data-tip={user.username} />
                                    {/* <img src={user.userPic.imageUrl} alt="PP" style={
                                        {
                                            objectPosition:`${(user.userPic.x / user.userPic.scale)/(32*user.userPic.scale)}px ${(user.userPic.y / user.userPic.scale)/(32*user.userPic.scale)}px`, 
                                            transform: `scale(${user.userPic.scale})`,
                                        }
                                    }/> */}
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
