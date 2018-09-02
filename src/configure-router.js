// Configure history and middleware for connected router
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export const history = createHistory()

export const routerHistoryMiddleware = routerMiddleware(history)
