import React from 'react';
import ReactTooltip from 'react-tooltip';
import { isEmpty } from '../../Utils';

export default function File({ sheet, author }) {
  return (
      <div className="file" onClick={() => window.location = `/sheet/${sheet._id}`}>

            <div className="file-head">
                <p><i className="fas fa-file-alt"></i></p>
            </div>
            <div className="file-footer">
                {sheet.tag && (
                    <>
                        {!isEmpty(sheet.tag.text) && (
                            <>
                                <p className='tag'
                                data-tip={sheet.tag.text}
                                style={
                                    {backgroundColor: sheet.tag.background_color, 
                                        color: sheet.tag.text_color}
                                    }>
                                    {sheet.tag.text}
                                </p>
                                <ReactTooltip effect='solid' place='top' />
                            </>
                        )}
                    </>
                    
                )}
                <h1 className='sheet-title'>{sheet.title}</h1>
            </div>
            

      </div>
  );
}
