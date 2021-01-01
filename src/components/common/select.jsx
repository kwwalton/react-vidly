import React from 'react'

const Select = ({ name, label, error, onChange, options, selectedItem, ...rest }) => {
  console.log('sel item:', selectedItem)
    return (
    <div className="form-group">
      <label htmlFor={name} className="d-block">{label}</label>
      <select
        id={name}
        name={name}
        className="form-select"
        aria-label="Default select example"
        onChange={onChange}
        value={selectedItem}
      >
        <option value="">Select a {name}</option>
        {options.map((item, index) => (
          <option value={item["name"]} key={index}>
            {item["name"]}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}

export default Select
