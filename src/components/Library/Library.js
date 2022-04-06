import React from 'react'

export default function Library() {


  return (
    <div className='library-container app-container'>

        <h1 className='is-spaced'>La Bibliotheque !</h1>

            <div className="library-content">
                <div className="sheets">
                    <h2 className='is-spaced'>Les Fiches</h2>
                    
                    <div className="file" onClick={() => window.location = `/sheets/`}>
                        <div className="file-head">
                            <p><i className="fas fa-file-alt"></i></p>
                        </div>
                        <div className="file-footer">
                            <h3 className='sheet-title'>Fiches Public</h3>
                        </div>
                    </div>

                </div>

                <div className="quizz">
                    <h2 className='is-spaced'>Les Quizz</h2>

                    <div className="file" onClick={() => window.location = `/quizz/`}>
                        <div className="file-head">
                            <p><i className="fa-solid fa-file-circle-question"></i></p>
                        </div>
                        <div className="file-footer">
                            <h3 className='sheet-title'>Quizz Public</h3>
                        </div>
                    </div>

                    <div className="file" onClick={() => window.location = `/quizz/results`}>
                        <div className="file-head">
                            <p><i className="fa-solid fa-file-circle-question"></i></p>
                        </div>
                        <div className="file-footer">
                            <h3 className='sheet-title'>Mes Résultats</h3>
                        </div>
                    </div>
                </div>
            </div>

    </div>
  )
}
