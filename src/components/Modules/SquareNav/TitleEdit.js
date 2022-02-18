import axios from 'axios'
import React, { useState } from 'react'

export default function TitleEdit({sheet}) {

    const [title, setTitle] = useState(sheet.title)

    const saved = document.getElementById('save')

    const saveHandle = () => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheet._id}`,
            withCredentials: true,
            data: {
                title
            }
        }).then((res) => {
            saved.innerHTML = "Titre mis a jour !"
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
    <div className='titlePop'>
        <p id="save"></p>
        <div className="field">
            <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div className="field">
            <button onClick={saveHandle}>Sauvegarder</button>
        </div>
        
    </div>
  )
}
