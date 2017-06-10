import React from 'react'
import { Route, Switch } from 'react-router-dom'

/**
 * TODO:
 * 1. import components
 * 2. Add component={component_here} on route
 * 3. Make and add <PrivateRoute />
 * 4. Plugin to <Root /> to render <Routes /> on
 *    navigation.
 *
 * NOTE:
 * path='/' will be a private route as will
 * anything behind this route that is not '/login'
 * or '/signup'
 */

export default () =>
  <Switch>
    <Route exact path="/" />
    <Route exact path="/signin" />
    <Route exact path="/signup" />
  </Switch>
