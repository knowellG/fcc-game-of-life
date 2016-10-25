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

    case 'START':
      return {
        ...state,
        isOn: true
      }

    case 'STOP':
      return {
        ...state,
        isOn: false
      }

    case 'RESET':
      return initialState

    case 'RANDOMIZE':
      // get a random number of cells between 0 and cellsArr.length
      let cellsArr = state.cells
      let randomNumCells = getRandomInt(0, cellsArr.length);

      let randomIndices = []
      for (let i = 0; i < randomNumCells; i++) {
        // get a random index between 0 and cellsArr.length
        let randomIndex = getRandomInt(0, cellsArr.length)
        if (randomIndices.indexOf(randomIndex) === -1) {
          randomIndices.push(randomIndex)
        }
      }

      let randomCellsArr = cellsArr.map((cell, i, arr) => {
        if (randomIndices.indexOf(i) !== -1) {
          return {
            ...cell, live: true
          }
        }
        return {...cell}
      })

      return {
        ...state,
        cells: randomCellsArr
      }

    default:
      return state
  }
}








const randomizeLive = (cellsArr) => {
  console.log('shouldnt see this')
  // get a random number of cells between 0 and cellsArr.length
  let randomNumCells = getRandomInt(0, cellsArr.length);

  let randomIndices = []
  for (let i = 0; i < randomNumCells; i++) {
    // get a random index between 0 and cellsArr.length
    let randomIndex = getRandomInt(0, cellsArr.length)
    if (randomIndices.indexOf(randomIndex) === -1) {
      randomIndices.push(randomIndex)
    }
  }
  // make randomCells[i].live = true
  let randomize = randomIndices.map(i => {
    cellsArr[i].live = true
  })

  return cellsArr
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
