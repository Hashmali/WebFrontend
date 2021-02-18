import React from 'react';
import Nav from "./Nav"

export default function Schedule(props) {
  return (
   <div>
          <Nav/>
          <h1> i am the schedule</h1>
          <h1>{props.token}</h1>

   </div>
  );
}
