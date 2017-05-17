
'use strict'

import React, { PropTypes, Component }  from 'react'
import { bindActionCreators }           from 'redux'
import { connect }                      from 'react-redux'
import { isAuthenticated } from 'helpers/Session'
import AsyncNavBar from 'containers/utils/AsyncNavBar'
import { AsyncComponentProvider } from 'react-async-component'

require('static/scss/general.scss')

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var showNavBar = isAuthenticated()
    return (
      <AsyncComponentProvider>
        <div>
          {showNavBar &&
            <AsyncNavBar location={this.props.location} />
          }
          <div className="container">
            <div className="row">
              {this.props.children}
            </div>
            <footer role="copyright">
              <p>&copy; 2013 - 2017 Copyright Proversity.org Ltd</p>
            </footer>
          </div>
        </div>
      </AsyncComponentProvider>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps() {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
