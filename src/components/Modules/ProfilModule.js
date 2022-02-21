import React from 'react'

export default function ProfilModule({user}) {
  return (
    <div className='ProfilModule'>
        <img src={user.userPic} alt="" style={{height:64}} />
        <a href={`/${user.username}`}>{user.displayName ? user.displayName : user.username}</a>

    </div>
  )
}
