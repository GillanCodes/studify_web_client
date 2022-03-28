import React from 'react';
import ReactTooltip from 'react-tooltip';
import { isEmpty } from '../../Utils';

export default function Quizz({ quizz, author }) {
  return (
      <div className="file" onClick={() => window.location = `/quizz/${quizz._id}`}>

            <div className="file-head">
                <p><i className="fa-solid fa-file-circle-question"></i></p>
            </div>
            <div className="file-footer">
                {quizz.tag && (
                    <>
                        {!isEmpty(quizz.tag.text) && (
                            <>
                                <p className='tag'
                                data-tip={quizz.tag.text}
                                style={
                                    {backgroundColor: quizz.tag.background_color, 
                                        color: quizz.tag.text_color}
                                    }>
                                    {quizz.tag.text}
                                </p>
                                <ReactTooltip effect='solid' place='top' />
                            </>
                        )}
                    </>
                    
                )}
                <h1 className='sheet-title'>{quizz.title}</h1>
            </div>
            

      </div>
  );
}
