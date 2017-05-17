
'use strict';

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated } from 'helpers/Session'
import NavBar from 'components/NavBar'

class AsyncNavBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavBar location={this.props.location} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated()
  }
}

export default connect(mapStateToProps)(AsyncNavBar)