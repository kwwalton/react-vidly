import React from 'react'

const Search = ({ value, onChange }) => {
  return (
    <input
      className="form-control me-2 mb-3"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
