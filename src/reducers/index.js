const initialState = {
  generation: 0,
  gridWidth: 40,
  gridHeight: 20,
  cellWidth: 5
}


let { gridWidth, gridHeight, cellWidth } = initialState


// find index of clickedCellId based on id "[row index]-[col index]" and gridWidth
const getNeighborIndices = (cellIndex, gridWidth, gridHeight) => {

  let topLeft,
  topCenter,
  topRight,
  left,
  right,
  bottomLeft,
  bottomCenter,
  bottomRight,
  label

  // default
  topLeft = cellIndex - gridWidth - 1
  topCenter = cellIndex - gridWidth
  topRight = cellIndex - gridWidth + 1
  left = cellIndex - 1
  right = cellIndex + 1
  bottomLeft = cellIndex + gridWidth - 1
  bottomCenter = cellIndex + gridWidth
  bottomRight = cellIndex + gridWidth + 1

  // corners and edges
  if (cellIndex === 0) { // Top Left Corner
    topLeft = gridWidth * gridHeight - 1
    topCenter = gridWidth * (gridHeight - 1)
    topRight = gridWidth * (gridHeight - 1) + 1
    left = gridWidth - 1
    bottomLeft = gridWidth * 2 - 1
  } else if (cellIndex === gridWidth - 1) { // Top Right Corner
    topLeft = cellIndex + (gridWidth * (gridHeight - 1)) - 1
    topCenter = gridWidth * (gridHeight - 1)
    topRight = (gridWidth * gridHeight) - 1
    right = cellIndex - gridWidth + 1
    bottomRight = cellIndex + 1
  } else if (cellIndex === gridWidth * gridHeight - 1) { // Bottom Right Corner
    topRight = cellIndex - (gridWidth * 2) + 1
    right = cellIndex - gridWidth + 1
    bottomRight = cellIndex - (gridWidth * gridHeight) + 1
    bottomCenter = cellIndex - (gridWidth * (gridHeight - 1))
    bottomLeft = cellIndex - (gridWidth * (gridHeight - 1)) - 1
  } else if (cellIndex === gridWidth * (gridHeight - 1)) { // Bottom Left Corner
    topLeft = cellIndex - 1
    left = cellIndex + gridWidth - 1
    bottomLeft = gridWidth - 1
    bottomCenter = 0
    bottomRight = 1
  } else if (cellIndex > 0 && cellIndex < gridWidth - 1) { // Top Row
    topLeft = cellIndex + (gridWidth * (gridHeight - 1) - 1)
    topCenter = cellIndex + gridWidth * (gridHeight - 1)
    topRight = cellIndex + 1 + (gridWidth * (gridHeight - 1))
  } else if ((cellIndex + 1) % gridWidth === 0 && // Right Edge
    cellIndex !== gridWidth - 1 && // (not top right)
    cellIndex !== gridWidth * gridHeight - 1) { // (not bottom right)
      topRight = cellIndex - (gridWidth * 2) + 1;
      right = cellIndex - gridWidth + 1
      bottomRight = cellIndex + 1
  } else if (cellIndex > gridWidth * (gridHeight - 1) && // Bottom Row (not bottom left)
    cellIndex !== gridWidth * gridHeight - 1) { //(not bottom right)
      bottomLeft = cellIndex - (gridWidth * (gridHeight - 1)) - 1
      bottomCenter = cellIndex - (gridWidth * (gridHeight - 1))
      bottomRight = cellIndex - (gridWidth * (gridHeight - 1)) + 1
  } else if (cellIndex % gridWidth === 0 && // Left Edge
    cellIndex !== 0 && // (not top left)
    cellIndex !== gridWidth * (gridWidth - 1)) { // (not bottom left)
      topLeft = cellIndex - 1
      left = cellIndex + gridWidth - 1
      bottomLeft = cellIndex + (gridWidth * 2) - 1
  }

  let neighborIndices = [
    topLeft,
    topCenter,
    topRight,
    left,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
  ]
  return neighborIndices
}



const buildInitialCellsArr = (gridWidth, gridHeight, cellWidth) => {
  let cellsArr = [];
  let index = 0;
  for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
    let y = rowIndex * cellWidth;
    for (let colIndex = 0; colIndex < gridWidth; colIndex++) {
      let x = colIndex * cellWidth;
      let id = rowIndex+'-'+colIndex;
      let live = false
      let liveNeighbors = 0
      let neighbors = getNeighborIndices(index, gridWidth, gridHeight)
      cellsArr.push({id, x, y, live, liveNeighbors, neighbors, index})
      index ++
    }
  }
  return cellsArr
}


initialState.cells = buildInitialCellsArr(gridWidth, gridHeight, cellWidth)



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

        let newLiveStatus = cell.live

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
      // console.log(index)
      // new cells array, replaces cells[index] without mutation
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
