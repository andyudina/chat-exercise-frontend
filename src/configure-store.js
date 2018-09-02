import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerReducer } from 'react-router-redux'
import { routerHistoryMiddleware } from './configure-router'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore (preloadedState) {
  return createStore(
    combineReducers({
      ...rootReducer,
      router: routerReducer
    }),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerHistoryMiddleware
    )
  )
}
