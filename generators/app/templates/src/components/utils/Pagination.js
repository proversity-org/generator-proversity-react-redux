
'use strict';

import React from 'react'

require('static/scss/pagination.scss')

const Pagination = ({ currentPage, perPage, total, previousPage, nextPage }) => {
  var currentPageStr = `Page ${currentPage} of ${Math.ceil(total / perPage)}`
  if (perPage >= total) {
    currentPageStr = `Page ${currentPage} of ${currentPage}`
  }
  return (
    <div>
      <ul className="pagination">
        {currentPage > 1 &&
          <li style={{ paddingRight: '5px'}}>
            <a href="#" onClick={(e) => previousPage(e)}><span className="glyphicon glyphicon-chevron-left"></span></a>
          </li>
        }
        <li>{currentPageStr}</li>
        {currentPage < Math.ceil(total / perPage) &&
          <li style={{ paddingRight: '5px'}}>
            <a href="#" onClick={(e) => nextPage(e)}><span className="glyphicon glyphicon-chevron-right"></span></a>
          </li>
        }
      </ul>
    </div>
  )
}

export default Pagination
