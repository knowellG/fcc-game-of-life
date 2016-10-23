import initialState from './initialState'

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_GENERATION': {
      let { cells } = state

      // O(cells.length * neighbors.length)
      let newCellsArr = cells.map((cell, i, arr) => {
        // returns total live neighbors for this cell
        let liveNeighbors = cell.neighbors.reduce((prev, curr, j, neighbors)=> {
          return arr[neighbors[j]].live ? prev + 1 : prev
        }, 0)

        let newLiveStatus

        if (cell.live) {
          liveNeighbors < 2 ? newLiveStatus = false :
          liveNeighbors > 2 && liveNeighbors <= 3 ? newLiveStatus = true :
          liveNeighbors > 3 ? newLiveStatus = false : newLiveStatus = cell.live
        } else {
          liveNeighbors === 3 ? newLiveStatus = true : newLiveStatus = cell.live
        }

        let newCell = Object.assign({}, {...cell, live: newLiveStatus})

        return newCell
      })

      return {
        ...state,
        generation: action.payload.current + 1,
        cells: newCellsArr
      }
    }

    case 'CLICK_CELL':
      let index = action.payload.index
      let currentCellsArr = state.cells
      let clickedCell = currentCellsArr[index]

      let newCells = [
        ...currentCellsArr.slice(0, index),
        Object.assign({}, clickedCell, {live: !clickedCell.live}),
        ...currentCellsArr.slice(index + 1)
      ]

      return {
        ...state,
        cells: newCells
      }

    default:
      return state
  }
}
