import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Avatar from "../Avatar";
import Nav from "../Nav";
import { Button } from "semantic-ui-react";

import Loader from "../Loader";

const Projects = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  var toke = "Token " + props.token + " ";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  useEffect(() => {
    if (props.token) {
      fetchItems();
    }
  }, [props.token]);

  const fetchItems = async () => {
    const data = await fetch(
      "https://hashmali-backend.herokuapp.com/api/project/",
      requestOptions
    ).catch((error) => console.error(error));
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };

  if (status != 200) {
    return (
      <div>
        <Nav activeItem="Projects" token={props.token} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Loader
            type="Puff"
            color="#343a40"
            height={150}
            width={150}
            timeout={3000} //3 secs
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />

      <div className="container">
        <div className="py-4">
          <h1>List Of Projects:</h1>
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project Code</th>
                <th scope="col">Building Type</th>
                <th scope="col">Building Photo</th>
                <th scope="col">Address</th>
                <th scope="col">Progress (%)</th>
                <th>Action</th>
                <th scope="col">
                  <Link to={`/projects/create`}>
                    <Button icon="add" color="yellow" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((project, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{project.project_code}</td>
                  <td>{project.property_type}</td>
                  <td>
                    <Avatar avatarUrl={project.building_image} />
                  </td>
                  <td>{project.address_link}</td>
                  <td>
                    <ProgressBar
                      now={project.progress}
                      label={`${project.progress}%`}
                    />
                  </td>
                  <td>
                    <Link to={`/projects/${project.id}`}>
                      <Button icon="eye" color="teal" />
                    </Link>
                    <Link to={`/projects/edit/${project.id}`}>
                      <Button icon="edit" color="blue" />
                    </Link>
                    <Link to={`/projects/delete/${project.id}`}>
                      <Button icon="delete" color="red" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Projects;

/*
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

*/
