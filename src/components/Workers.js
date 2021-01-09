import React,{useState} from 'react';
import {Button } from 'react-bootstrap';
import List from "./WorkerList.js"
import RegisterForum from "./RegisterForum"


import Nav from "./Nav"

function Workers(props) {
  const[count,setCount]=useState(0);
  const[clicked,setClicked]=useState(false);
  const[clicked2,setClicked2]=useState(false);

  console.log(props.token)

  return (
<div>
<Nav/>
<div>
    <Button variant={clicked? "success" : "dark"}onClick={test2} style={styles.move}    >List Of Workers</Button>
    <Button variant={clicked2? "success" : "danger"} onClick={test3}>Add New Worker</Button>
    {clicked&& <List tok={props.token}/>}
    {clicked2&& <RegisterForum tok={props.token}/>}
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
if(clicked2)
  setClicked2(!clicked2)

     console.log(clicked)
  return <h1>Hello</h1>;
  }

  function test3() {
    setClicked2(!clicked2);
    if(clicked)
  setClicked(!clicked)

   console.log(clicked2)
 return <h1>Hello</h1>;
 }








function POST_Register() {
  // Simple GET request using fetch
  fetch('http://127.0.0.1:8000/api/worker/register/',{
    method: 'POST',headers: { 'Content-Type': 'application/json',
    'Authorization' : 'Token ceb152feffce94ec5dd5a4bc872ae1e1cea2bcfd ',
  },
    body: JSON.stringify({ phone: '345',password:'saed',password2:'saed',
    is_admin:'true',first_name: 'Saesd',second_name:'jasber'
  
  })
  })

  .then(response => response.json())
  .then(data => console.log(data));
}

function POST_LogIN() {
  // Simple GET request using fetch
  fetch('http://127.0.0.1:8000/api/worker/login/',{
    method: 'POST',headers: { 'Content-Type': 'application/json',
  
  },
    body: JSON.stringify({ username: '2000',password:'saed' })
  })

  .then(response => response.json())
  .then(data => console.log(data));
}









}
export default Workers;









const styles =({

  move:{
    marginLeft:500


  }
  ,
  title: {
    
  }
});

const styles2 =({

  move:{
    marginLeft:500
  }
  ,
  title: {
    
  },
  body:{
    backgroundColor:"lightb"
    
  }


});
