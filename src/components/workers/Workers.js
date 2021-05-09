import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import Nav from "../Nav";
import { Button } from "semantic-ui-react";

import Loader from "../Loader";

const List = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    console.log(toke);

    const data = await fetch(
      "https://hashmali-backend.herokuapp.com/api/worker/",
      requestOptions
    ).catch((error) => console.error(error));
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };
  if (status != 200) {
    return (
      <div>
        <Nav activeItem="Workers Management" token={props.token} />
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
          <h1>List Of Workers:</h1>
          <table className="table border shadow">
            <thead style={{ backgroundColor: "black" }}>
              <tr style={{ color: "white" }}>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">ID</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Profile</th>
                <th>Action</th>
                <th scope="col">
                  <Link to={`/workers/create`}>
                    <Button icon="add" color="yellow" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((worker, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{worker.first_name}</td>
                  <td>{worker.second_name}</td>
                  <td>{worker.id_no}</td>
                  <td>{worker.phone}</td>
                  <td>{worker.email}</td>

                  <td>
                    <Avatar avatarUrl={worker.image} />
                  </td>

                  <td>
                    <Link to={`/workers/${worker.id}`}>
                      <Button icon="eye" color="teal" />
                    </Link>
                    <Link to={`/workers/edit/${worker.id}`}>
                      <Button icon="edit" color="blue" />
                    </Link>
                    <Link to={`/workers/delete/${worker.id}`}>
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
export default List;
