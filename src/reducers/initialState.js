
const initialState = {
  generation: 0,
  gridWidth: 40,
  gridHeight: 20,
  cellWidth: 5
}

/* cells = [{
  id, index, x, y, row, col, live, liveNeighbors, neighbors
}] */

let { gridWidth, gridHeight, cellWidth } = initialState

// find index of clickedCellId based on id "[row index]-[col index]" and gridWidth
const getNeighborIndices = (row, col, cellIndex, gridWidth, gridHeight) => {

  let topLeft, topCenter, topRight,
  left, right,
  bottomLeft, bottomCenter, bottomRight

  // default
  topLeft = cellIndex - gridWidth - 1
  topCenter = cellIndex - gridWidth
  topRight = cellIndex - gridWidth + 1
  left = cellIndex - 1
  right = cellIndex + 1
  bottomLeft = cellIndex + gridWidth - 1
  bottomCenter = cellIndex + gridWidth
  bottomRight = cellIndex + gridWidth + 1

  // special cases
  if (row === 0) { // top row, assign top neighbors to bottom row
    topLeft = cellIndex + (gridWidth * (gridHeight - 1) - 1)
    topCenter = cellIndex + gridWidth * (gridHeight - 1)
    topRight = cellIndex + 1 + (gridWidth * (gridHeight - 1))
  }
  if (col === gridWidth - 1) { // right edge
    topRight = cellIndex - (gridWidth * 2) + 1;
    right = cellIndex - gridWidth + 1
    bottomRight = cellIndex + 1
  }
  if (row === gridHeight - 1) { // bottom row
    bottomLeft = cellIndex - (gridWidth * (gridHeight - 1)) - 1
    bottomCenter = cellIndex - (gridWidth * (gridHeight - 1))
    bottomRight = cellIndex - (gridWidth * (gridHeight - 1)) + 1
  }
  if (col === 0) { // left edge
    topLeft = cellIndex - 1
    left = cellIndex + gridWidth - 1
    bottomLeft = cellIndex + (gridWidth * 2) - 1
  }
  // corners cells must assign their respective outer neighbor to opposite corner
  // (i.e. top left (cellIndex 0) cell has to handle topLeft neighbor)
  if (cellIndex === 0) { // top-left corner
    topLeft = gridWidth * gridHeight - 1
  }
  if (cellIndex === gridWidth - 1) {
    topRight = gridWidth * (gridHeight - 1)
  }
  if (cellIndex === gridWidth * gridHeight - 1) {
    bottomRight = 0
  }
  if (cellIndex === gridWidth * (gridHeight - 1)) {
    bottomLeft = gridWidth - 1
  }

  let neighborIndices = [
    topLeft, topCenter, topRight,
    left, right,
    bottomLeft, bottomCenter, bottomRight
  ]

  return neighborIndices
}

const buildCellsArr = (gridWidth, gridHeight, cellWidth) => {
  let cellsArr = [];
  let index = 0;
  for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
    let y = rowIndex * cellWidth;
    for (let colIndex = 0; colIndex < gridWidth; colIndex++) {
      let x = colIndex * cellWidth;
      let id = rowIndex+'-'+colIndex;
      let row = rowIndex
      let col = colIndex
      let live = false
      let liveNeighbors = 0
      let neighbors = getNeighborIndices(row, col, index, gridWidth, gridHeight)
      cellsArr.push({id, index, x, y, live, liveNeighbors, neighbors})
      index ++
    }
  }
  return cellsArr
}

initialState.cells = buildCellsArr(gridWidth, gridHeight, cellWidth)

export default initialState
