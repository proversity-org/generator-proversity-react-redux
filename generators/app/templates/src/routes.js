'use strict'

import App from 'containers/App'
import AsyncLogin from 'containers/forms/AsyncLogin'

const routes = {
  component: App,
  path: '/',
  indexRoute: { component: AsyncLogin },
  childRoutes: [
    {
      path: '/logout',
      getComponent(location, cb) {
        System.import('containers/utils/AsyncLogout')
        .then(module => cb(null, module.default))
      }
    },
    {
      path: '/list',
      getComponent(location, cb) {
        System.import('containers/lists/AsyncList')
        .then(module => cb(null, module.default))
      }
    }
  ]
}

export default routes