
'use strict';

import React from 'react'

const RefreshIcon = ({ message }) => {
  return (
    <div style={{
      position: 'fixed',
      transform: 'translate(-50%, -50%)',
      left: '50%',
      top: '50%',
      textAlign: 'center'
    }}>
      <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
      <h4 style={{paddingTop: '10px'}}>{message}</h4>
    </div>
  )
}

export default RefreshIcon