import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import Nav from "../Nav";
import { Button } from "semantic-ui-react";

import Loader from "../Loader";

const Reports = (props) => {
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
      "https://hashmali-backend.herokuapp.com/api/report/",
      requestOptions
    ).catch((error) => console.error(error));
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };
  if (status != 200) {
    return (
      <div>
        <Nav activeItem="Reports" token={props.token} />
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
          <h1>Reports:</h1>
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Worker</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Start hour</th>
                <th scope="col">Ending hour</th>
                <th scope="col">Project</th>
                <th scope="col">Image</th>
                <th>Action</th>
                <th scope="col">
                  <Link to={`/reports/create`}>
                    <Button icon="add" color="yellow" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((report, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{report.title}</td>
                  <td>{report.worker}</td>
                  <td>{report.description}</td>
                  <td>{report.date}</td>
                  <td>{report.start_hour}</td>
                  <td>{report.ending_hour}</td>
                  <td>{report.project}</td>

                  <td>
                    <Avatar avatarUrl={report.image} />
                  </td>

                  <td>
                    <Link to={`/reports/${report.id}`}>
                      <Button icon="eye" color="teal" />
                    </Link>
                    <Link to={`/reports/edit/${report.id}`}>
                      <Button icon="edit" color="blue" />
                    </Link>
                    <Link to={`/reports/delete/${report.id}`}>
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
export default Reports;
