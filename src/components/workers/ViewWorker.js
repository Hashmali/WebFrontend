import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../Avatar";

const Worker = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const { id } = useParams();

  //console.log(toke)

  useEffect(() => {
    fetchItems();
  }, []);

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/worker/" + id + "/edit/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
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
      <Link className="btn btn-dark" to="/workers_management">
        Back to Home
      </Link>
      <h1 className="display-5">
        {items.first_name + " " + items.second_name}
      </h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">
          Profile: <Avatar avatarUrl={items.image} />
        </li>
        <li className="list-group-item">Email: {items.email}</li>
        <li className="list-group-item">phone: {items.phone}</li>
        <li className="list-group-item">ID: {items.id_no}</li>
        <li className="list-group-item">
          ID image: <Avatar avatarUrl={items.id_img} />
        </li>
        <li className="list-group-item">Type: {items.is_admin}</li>
        <li className="list-group-item">Age: {items.age}</li>
        <li className="list-group-item">Address: {items.address}</li>
        <li className="list-group-item">Pay Per Day: {items.pay_per_day}</li>
        <li className="list-group-item">
          Driving License Image:
          <Avatar avatarUrl={items.driving_license_img} />
        </li>
        <li className="list-group-item">
          Work License Image: {items.work_license_israel}
        </li>
        <li className="list-group-item">
          Work License Type: {items.work_license_type}
        </li>
        <li className="list-group-item">
          Work License Expire: {items.work_license_expire}
        </li>
      </ul>
    </div>
  );
};

export default Worker;
