
'use strict';

import React from 'react'

require('static/css/message.css')

const Message = ({ type, text, close }) => {
  return (
    <div className={`message-${type}`} role="alert">
      <a href="#" className="dismiss-message" onClick={(e) => close(e)}><span>×</span></a>
      <p>
        <span className={type == 'success' ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove'}></span>&nbsp;&nbsp;{text}
      </p>
    </div>
  )
}

export default Message
