import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { login } from "../actions/userAction";
import FormContainer from "../components/shared/FromContainer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  const history = useNavigate();
  useEffect(() => {
    if (userInfo) {
      console.log(redirect);
      history(redirect);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <React.Fragment>
      <FormContainer>
        <h1>Sign In</h1>
        <br />
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Loader />}
        {Loader}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Button type="submit" varient="primary">
            Sign In
          </Button>
        </Form>
        <br />
        <Row>
          <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </React.Fragment>
  );
};

export default LoginPage;