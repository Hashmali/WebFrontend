import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "../Loader";
import Avatar from "../Avatar";

const DeleteMission = (props) => {
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const { id, id2, id3 } = useParams();
  let history = useHistory();

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/mission/" + id + "/update/";
  var url2 =
    "https://hashmali-backend.herokuapp.com/api/worker/" + id2 + "/edit/";
  var url3 =
    "https://hashmali-backend.herokuapp.com/api/project/" + id3 + "/manage/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const requestOptions2 = {
    method: "DELETE",
    headers: { Authorization: toke },
  };

  useEffect(() => {
    if (props.token) {
      fetchItems();
      fetchProjects();
      fetchWorkers();
    }
  }, [props.token]);

  const deleteMission = async (id) => {
    const data = await fetch(url, requestOptions2).catch((error) =>
      console.error(error)
    );
    if (data.status == 204) {
      alert("Successfully deleted Mission!");
      history.push("/missions");
    }
  };

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

  const fetchProjects = async () => {
    setLoader(true);
    const data = await fetch(url3, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);

    const project_data = await data.json();
    setProjects(project_data);
  };

  const fetchWorkers = async () => {
    setLoader(true);
    const data = await fetch(url2, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);

    const worker_data = await data.json();
    setWorkers(worker_data);
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container py-4">
      <h1 className="display-5">
        Are you sure you want to delete this Mission-{items.title}?
      </h1>
      <Link className="btn btn-primary" to="/missions">
        Cancel
      </Link>
      <button
        className="btn btn-danger"
        style={{ marginLeft: "20px" }}
        onClick={() => deleteMission(id)}
      >
        Confirm Delete
      </button>
      <hr />
      <ul className="list-group w-50" style={{ justifyContent: "center" }}>
        <li className="list-group-item">
          <h3>Worker: {workers.first_name + " " + workers.second_name}</h3>
        </li>
        <li className="list-group-item">
          <h3>Project: {projects.project_code}</h3>
        </li>
        <li className="list-group-item">
          <h3>Mission Details: {items.description}</h3>
        </li>
        <li className="list-group-item">
          <h3>Date: {items.date}</h3>
        </li>
      </ul>
    </div>
  );
};

export default DeleteMission;
