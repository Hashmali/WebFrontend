import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import Nav from "../Nav";
import { Button } from "semantic-ui-react";
import Loader from "../Loader";

const Missions = (props) => {
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
      "https://hashmali-backend.herokuapp.com/api/mission/",
      requestOptions
    ).catch((error) => console.error(error));
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };
  if (status != 200) {
    return (
      <div>
        <Nav activeItem="Missions" token={props.token} />

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
      <Nav activeItem="Missions" token={props.token} />

      <div className="container">
        <div className="py-5">
          <h1>Missions:</h1>
          <table className="table border shadow">
            <thead style={{ backgroundColor: "black" }}>
              <tr style={{ color: "white" }}>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Worker</th>
                <th scope="col">Project</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th>Action</th>
                <th scope="col">
                  <Link to={`/missions/create`}>
                    <Button icon="add" color="yellow" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((mission, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{mission.title}</td>
                  <th scope="col">
                    {mission.worker.first_name +
                      " " +
                      mission.worker.second_name}
                  </th>
                  {mission.project.project_code}
                  <td>{mission.date}</td>
                  <td>{mission.description}</td>

                  <td>
                    <Link
                      to={`/missions/${mission.id}/${mission.worker.id}/${mission.project.id}`}
                    >
                      <Button icon="eye" color="teal" />
                    </Link>
                    <Link
                      to={`/missions/edit/${mission.id}/${mission.worker.id}/${mission.project.id}`}
                    >
                      <Button icon="edit" color="blue" />
                    </Link>
                    <Link
                      to={`/missions/delete/${mission.id}/${mission.worker.id}/${mission.project.id}`}
                    >
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
export default Missions;
