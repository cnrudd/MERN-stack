import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

/* We want to import our 'AuthHelperMethods' component in order to send a login request */
import AuthHelperMethods from './utils/Authentication';

import Splash from "./pages/Splash";
import Login from './pages/Login';
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Signup from "./pages/Signup";

// see https://reacttraining.com/react-router/web/example/auth-workflow

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute path="/books"><Books /></PrivateRoute>
          <PrivateRoute path="/books/:id"><Detail /></PrivateRoute>
          <Route path="*"><NoMatch /></Route>
        </Switch>
      </div>
    </Router>

  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {

      /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
  const Auth = new AuthHelperMethods();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.loggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
