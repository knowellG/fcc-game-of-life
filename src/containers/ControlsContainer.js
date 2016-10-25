import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { incrementGeneration, startGame, stopGame, resetGame } from '../actions/actions'

class ControlsContainer extends Component {
  render(){
    let { generation, incrementGeneration, startGame, stopGame, resetGame } = this.props
    return (
      <div className = "controls">
        <button onClick={()=>incrementGeneration(generation)}>
          + Generation
        </button>
        <div>Generation: {generation} </div>
        <button onClick={()=>startGame()}>
          START
        </button>
        <button onClick={()=>stopGame()}>
          STOP
        </button>
        <button onClick={()=>resetGame()}>
          CLEAR
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { generation, isOn } = state
  return {
    generation, isOn
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({startGame, stopGame, resetGame, incrementGeneration}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer)
