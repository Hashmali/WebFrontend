import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Route,BrowserRouter as Router,Switch,Link,useHistory } from "react-router-dom"
import "./login.css";
import { propTypes } from "react-bootstrap/esm/Image";

export default function Logout(props) {
  var toke="Token " + props.token+" "
  const history = useHistory();
  function check() {  
    history.push('/');
  }
   function GetRequest() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : toke
      ,}
      };
      fetch('http://127.0.0.1:8000/api/worker/logout/',requestOptions).catch(error=>console.error(error))
      check()
  }
 
  return(
    <button onClick={GetRequest}>saed</button>

  );


}
