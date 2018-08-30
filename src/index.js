/* eslint-disable no-unused-vars */
import React from 'react'
import { Provider } from 'react-redux'

import Router from './containers/Router'
/* eslint-enable no-unused-vars */

import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import configureStore from './configure-store'
import { getCurrentUser } from './actions/user'

const store = configureStore()
store.dispatch(getCurrentUser())

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)
