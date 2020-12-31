import React from 'react'

const ListGroup = props => {
  const {
    items,
    selectedItem,
    textProperty,
    valueProperty,
    onItemSelect,
  } = props
  return (
    <ul className="list-group">
      {items.map((item, index) => {
        return (
          <li
            className={
              item === selectedItem
                ? 'list-group-item active'
                : 'list-group-item'
            }
            key={index}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        )
      })}
    </ul>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
}
export default ListGroup
