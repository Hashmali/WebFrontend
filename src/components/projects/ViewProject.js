import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import Avatar from "../Avatar";
import ApartmentIcon from "@material-ui/icons/Apartment";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import DomainIcon from "@material-ui/icons/Domain";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import GroupIcon from "@material-ui/icons/Group";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PermContactCalendarSharpIcon from "@material-ui/icons/PermContactCalendarSharp";
import ContactsSharpIcon from "@material-ui/icons/ContactsSharp";
import LocalPhoneSharpIcon from "@material-ui/icons/LocalPhoneSharp";
import EmailSharpIcon from "@material-ui/icons/EmailSharp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
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
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ul className="list-group w-25">
            <h1 style={{ textAlign: "center" }}>Building</h1>

            <li className="list-group-item">
              <ApartmentIcon />
              <strong> Property Type:</strong> {items.property_type}
            </li>
            <li className="list-group-item">
              {" "}
              <HomeIcon />
              <strong>Address:</strong> {items.address_link}
            </li>
            <li className="list-group-item">
              {" "}
              <LocationCityIcon />
              <strong>City:</strong> {items.city}
            </li>
            <li className="list-group-item">
              {" "}
              <LocationSearchingIcon />
              <strong>Street:</strong> {items.street}
            </li>
            <li className="list-group-item">
              {" "}
              <DomainIcon />
              <strong>property_no:</strong> {items.property_no}
            </li>
            <li className="list-group-item">
              <GpsFixedIcon />
              <a
                href={`https://www.waze.com/live-map?utm_source=waze_website&utm_campaign=waze_website&utm_medium=website_menu`}
                target="_blank"
              >
                Open Waze
              </a>
            </li>
            <li className="list-group-item">
              <AddLocationIcon />
              <a href={`https://www.google.co.il/maps`} target="_blank">
                Open Google Maps
              </a>
            </li>
          </ul>

          <ul className="list-group w-25" style={{ marginLeft: "15px" }}>
            <h1 style={{ textAlign: "center" }}>Owner</h1>

            <li className="list-group-item">
              <AccountBoxIcon />
              <strong> First Name:</strong> {items.owner_first_name}
            </li>
            <li className="list-group-item">
              <GroupIcon />
              <strong> Last Name:</strong> {items.owner_second_name}
            </li>
            <li className="list-group-item">
              <ContactPhoneIcon />
              <strong> Phone:</strong> {items.owner_phone_no}
            </li>
            <li className="list-group-item">
              <ContactMailIcon />
              <strong> Email:</strong> {items.owner_email}
            </li>
          </ul>
          <ul className="list-group w-25" style={{ marginLeft: "15px" }}>
            <h1 style={{ textAlign: "center" }}>Contractor </h1>

            <li className="list-group-item">
              <PermContactCalendarSharpIcon />
              <strong> First Name:</strong> {items.contractor_first_name}
            </li>
            <li className="list-group-item">
              <ContactsSharpIcon />
              <strong> Last Name:</strong> {items.contractor_second_name}
            </li>
            <li className="list-group-item">
              <LocalPhoneSharpIcon />
              <strong> Phone:</strong> {items.contractor_phone_no}
            </li>
            <li className="list-group-item" style={{ fontSize: "12px" }}>
              <EmailSharpIcon />
              <strong> Email:</strong> {items.contractor_email}
            </li>
          </ul>
          <ul className="list-group w-25" style={{ marginLeft: "15px" }}>
            <h1 style={{ textAlign: "center" }}>Architect </h1>
            <li className="list-group-item">
              <AccountCircleIcon />
              <strong> First Name:</strong> {items.architect_first_name}
            </li>
            <li className="list-group-item">
              <SupervisedUserCircleIcon />
              <strong> Last Name:</strong> {items.architect_second_name}
            </li>
            <li className="list-group-item">
              <PhoneAndroidIcon />
              <strong> Phone:</strong> {items.architect_phone_no}
            </li>
            <li className="list-group-item">
              <MailOutlineIcon />
              <strong> Email:</strong> {items.architect_email}
            </li>
          </ul>
        </div>

        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
        ></div>
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
