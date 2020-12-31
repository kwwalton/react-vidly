import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

// destructered props example instead of passing in props and then destructing after
const Table = ({ columns, sortColumn, onSort, data }) => {

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  )
}

export default Table
