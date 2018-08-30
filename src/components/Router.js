/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import RedirectUnauthenticatedRoute from '../containers/RedirectUnauthenticatedRoute'

import Preloader from './Preloader'
import SetNickname from './SetNickname'
/* eslint-enable no-unused-vars */

const Router = ({ isUserLoaded, location }) => (
  <div>
    {isUserLoaded &&
      <BrowserRouter>
        <Switch location={location}>
          <RedirectUnauthenticatedRoute
            exact path='/'
            component={SetNickname} />
        </Switch>
      </BrowserRouter>
    }

    {!isUserLoaded && <Preloader/>}
  </div>
)

export default Router
