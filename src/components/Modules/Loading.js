import React from 'react';
import ReactTooltip from 'react-tooltip';

export default function Loading() {
  return (
      <div className='loading'>
          <i className="fas fa-spinner fa-spin" data-tip="Chargement"></i>
          <ReactTooltip effect='solid' />
      </div>
  );
}
