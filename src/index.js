import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import GridContainer from './containers/GridContainer'
import style from './stylesheets/styles.scss'
import reducer from './reducers'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <GridContainer />
  </Provider>,
  rootEl
)
