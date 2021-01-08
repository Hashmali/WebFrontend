import React from 'react';
import Nav from "./Nav"
import ProjectList from "./ProjectList"

export default function projects(props) {
  console.log(props.token)

  return (
   <div>
     <Nav/>
      <ProjectList/>
   </div>
  );
}
