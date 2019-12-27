import React, { Component } from "react";
import {Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* We want to import our 'AuthHelperMethods' component in order to send a login request */
import AuthHelperMethods from '../../utils/Authentication';




class Login extends Component {

    /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
    Auth = new AuthHelperMethods();

    state = {
        email: "",
        password: ""
    }

    /* Fired off every time the use enters something into the input fields */
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        /* Here is where all the login logic will go. Upon clicking the login button, 
        we would like to utilize a login method that will send our entered credentials over to the server for verification. 
        Once verified, it should store your token and send you to the protected route. */
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                if (res === false) {
                    return alert("Sorry those credentials don't exist!");
                }
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
            })
    }

    componentWillMount() {
        /* Here is a great place to redirect someone who is already logged in to the protected route */
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={() => this.props.history.replace('/')}
                animation={false}
                size="lg"
                aria-labelledby="login-form"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="login-form">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="card-title">Login to your reading list</h5>
                    <p className="card-text">Enter the email address and password you signed up with.</p>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input name='email' type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input name='password' type="password" className="form-control form-control-lg" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <Link className="link" to="/signup">Don't have an account? <span className="link-signup">Signup</span></Link>
                </Modal.Body>
            </Modal>
        );
    }

}

export default Login;