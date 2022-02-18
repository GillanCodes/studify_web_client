import React from 'react';
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
                            <p className='tag' 
                            style={
                                {backgroundColor: sheet.tag.background_color, 
                                    color: sheet.tag.text_color}
                                }>
                                {sheet.tag.text}
                            </p>
                        )}
                    </>
                    
                )}
                <h1 className='sheet-title'>{sheet.title}</h1>
            </div>
            

      </div>
  );
}
