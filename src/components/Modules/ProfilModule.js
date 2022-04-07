import React from 'react'

export default function ProfilModule({user}) {
  return (
    <div className='ProfilModule'>
        <img src={user.userPic.imageUrl} alt="" />
        <a href={`/${user.username}`}>{user.displayName ? user.displayName : user.username}</a>

    </div>
  )
}
