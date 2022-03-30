import React from 'react';
import ReactTooltip from 'react-tooltip';

export default function Quizz({ quizz, author }) {
  return (
      <div className="file" onClick={() => window.location = `/quizz/${quizz._id}`}>

            <div className="file-head">
                <p><i className="fa-solid fa-file-circle-question"></i></p>
            </div>
            <div className="file-footer">
                {quizz.level && (
                    <>                           
                        <p className='tag level' data-tip={quizz.level}>
                            {quizz.level}
                        </p>
                        <ReactTooltip effect='solid' place='top' />
                    </>
                    
                )}
                <h1 className='sheet-title'>{quizz.title}</h1>
            </div>
            

      </div>
  );
}
