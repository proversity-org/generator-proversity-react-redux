
'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { asyncComponent } from 'react-async-component'

import Login from 'components/forms/Login'
import { authenticate } from 'actions/auth'
import { getToken, setSession } from 'helpers/Session'

class AsyncLogin extends Component {
  constructor(props) {
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmitLogin = this.onSubmitLogin.bind(this)
    this.closeMessage = this.closeMessage.bind(this)

    this.state = {
      username: '',
      password: '',
      showMessage: false,
      messageText: '',
      messageType: 'error'
    }
  }

  componentDidMount() {
    if (getToken()) {
      this.props.dispatch.push({pathname: '/list'})
    }
  }

  onChangeUsername(username) {
    this.setState((state, props) => {
      return {
        username: username
      }
    })
  }

  onChangePassword(password) {
    this.setState((state, props) => {
      return {
        password: password
      }
    })
  }

  onSubmitLogin(e) {
    e.preventDefault()
    setSession({
      isAuthenticated: true,
      token: 'token',
      user: {
        username: 'admin'
      }
    })
    this.props.dispatch(push({pathname: '/list'}))
    // if (this.state.username.length > 0 && this.state.password.length > 0) {
    //   this.props.dispatch(authenticate(this.state.username, this.state.password))
    //   .then((response) => {
    //     if (response.token) {
    //       setSession({
    //         isAuthenticated: true,
    //         token: response.token
    //       })

    //       this.props.dispatch(push({pathname: '/list'}))
    //     } else {
    //       this.setState((state, props) => {
    //         return {
    //           showMessage: true,
    //           messageText: 'Username and/or password incorrect'
    //         }
    //       })
    //     }
    //   })
    // }
  }

  closeMessage(e) {
    e.preventDefault()
    this.setState((state, props) => {
      return {
        showMessage: false,
        messageText: ''
      }
    })
  }

  render() {
    const { isAuthenticating } = this.props
    const RefreshIcon = asyncComponent({
      resolve: () => System.import('components/utils/RefreshIcon')
    })

    return (
      <div>
        {(()=>{
          if (isAuthenticating) {
            return (
              <RefreshIcon message={'Authenticating ...'}/>
            )
          } else {
            return (
              <Login
                username={this.state.username}
                password={this.state.password}
                showMessage={this.state.showMessage}
                messageText={this.state.messageText}
                messageType={this.state.messageType}
                onChangeUsername={this.onChangeUsername}
                onChangePassword={this.onChangePassword}
                onSubmitLogin={this.onSubmitLogin}
                closeMessage={this.closeMessage}
              />
            )
          }
        })()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication } = state.rootReducer
  const isAuthenticating = authentication.isAuthenticating
  return {
    isAuthenticating: isAuthenticating
  }
}

export default connect(mapStateToProps)(AsyncLogin)
