import React, { Component, PropTypes } from 'react'

const Cell = (props) => {
  let { id, x, y, index, live, clickCell } = props
  let className = ''
  live ? className = 'cell live' : className = 'cell'

  return (
    <rect
      id = {id}
      className = {className}
      x = {x}
      y = {y}
      onClick = {()=>clickCell(index)}
    />
  )
}

Cell.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  live: PropTypes.bool.isRequired
}

export default Cell
