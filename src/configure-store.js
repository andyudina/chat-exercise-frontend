import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerHistoryMiddleware, connectedRouter } from 'configure-router'
import rootReducer from 'reducers'

const loggerMiddleware = createLogger()

export default function configureStore (preloadedState) {
  return createStore(
    connectedRouter(rootReducer),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerHistoryMiddleware
    )
  )
}
