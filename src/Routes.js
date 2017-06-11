import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { PrivateRoute } from './components'
import { Dashboard, Login, Signup } from './pages'

/**
 * NOTE:
 * You MUST create '/signup' & '/login' views now.
 * Without and authenticated user you cannot reach '/'.
 */

export default () =>
  <Switch>
    <PrivateRoute exact path="/" component={Dashboard} />
    <Route exact path="/signin" component={Signup} />
    <Route exact path="/signup" component={Login} />
  </Switch>
