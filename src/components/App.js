/* eslint-disable no-unused-vars */
import React from 'react'
// Router
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import { history } from '../configure-router'

import Preloader from './Preloader'
import RedirectUnauthenticated from '../containers/RedirectUnauthenticated'

import Search from '../containers/Search'
import ChatMenu from './ChatMenu'
import Welcome from '../containers/Welcome'
import SetNickname from '../containers/SetNickname'
import Chat from '../containers/Chat'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const appStyle = {
  flexDirection: 'row',
  display: 'flex',
  position: 'absolute',
  alignItems: 'stretch',
  bottom: 0,
  top: 0,
  right: 0,
  left: 0
}

const containerStyle = {
  position: 'relative',
  width: '100%'
}

/*

 Component

*/

const App = ({ isUserLoaded }) => (
  <div>
    {isUserLoaded &&
      <RedirectUnauthenticated>
        <ConnectedRouter history={history}>
          <div style={appStyle}>
            <ChatMenu />
            <div style={containerStyle}>
              <Route
                exact path='/'
                component={Welcome} />
              <Route
                exact path='/set-nickname'
                component={SetNickname} />
              <Route
                path='/chat/:chatId'
                component={Chat} />
            </div>
            <Search />
          </div>
        </ConnectedRouter>
      </RedirectUnauthenticated>
    }
    {!isUserLoaded && <Preloader/>}
  </div>
)

export default App
