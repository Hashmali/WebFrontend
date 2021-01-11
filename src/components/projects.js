import React,{useState} from 'react';
import {Button } from 'react-bootstrap';
import ProjectList from "./ProjectList.js"
import CreateProject from "./ProjectForum"
import Nav from "./Nav"
import Avatar from "./Avatar.js"

function Projects(props) {
  const[count,setCount]=useState(0);
  const[clicked,setClicked]=useState(false);
  const[clicked2,setClicked2]=useState(false);
  const styles =({move:{marginLeft:500}});

  return (
<div>
<Nav/>
<div>
    <Button variant={clicked? "success" : "dark"}onClick={test2} style={styles.move}>List Of Projects</Button>
    <Button variant={clicked2? "success" : "danger"} onClick={test3}>Create New Project</Button>
    {clicked&& <ProjectList tok={props.token}/>}
    {clicked2&& <CreateProject tok={props.token}/>}
    </div>
    </div>
  );
function generate()
{

}
function test() {
  return <h1>Hello World</h1>;
}
function test2() {
     setClicked(!clicked);
    if(clicked2){setClicked2(!clicked2)}
  }

function test3() {
    setClicked2(!clicked2);
    if(clicked){setClicked(!clicked)}
}


}
export default Projects