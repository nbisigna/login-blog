import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Private = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props => (!user ? <></> : <Component {...props} />)}
  />
);

export default Private;
