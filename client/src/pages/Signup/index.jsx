import React from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import AuthHelperMethods from '../../utils/Authentication';
import API from '../../utils/API'


const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
  });

const Auth = new AuthHelperMethods();

  

/*

need to add this hook style
    componentWillMount() {
         //redirect someone who is already logged in to the protected route
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

*/
const Signup = (props) => (
    <Modal
        show={true}
        onHide={() => props.history.replace('/')}
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
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const data = await API.signup(values);
                        if (data.success) {
                            setSubmitting(false);
                            Auth.setToken(data.jwt);
                            props.history.replace('/');
                        }
                    } catch (error) {
                        setSubmitting(false);
                        console.log(error);
            
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="signupFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    name='firstName'
                                    type="text"
                                    placeholder="First name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.firstName && touched.firstName && errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="signupLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    name='lastName'
                                    type="text"
                                    placeholder="Last name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.lastName && touched.lastName && errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="signupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    name='email'
                                    type="email"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.email && touched.email && errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    name='password'
                                    type="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.password && touched.password && errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</Button>
                    </Form>
                    )}
            </Formik>
            <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link>
        </Modal.Body>
    </Modal>

);

export default Signup;