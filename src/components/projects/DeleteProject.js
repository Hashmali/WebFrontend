import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Avatar from "../Avatar";

const Project = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    fetchItems();
  }, []);

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/project/" + id + "/manage/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const requestOptions2 = {
    method: "DELETE",
    headers: { Authorization: toke },
  };

  const deleteProject = async (id) => {
    const data = await fetch(url, requestOptions2).catch((error) =>
      console.error(error)
    );
    if (data.status == 204) {
      alert("Succesffully deleted project!");
      history.push("/projects");
    }
  };
  const fetchItems = async () => {
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };
  console.log(status);
  return (
    <div className="container py-4">
      <h1 className="display-5">
        Are you sure you want to delete project-{items.project_code}?
      </h1>

      <Link className="btn btn-primary" to="/projects">
        Cancel
      </Link>
      <button
        className="btn btn-danger"
        style={{ marginLeft: "20px" }}
        onClick={() => deleteProject(id)}
      >
        Confirm Delete
      </button>
      <hr />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ul className="list-group w-50">
          <li className="list-group-item">
            Property Type: {items.property_type}
          </li>
          <li className="list-group-item">Address: {items.address_link}</li>
          <li className="list-group-item">City: {items.city}</li>
          <li className="list-group-item">Street: {items.street}</li>
          <li className="list-group-item">property_no: {items.property_no}</li>
        </ul>

        <ul className="list-group w-50" style={{ marginLeft: "15px" }}>
          <li className="list-group-item">
            Owner First Name: {items.owner_first_name}
          </li>
          <li className="list-group-item">
            Owner Last Name: {items.owner_second_name}
          </li>
          <li className="list-group-item">
            Owner Phone: {items.owner_phone_no}
          </li>
          <li className="list-group-item">Owner Email: {items.owner_email}</li>
        </ul>

        <ul className="list-group w-50" style={{ marginLeft: "15px" }}>
          <li className="list-group-item">
            Contractor First Name: {items.contractor_first_name}
          </li>
          <li className="list-group-item">
            Contractor Last Name: {items.contractor_second_name}
          </li>
          <li className="list-group-item">
            Contractor Phone: {items.contractor_phone_no}
          </li>
          <li className="list-group-item">
            Contractor Email: {items.contractor_email}
          </li>
        </ul>

        <ul className="list-group w-50" style={{ marginLeft: "15px" }}>
          <li className="list-group-item">
            Architect First Name: {items.architect_first_name}
          </li>
          <li className="list-group-item">
            Architect Last Name: {items.architect_second_name}
          </li>
          <li className="list-group-item">
            Architect Phone: {items.architect_phone_no}
          </li>
          <li className="list-group-item">
            Architect Email: {items.architect_email}
          </li>
        </ul>
      </div>

      <ul className="list-group w-50" style={{ marginTop: "15px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <li className="list-group-item">
            <Avatar avatarUrl={items.image} />
          </li>
          <li className="list-group-item" style={{ marginLeft: "10px" }}>
            <Avatar avatarUrl={items.image} />
          </li>
          <li className="list-group-item" style={{ marginLeft: "10px" }}>
            <Avatar avatarUrl={items.image} />
          </li>
          <li className="list-group-item" style={{ marginLeft: "10px" }}>
            <Avatar avatarUrl={items.image} />
          </li>
          <li className="list-group-item" style={{ marginLeft: "10px" }}>
            <Avatar avatarUrl={items.image} />
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Project;
