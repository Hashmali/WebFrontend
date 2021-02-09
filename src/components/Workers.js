import React,{useState} from 'react';
import {Button } from 'react-bootstrap';
import List from "./WorkerList.js"
import RegisterForum from "./RegisterForum"
import Nav from "./Nav"
function Workers(props) {
  const[clicked,setClicked]=useState(false);
  const[clicked2,setClicked2]=useState(false);
  function test2()  {
    setClicked(!clicked);
    if(clicked2){setClicked2(!clicked2)}
  }
  
  function test3() {
    setClicked2(!clicked2);
    if(clicked){setClicked(!clicked)}
  }
  return (
    <div>
    <Nav/>
    <div>
    <Button variant={clicked? "dark" : "dark"}onClick={test2} style={styles.move}    >List Of Workers</Button>
    <Button variant={clicked2? "dark" : "dark"} onClick={test3}>Add New Worker</Button>
    {clicked&& <List tok={props.token}/>}
    {clicked2&& <RegisterForum tok={props.token}/>}
    </div>
    </div>
  );
}
export default Workers;

const styles =({
  move:{
    marginLeft:500
  }
 
});
