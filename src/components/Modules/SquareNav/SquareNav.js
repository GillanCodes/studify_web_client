import React, { useState } from 'react'

export default function SquareNav() {

  const [active, setActive] = useState(false);

  return (
    <>
      <div className={active ? "navigation active" : "navigation"} onClick={() => setActive(!active)}>
        <span className="one" ><i className="fa-solid fa-user-plus"></i></span>
        <span className='two'><i class="fa-solid fa-users"></i></span>
        <span className='three'><i className="fa-solid fa-heading"></i></span>
        <span className='four'><i className="fa-solid fa-minus"></i></span>
        <span className='five'><i className="fa-solid fa-ban"></i></span>
        <span className='six'><i className="fa-solid fa-tag"></i></span>
        <span className='seven'><i className="fa-solid fa-user-minus"></i></span>
        <span className='eight'><i className="fa-solid fa-minus"></i></span>
        <span className='nine'><i className="fa-solid fa-minus"></i></span>
      </div>   
    </>
  )
}
