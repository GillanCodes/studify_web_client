import React from 'react';

export default function File({ sheet, author }) {
  return (
      <div className="file" onClick={() => window.location = `/sheet/${sheet._id}`}>

            <div className="file-head">
                <p><i className="fas fa-file-alt"></i></p>
            </div>
            <div className="file-footer">
                <h1 className='sheet-title'><span className='tag'>{sheet.tag}</span>{sheet.title}</h1>
            </div>
            

      </div>
  );
}
