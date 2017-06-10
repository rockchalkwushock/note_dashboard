import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Dashboard, Login, Signup } from './pages'

/**
 * TODO:
 * 1. Make and add <PrivateRoute />
 *
 * NOTE:
 * path='/' will be a private route as will
 * anything behind this route that is not '/login'
 * or '/signup'
 */

export default () =>
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/signin" component={Signup} />
    <Route exact path="/signup" component={Login} />
  </Switch>
