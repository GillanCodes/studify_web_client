import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { dateConverter, isEmpty } from '../../Utils'

export default function QuizzResults() {

  const quizzAnswersData = useSelector(state => state.quizzAnswersReducer);
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState();

  useEffect(() => {
    if (!isEmpty(quizzAnswersData)) {
      setLoading(false);
    }
  }, [quizzAnswersData])
  

  return (
    <div className='results'>
      <h1 className='title'>Mes Résultats</h1>
      {!loading ? (
        <div className="result-list">
          {quizzAnswersData.map((result) => {
            return (
              <div className="result" onClick={() => result._id === open ? setOpen() : setOpen(result._id)}>
                <div className="overview">
                  <h3>{result.quizzTitle}</h3>
                  <p>Fait le {dateConverter(result.date)}</p>
                </div>
                {open === result._id && (
                  <div className="info">
                    <div className="spacer"></div>
                    {result.answers.map((answer) => {
                      return (
                        <>
                        
                        <div className="answer">
                          <p>Question : {answer.question}</p>
                          <p>Votre réponse : {answer.uAnswer}</p>
                          <p>La vrai réponse : {answer.qAnswer}</p>
                        </div>
                        <div className="spacer"></div>
                        </>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ):(
        <h1>Loading</h1>
      )}    

    </div>
  )
}
