
'use strict';

import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import Button from 'components/utils/Button'
import Message from 'components/utils/Message'
import classNames from 'classnames'

import brandSvg from 'static/images/brand.svg'

require('static/scss/login.css')

const Login = ({
  username, password, showMessage, messageType, messageText,
  onChangeUsername, onChangePassword, onSubmitLogin, closeMessage
}) => {
  return (
    <form onSubmit={(e) => onSubmitLogin(e)}>
      <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 login">
        {showMessage &&
          <Message
            type={messageType}
            text={messageText}
            close={closeMessage}
          />
        }

        <img src={brandSvg} className="brand" />

        <label htmlFor="inputUsername">Username or email:</label>  
        <input
          type="text"
          placeholder=""
          id="inputUsername"
          value={username}
          onChange={(e) => onChangeUsername(e.target.value)}
        />

        <label htmlFor="inputPassword">Password:</label>
        <input
          type="password"
          placeholder=""
          id="inputPassword"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />

        <Button
          type={'submit'}
          text={'Log In'}
        />
      </div>
    </form>
  )
}

export default Login
