
'use strict';

import React, { Component } from 'react'
import { Link } from 'react-router'
import { getUser } from 'helpers/Session'

import brandSvg from 'static/images/brand.svg'

require('static/scss/navbar.scss')

const NavBar = ({ location }) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand"><img src={brandSvg} /></Link>
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu-collapse">
          <ul className="nav navbar-nav navbar-right">
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
