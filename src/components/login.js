import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Route,BrowserRouter as Router,Switch,Link,useHistory } from "react-router-dom"
import "./login.css";
import { propTypes } from "react-bootstrap/esm/Image";

export default function Login(props) {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return phone.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {  
    event.preventDefault();
  }
  function check(data) {  
    if(data.token)
    {
      props.userLogin(data.token)
      props.userId(data.id)

      console.log( props.userLogin) 
     history.push('/Home');
    }
    else{alert("failed to login...")}


  }
   
    function sendRequest() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ username: phone,password:password })
      };
      console.log(requestOptions.body)
      fetch('http://127.0.0.1:8000/api/worker/login/',requestOptions)
      .then(data=>data.json())
      .then(data=>{check(data)})
      .catch(error=>console.error(error))
      
  }
  
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            autoFocus
            type="number"  
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
        <Button block size="lg" type="submit" disabled={!validateForm()}  onClick={sendRequest}  style={{    background: "black",
}}>
          Login
        </Button>
      </Form>
    </div>
  );
}