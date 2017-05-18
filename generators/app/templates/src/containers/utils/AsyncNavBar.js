
'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated } from 'helpers/Session'
import NavBar from 'components/utils/NavBar'

class AsyncNavBar extends Component {

  constructor(props) {
    super(props);

    this.onClickItem = this.onClickItem.bind(this)
    this.setActiveKey = this.setActiveKey.bind(this)

    this.state = {
      activeKey: this.setActiveKey()
    }
  }

  onClickItem(e, value) {
    e.preventDefault()
  }

  setActiveKey() {
    const pathname = this.props.location.pathname
    return 'example'
  }

  render() {
    return (
      <NavBar activeKey={this.state.activeKey} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated()
  }
}

export default connect(mapStateToProps)(AsyncNavBar)