
'use strict';

import React, { PropTypes, Component } from 'react'

class Modal extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal fade"
           id={this.props.modalId}
           tabIndex="-1"
           role="dialog"
           aria-labelledby={`${this.props.modalId}Label`}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 className="modal-title" id="exampleModalLabel">{this.props.modalTitle}</h3>
            </div>
            <div className="modal-body">
              {this.props.modalBody}
              {this.props.modalFields.length > 0 &&
                <form>
                  {this.props.modalFields.map((field, i) =>
                    <div key={i}>{field}</div>
                  )}
                </form>
              }
            </div>
            <div className="modal-footer">
              <div>{this.props.modalButtons}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  modalId: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalFields: PropTypes.array.isRequired,
  modalButtons: PropTypes.object.isRequired
}

export default Modal