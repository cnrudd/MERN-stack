import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from './pages/Login';
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Signup from "./pages/Signup";

import { isLoggedIn } from './utils/Authentication'
// see https://reacttraining.com/react-router/web/example/auth-workflow

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <PublicRoute exact path="/" component={Splash} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={Signup} />
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

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
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

function PublicRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={routeProps =>
        !isLoggedIn() ? (
          <Component {...routeProps} />
        ) : (
            <Redirect
              to={{
                pathname: "/books"
              }}
            />
          )
      }
    />
  );
}
