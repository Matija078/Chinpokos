import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, loggedInUser, ...rest }) => {
  return (
    <Route
      {...rest} // Spread the remaining props to the Route component
      render={(props) =>
        loggedInUser ? ( // Check if a user is logged in
          <Component {...props} loggedInUser={loggedInUser} /> // Render the specified component with props if user is logged in
        ) : (
          <Redirect to="/" /> // Redirect to the '/' path if user is not logged in
        )
      }
    />
  );
};

export default ProtectedRoute;
