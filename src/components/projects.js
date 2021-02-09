import React,{useState} from 'react';
import {Button } from 'react-bootstrap';
import ProjectList from "./ProjectList.js"
import CreateProject from "./ProjectForum"
import CreateQuote from "./CreateQuote"



import Nav from "./Nav"
import Avatar from "./Avatar.js"

function Projects(props) {
  const[count,setCount]=useState(0);
  const[clicked,setClicked]=useState(false);
  const[clicked2,setClicked2]=useState(false);
  const[clicked3,setClicked3]=useState(false);
  const styles =({move:{marginLeft:400}});

  return (
<div>
<Nav/>
<div>
    <Button variant={clicked? "dark" : "dark"}onClick={test} style={styles.move}>List Of Projects</Button>
    <Button variant={clicked2? "dark" : "dark"} onClick={test2}>Create New Project</Button>
    <Button variant={clicked2? "dark" : "dark"} onClick={test3}>Create a price quotation</Button>

    {clicked&& <ProjectList tok={props.token}/>}
    {clicked2&& <CreateProject tok={props.token}/>}
    {clicked3&& <CreateQuote tok={props.token}/>}

    </div>
    </div>
  );

function test() {
    setClicked(!clicked);
    if(clicked2)
    {
      setClicked2(!clicked2)
    }
    if(clicked3)
    {
      setClicked3(!clicked3)
    }
  }

function test2() {
  setClicked2(!clicked2);
  if(clicked)
  {
    setClicked(!clicked)
  }
  if(clicked3)
  {
    setClicked3(!clicked3)
  }
}
function test3() {
  setClicked3(!clicked3);
  if(clicked)
  {
    setClicked(!clicked)
  }
  if(clicked2)
  {
    setClicked2(!clicked2)
  }
}






}
export default Projects