import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../componenets/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    console.log('logging in');
  };

  return (
    <FormContainer>
      <h1>Log In</h1>
      <Form onSubmit={loginHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="button" className="mt-2" variant="primary">Login</Button>
      </Form>

      <Row className="py-3">
        <Col>
        New customer? <Link to='/register'>Create an account.</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
