import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../components/Grid'

import { incrementGeneration, clickCell, randomizeStart } from '../actions/actions'

class GridContainer extends Component {

  componentDidMount() {
    // this.firstRender = true;
    // if (this.firstRender) {
      this.props.randomizeStart()
    // }
  }

  componentDidUpdate() {
    this.firstRender = false;
  }

  render() {
    let { gridWidth,
      gridHeight,
      cellHeight,
      cells,
      generation,
      incrementGeneration,
      clickCell
    } = this.props

    return (
      <svg className="grid-container"
        viewBox={'0 0 '+gridWidth*5+' '+gridHeight*5}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Grid cellsArr={cells} clickCell={clickCell} />
      </svg>
    )
  }
}

const mapStateToProps = (state) => {
  let { generation, gridWidth, gridHeight, cellHeight, cells } = state
  return {
    generation, gridWidth, gridHeight, cells
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({incrementGeneration, clickCell, randomizeStart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer)
