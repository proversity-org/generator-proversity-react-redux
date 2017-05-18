
'use strict';

import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import { getUser } from 'helpers/Session'

import brandSvg from 'static/images/brand.svg'

require('static/scss/navbar.scss')

const NavBar = ({ activeKey }) => {
  let exampleClass = classNames({
    'active': activeKey == 'example'
  })

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="navbar-brand">
            <Link to="/">
              <img src={brandSvg} />
            </Link>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="nav navbar-nav">
            <li className={exampleClass}>
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-cog fg-lg" aria-hidden="true"></i> Example</a>
            </li>
            <li className="hidden-sm hidden-md hidden-lg"><Link to="/logout"><i className="fa fa-sign-out fg-lg" aria-hidden="true"></i> Logout</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right hidden-xs">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{getUser().username} <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/logout"><i className="fa fa-sign-out fg-lg" aria-hidden="true"></i> Logout</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
