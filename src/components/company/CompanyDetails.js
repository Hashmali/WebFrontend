import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import Info from "./Info";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { Button } from "semantic-ui-react";

const source = "/images/logo.png";
export default function CompanyDetails(props) {
  const styles = {
    background: "white",
    pic: {
      width: 180,
      height: 180,
      borderRadius: 180 / 2,
      overflow: "hidden",
      borderWidth: 3,
    },
    move: {
      marginLeft: 600,
    },
  };
  return (
    <div>
      <Nav activeItem="My Company" token={props.token} />
      <Info id={props.id} token={props.token} />
    </div>
  );
}
