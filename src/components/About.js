import React from "react";
import Nav from "./Nav";

export default function About(props) {
  console.log(props.token);
  return (
    <div>
      <Nav token={props.token} />
      <h1> this is the about page</h1>
      <h1>{props.token}</h1>
    </div>
  );
}
