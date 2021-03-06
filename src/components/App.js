/* eslint-disable no-unused-vars */
import React from 'react'
// Router
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { history } from 'configure-router'

import Preloader from 'components/Preloader'
import RedirectUnauthenticated from 'containers/RedirectUnauthenticated'

import Search from 'containers/search/Search'
import ChatMenu from 'components/menu/ChatMenu'
import Welcome from 'containers/welcome/Welcome'
import SetNickname from 'containers/welcome/SetNickname'
import Chat from 'containers/chat/Chat'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const appStyle = {
  flexDirection: 'row',
  display: 'flex',
  position: 'absolute',
  alignItems: 'stretch',
  justifyContent: 'center',
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
              <Switch>
                <Route
                  exact path='/'
                  component={Welcome} />
                <Route
                  exact path='/set-nickname'
                  component={SetNickname} />
                <Route
                  path='/chat/:chatId'
                  component={Chat} />
              </Switch>
            </div>
            <Search />
          </div>
        </ConnectedRouter>
      </RedirectUnauthenticated>
    }
    {!isUserLoaded &&
      <div style={appStyle}>
        <Preloader/>
      </div>
    }
  </div>
)

export default App
