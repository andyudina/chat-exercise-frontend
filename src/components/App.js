/* eslint-disable no-unused-vars */
import React from 'react'
import Preloader from './Preloader'
import RedirectUnauthenticated from '../containers/RedirectUnauthenticated'
import Search from '../containers/Search'
import Router from './Router'
import ChatMenu from './ChatMenu'
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

/*

 Component

*/

const App = ({ isUserLoaded }) => (
  <div>
    {isUserLoaded &&
      <RedirectUnauthenticated>
        <div style={appStyle}>
          <ChatMenu/>
          <Router/>
          <Search/>
        </div>
      </RedirectUnauthenticated>
    }
    {!isUserLoaded && <Preloader/>}
  </div>
)

export default App
