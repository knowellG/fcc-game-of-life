import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import style from './stylesheets/styles.scss'
import reducer from './reducers'

import GridContainer from './containers/GridContainer'
import ControlsContainer from './containers/ControlsContainer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <div>
      <GridContainer />
      <ControlsContainer />
    </div>
  </Provider>,
  rootEl
)
