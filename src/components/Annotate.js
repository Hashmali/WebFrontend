import React from "react";
import Nav from "./Nav";

export default function Annotate(props) {
  console.log(props.token);
  return (
    <div>
      <Nav />
      <h1> this is the Annotate page</h1>
      <h1>{props.token}</h1>
    </div>
  );
}
