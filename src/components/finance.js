import React from "react";
import Nav from "./Nav";

export default function finance(props) {
  return (
    <div>
      <Nav activeItem="Finance" />
      <h1> i am the finance</h1>
      <h1>{props.token}</h1>
    </div>
  );
}
