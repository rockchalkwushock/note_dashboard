import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...others }) =>
  <Route
    {...others}
    render={props =>
      auth.isLoggedIn
        ? <Component {...props} />
        : <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />}
  />

export default connect(state => ({
  auth: state.auth
}))(PrivateRoute)
