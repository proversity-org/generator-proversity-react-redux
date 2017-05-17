
'use strict';

import React from 'react'
import PropTypes from 'prop-types'

require('static/scss/button.scss')

const Button = ({ type, action, text, classes, dismiss, toggle, target, iconLeft, iconRight }) => {
  return (
    <button
      type={type}
      className={classes}
      onClick={action}
      data-dismiss={dismiss ? dismiss : null}
      data-toggle={toggle ? toggle : null}
      data-target={target ? target : null}>
      {iconLeft ? iconLeft : null} {text} {iconRight ? iconRight : null}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

Button.defaultProps = {
  classes: 'btn btn-default'
}

export default Button
