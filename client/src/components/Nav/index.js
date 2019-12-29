import React from "react";
import { Button, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { isLoggedIn, logOut } from '../../utils/Authentication'

const Nav = () => (
  <Navbar className='navbar-expand-lg navbar-dark bg-primary justify-content-between'>
    <Navbar.Brand href="/">React Reading List</Navbar.Brand>
    {
      isLoggedIn() ?
        <Button onClick={logOut} >Logout</Button> :
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
    }
  </Navbar>
);

export default Nav;
