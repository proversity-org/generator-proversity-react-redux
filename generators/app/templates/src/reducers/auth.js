
'use strict';

import {
  REQUEST_SIGNIN, RECEIVE_SIGNIN,
  REQUEST_SIGNOUT, RECEIVE_SIGNOUT,
  REQUEST_RECOVER_PASSWORD, RECEIVE_RECOVER_PASSWORD
} from 'actions/auth'

export function authentication(state = {
  isAuthenticating: false,
  isLogingOut: false,
  isRecoveringPassword: false
}, action) {
  switch(action.type) {
    case REQUEST_SIGNIN:
      return Object.assign({}, state, {
        isAuthenticating: true
      })
    case RECEIVE_SIGNIN:
      return Object.assign({}, state, {
        isAuthenticating: false
      })
    case REQUEST_SIGNOUT:
      return Object.assign({}, state, {
        isLogingOut: true
      })
    case RECEIVE_SIGNOUT:
      return Object.assign({}, state, {
        isLogingOut: false
      })
    case REQUEST_RECOVER_PASSWORD:
      return Object.assign({}, state, {
        isRecoveringPassword: true
      })
    case RECEIVE_RECOVER_PASSWORD:
      return Object.assign({}, state, {
        isRecoveringPassword: false
      })
    default:
      return state
  }
}
