import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Route,BrowserRouter as Router,Switch,Link,useHistory } from "react-router-dom"
import "./login.css";
import { propTypes } from "react-bootstrap/esm/Image";
import Nav from "./Nav"

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
      fetch('https://hashmali-backend.herokuapp.com/api/worker/logout/',requestOptions).catch(error=>console.error(error))
      check()
  }
 
  return(
    <div>
    <Nav/>
    <Button variant="danger" onClick={GetRequest} style={{marginLeft:500}} >Confirm Log Out</Button>
    </div>

  );


}
