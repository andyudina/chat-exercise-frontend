/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import RedirectUnauthenticatedRoute from '../containers/RedirectUnauthenticatedRoute'

import Preloader from './Preloader'
import SetNickname from '../containers/SetNickname'
import UserChats from '../containers/UserChats'
import Search from '../containers/Search'
import CreateGroupChat from '../containers/CreateGroupChat'
import Welcome from '../containers/Welcome'
import Chat from '../containers/Chat'
/* eslint-enable no-unused-vars */

const Router = ({ isUserLoaded, location }) => (
  <div>
    {isUserLoaded &&
      <BrowserRouter>
        <Switch location={location}>
          <RedirectUnauthenticatedRoute
            exact path='/nickname'
            component={SetNickname} />
          <RedirectUnauthenticatedRoute
            path='/user-chats'
            component={UserChats} />
          <RedirectUnauthenticatedRoute
            path='/search'
            component={Search} />
          <RedirectUnauthenticatedRoute
            path='/create-group-chat'
            component={CreateGroupChat} />
          <RedirectUnauthenticatedRoute
            path='/welcome'
            component={Welcome} />
          <RedirectUnauthenticatedRoute
            path='/chat/:chatId'
            component={Chat} />
        </Switch>
      </BrowserRouter>
    }
    {!isUserLoaded && <Preloader/>}
  </div>
)

export default Router
