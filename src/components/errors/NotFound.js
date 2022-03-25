import React from 'react'

export default function NotFound({customMessage}) {
  return (
    <div>
      <h1>404</h1>
      {customMessage && (<p>{customMessage}</p>)}
    </div>
  )
}
