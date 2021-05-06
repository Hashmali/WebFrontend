import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import Avatar from "../Avatar";

const Project = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  //console.log(toke)

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/project/" + id + "/manage/";

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
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);

    const items = await data.json();
    setItems(items);
  };
  console.log(status);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="container py-4">
      <Link className="btn btn-dark" to="/projects">
        Back to Projects
      </Link>
      <h1 className="display-5" style={{ textAlign: "center" }}>
        Project Code: {items.project_code}
      </h1>
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

        <ul className="list-group w-50">
          <li className="list-group-item">
            <a
              href={`https://www.waze.com/live-map?utm_source=waze_website&utm_campaign=waze_website&utm_medium=website_menu`}
              target="_blank"
            >
              Open Waze
            </a>
          </li>
          <li className="list-group-item">
            <a href={`https://www.google.co.il/maps`} target="_blank">
              Open Google Maps
            </a>
          </li>
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
    </div>
  );
};

export default Project;
/*

            project_code, property_type, address_link, city, street,property_no,
            owner_first_name,owner_second_name,owner_phone_no,owner_email,
            contractor_first_name,contractor_second_name,contractor_phone_no,contractor_email,
            architect_first_name,architect_second_name,architect_phone_no,architect_email,image











*/
