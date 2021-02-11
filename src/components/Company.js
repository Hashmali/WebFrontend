import React,{useState,useEffect} from 'react';
import Nav from "./Nav"
import Info from "./Info"
import UpdateInfo from "./UpdateInfo"
import Avatar from './Avatar'
import {Button } from 'react-bootstrap';
const source="/images/logo.png"



export default function Company(props) {
  const styles={
    background: "white",
    pic: {
      width: 180,
      height: 180,
      borderRadius: 180 / 2,
      overflow: "hidden",
      borderWidth: 3,
    },
    move:{
      marginLeft:600
      
    },  
  
  }




  const[clicked,setClicked]=useState(false);

  function isClicked(){
    setClicked(!clicked);
  }
 
 return(
<div>
  <Nav/>
  <Button variant="dark"onClick={isClicked} style={styles.move}>Update Data </Button>
 {clicked&&<UpdateInfo id={props.id} token={props.token}/>}
  {!clicked&&<Info  id={props.id} token={props.token}/>}
  </div> 
 );
 
}

/*
    


*/
  