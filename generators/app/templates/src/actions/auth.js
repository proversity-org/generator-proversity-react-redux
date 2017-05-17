
'use strict';

import { endSession } from 'helpers/Session'

const REQUEST_LOGIN = 'REQUEST_LOGIN'
const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'
const REQUEST_RECOVER_PASSWORD = 'REQUEST_RECOVER_PASSWORD'
const RECEIVE_RECOVER_PASSWORD = 'RECEIVE_RECOVER_PASSWORD'

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN,
    token: json.token,
    user: json.user,
    account: json.account,
    statusCode: json.statusCode,
    messsage: json.messsage
  }
}

export function authenticate(payload) {
  return dispatch => {
    dispatch(requestLogin())
    var url = BASE_URL + '/login'
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: payload
    })
    .then(response => response.json())
    .then(json => dispatch(receiveLogin(json)))
  }
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  }
}

export function receiveLogout(json) {
  return {
    type: RECEIVE_LOGOUT,
    text: json.text,
    statusCode: json.statusCode,
    messsage: json.messsage
  }
}

export function logout() {
  return dispatch => {
    dispatch(requestLogout())
    var url = BASE_URL + 'logout'
    endSession()
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveLogout(json)))
  }
}

function requestRecoverPassword() {
  return {
    type: REQUEST_RECOVER_PASSWORD
  }
}

function receiveRecoverPassword(json) {
  return {
    type: RECEIVE_RECOVER_PASSWORD,
    user: json.user,
    statusCode: json.statusCode,
    messsage: json.messsage
  }
}

export function recoverPassword(payload) {
  return dispatch => {
    dispatch(requestRecoverPassword())
    var url = BASE_URL + 'recover-password'
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: payload
    })
    .then(response => response.json())
    .then(json => dispatch(receiveRecoverPassword(json)))
  }
}