import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TableScrollbar from "react-table-scrollbar";
function Avatar(props) {
  let source = props.avatarUrl;
  if (!source) {
    source = "/images/Network-Profile.png";
  }
  return <img width="150" height="150" src={source} />;
}

export default Avatar;
