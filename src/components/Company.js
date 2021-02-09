import React,{useState,useEffect} from 'react';
import Nav from "./Nav"
import Info from "./Info"
import UpdateInfo from "./UpdateInfo"
import Avatar from './Avatar'
import {Button } from 'react-bootstrap';
const source="/images/logo.png"



export default function Company(props) {
  const[clicked,setClicked]=useState(false);

  function isClicked(){
    setClicked(!clicked);
  }
 
 return(
<div>
  <Nav/>
  <Button variant="dark"onClick={isClicked} >Update Data </Button>
 {clicked&&<UpdateInfo id={props.id} token={props.token}/>}
  {!clicked&&<Info  id={props.id} token={props.token}/>}
  </div> 
 );
 
}

/*
    


*/
  