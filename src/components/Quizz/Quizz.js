import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { isEmpty } from '../Utils';
import QuizzEditor from './QuizzEditor';

export default function Quizz() {

    const {id} = useParams();
    
    const quizzData = useSelector(state => state.quizzReducer);
    
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        if (!isEmpty(quizzData)) {
            setLoading(false);
        }
    })

  return (
    <div>
        {loading ? (
            <h1>Load</h1>
        ) : (  
            <div className='quizz-editor'>
                <h1>Quizz</h1>
                
                {quizzData.map((quizz) => {
                    if (quizz._id.toString() === id.toString()) {
                        return <QuizzEditor quizz={quizz} />
                    }
                    return null
                })}
            </div>
        )}


    </div>
  )
}
