
'use strict';

export function isAuthenticated(){
  return !!getSession()['isAuthenticated'];
}

export function getToken(){
  return getSession()['token'];
}

export function getUser() {
  return getSession()['user']
}

export function getSession(){
  return JSON.parse(localStorage.getItem(SESSION_KEY) || '{}')
}

export function setSession(params){
  return localStorage.setItem(SESSION_KEY, JSON.stringify(params))
}

export function endSession(){
  return localStorage.removeItem(SESSION_KEY)
}