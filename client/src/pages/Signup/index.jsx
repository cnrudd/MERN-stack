import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* We want to import our 'AuthHelperMethods' component in order to send a login request */
import AuthHelperMethods from '../../utils/Authentication';


export default class Signup extends Component {

    /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
    Auth = new AuthHelperMethods();

    state = {
        firstName: '',
        lastName: '',
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
        this.Auth.login(this.state)
            .then(res => {
                if (res === false) {
                    return alert("Sorry signup failed!");
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
                        Reading List Signup
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="card-title">Signup to create your reading list</h5>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">First name</label>
                            <input name='firstName' type="text" className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Last name</label>
                            <input name='lastName' type="text" className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input name='email' type="email" className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input name='password' type="password" className="form-control form-control-lg" />
                        </div>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </form>
                    <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link>
                </Modal.Body>
            </Modal>
        );
    }

}