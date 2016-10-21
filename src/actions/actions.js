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

export {incrementGeneration, clickCell}
