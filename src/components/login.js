import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "./Loader";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import "./login.css";
import { propTypes } from "react-bootstrap/esm/Image";

export default function Login(props) {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  function validateForm() {
    return phone.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  function check(data) {
    if (data.token) {
      props.userLogin(data.token);
      props.userId(data.id);
      setLoader(false);
      history.push("/Home");
    } else {
      alert("failed to login...please try again!");

      setLoader(false);
    }
  }

  function sendRequest() {
    var regex = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
    if (!regex.test(phone)) {
      alert("please enter a valid phone number...");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: phone, password: password }),
    };
    console.log(requestOptions.body);
    setLoader(true);

    fetch(
      "https://hashmali-backend.herokuapp.com/api/worker/login/",
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => {
        check(data);
      })
      .catch((error) => console.error(error));
  }

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onClick={sendRequest}
          style={{ background: "black" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
