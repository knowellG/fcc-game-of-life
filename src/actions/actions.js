
const incrementGeneration = (current) => {
  return {
    type: 'INCREMENT_GENERATION',
    payload: {
      current: current
    }
  }
}

const clickCell = (index) => {
  return {
    type: 'CLICK_CELL',
    payload: {index}
  }
}

const resetGame = () => {
  return {
    type: 'RESET'
  }
}

// thunks set and clear interval on start and stop
let interval = null
const startGame = () => {
  return (dispatch, getState) => {
    console.log('hi')
    dispatch({type: 'START'})
    if (getState().isOn, interval === null) {
      interval = setInterval(() => {
        dispatch(incrementGeneration(getState().generation))
      }, 100)
    }
    return
  }
}

const stopGame = () => {
  return (dispatch, getState) => {
    const { isOn, generation } = getState()

    if (isOn && interval !== null) {
      clearInterval(interval)
      interval = null
      dispatch({type: 'STOP'})
    }
  }
}

const randomizeStart = () => {
  return (dispatch, getState) => {
    dispatch({type: 'RANDOMIZE'})
    dispatch({type: 'START'})
    if (getState().isOn, interval === null) {
      interval = setInterval(() => {
        dispatch(incrementGeneration(getState().generation))
      }, 100)
    }
    return
  }
}

export {
  incrementGeneration,
  clickCell,
  startGame,
  stopGame,
  resetGame,
  randomizeStart
}
