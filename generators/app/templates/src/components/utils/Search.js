
'use strict'

import React from 'react'

const SearchBar = ({ placeholder, search, onSearchTerm, searchStatus, focus, blur }) => {
  return (
    <div className="row">
      <div className="search">
        <i className={searchStatus === true ? "fa fa-search faa-pulse animated" : "fa fa-search" } aria-hidden="true"></i>
        <input type="text" className="search-input" placeholder={placeholder} onChange={(e) => onSearchTerm(e)} value={search} />
        <a href="#" className={search-input === "" ? "hidden" : null } onClick={(e) => clear(e)}>&times;</a>
      </div>
    </div>
  )
}

export default SearchBar