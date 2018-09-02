/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Welcome from '../containers/Welcome'
import SetNickname from '../containers/SetNickname'
import Chat from '../containers/Chat'
/* eslint-enable no-unused-vars */

const Router = ({ location }) => (
  <BrowserRouter>
    <Switch location={location}>
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
  </BrowserRouter>
)

export default Router
