
'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { endSession } from 'helpers/Session'
import { logout } from 'actions/auth'

class AsyncLogout extends Component {

  componentDidMount() {
    this.props.dispatch(logout())
    endSession()
    this.props.dispatch(replace('/'))
  }

  render() {
    return null;
  }

}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(AsyncLogout)
