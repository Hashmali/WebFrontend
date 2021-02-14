import React,{useState} from 'react';
import {Button } from 'react-bootstrap';
import List from "./WorkerList.js"
import RegisterForum from "./RegisterForum"
import UpdateWorker from "./UpdateWorker"

import Nav from "./Nav"
function Workers(props) {
  const[clicked,setClicked]=useState(false);
  const[clicked2,setClicked2]=useState(false);
  const[clicked3,setClicked3]=useState(false);
  function test1()  {
    setClicked(!clicked);
    if(clicked2){setClicked2(!clicked2)}
    if(clicked3){setClicked3(!clicked3)}
  }

  function test2()  {
    setClicked2(!clicked2);
    if(clicked){setClicked(!clicked)}
    if(clicked3){setClicked3(!clicked3)}
  }
  
  function test3() {
    setClicked3(!clicked3);
    if(clicked){setClicked(!clicked)}
    if(clicked2){setClicked2(!clicked2)}

  }
  return (
    <div>
    <Nav/>
    <div>
    <Button variant={clicked? "dark" : "dark"}onClick={test1} style={styles.move}    >List Of Workers</Button>
    <Button variant={clicked2? "dark" : "dark"} onClick={test2}>Add New Worker</Button>
    <Button variant={clicked3? "dark" : "dark"} onClick={test3}>Update Worker</Button>

    {clicked&& <List tok={props.token}/>}
    {clicked2&& <RegisterForum tok={props.token}/>}
    {clicked3&& <UpdateWorker tok={props.token}/>}

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
