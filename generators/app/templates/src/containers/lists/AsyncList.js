
'use strict';

import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { asyncComponent } from 'react-async-component'

import List from 'components/lists/List'

import { getToken } from 'helpers/Session'

class AsyncList extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    if (!getToken()) {
      this.props.dispatch(replace({pathname: '/'}))
    }
  }

  render() {
    const { isFetching } = this.props

    const RefreshIcon = asyncComponent({
      resolve: () => System.import('components/utils/RefreshIcon')
    })

    return (
      <div>
        {(()=>{
          if(isFetching){
            return (
              <RefreshIcon message="Loading list ..."/>
            )
          }else{
            return (
              <List />
            )
          }
        })()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(AsyncList)