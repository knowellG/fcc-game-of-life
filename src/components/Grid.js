import React, { Component, PropTypes } from 'react'
import Cell from './Cell'
import state from '../reducers'

const Grid = (props) => {

  let { cellsArr, clickCell } = props

  return (
    <g className="grid">
      {cellsArr.map(cell => {
        return <Cell
            x={cell.x}
            y={cell.y}
            id={cell.id}
            key={cell.id}
            live={cell.live}
            index={cell.index}
            clickCell={clickCell}
          />
        }
      )}
    </g>
  )
}


Grid.propTypes = {
  cellsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickCell: PropTypes.func.isRequired
}

export default Grid
