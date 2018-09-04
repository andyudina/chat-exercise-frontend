// Configure history and middleware for connected router
import createHistory from 'history/createBrowserHistory'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export const history = createHistory()

export const routerHistoryMiddleware = routerMiddleware(history)

export const connectedRouter = connectRouter(history)
