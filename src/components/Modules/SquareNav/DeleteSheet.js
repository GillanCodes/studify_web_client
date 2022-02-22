import axios from 'axios'
import React from 'react'

export default function DeleteSheet({sheet}) {

    const deleteHandle = () => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheet._id}`,
            withCredentials: true,
        }).then((res) => {
            window.location = "/"
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
    <div className='titlePop'>
        <div className="field">
            <h1>Etes-vous sur de vouloir supprimer cette fiche ?</h1>
        </div>
        <div className="field">
            <button onClick={deleteHandle}>Supprimer</button>
        </div>
        
    </div>
  )
}
