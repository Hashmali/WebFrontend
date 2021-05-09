import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import Avatar from "../Avatar";

const EditMission = (props) => {
  let history = useHistory();
  const { id, id2, id3 } = useParams();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);

  const [mission, setMission] = useState({
    title: "",
    worker: "",
    project: "",
    description: "",
  });
  const { title, worker, project, description } = mission;
  const onInputChange = (e) => {
    setMission({ ...mission, [e.target.name]: e.target.value });
  };
  function handleSelect(e) {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    setMission({ ...mission, [name]: parseInt(value) });
    console.log(mission);
  }

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/mission/" + id + "/update/";
  var url2 = "https://hashmali-backend.herokuapp.com/api/project/";
  var url3 = "https://hashmali-backend.herokuapp.com/api/worker/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  function patch_request() {
    const newData = new FormData();
    /* 
       title,
       worker,
           project,

    description,
        */
    newData.append("title", mission.title);
    newData.append("worker", mission.worker);
    newData.append("project", mission.project);
    newData.append("description", mission.description);

    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions2;
  }
  const loadProjects = async () => {
    const data = await fetch(url2, requestOptions).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const projects_data = await data.json();
    setProjects(projects_data);
  };
  const loadWorkers = async () => {
    const data = await fetch(url3, requestOptions).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const workers_data = await data.json();
    setWorkers(workers_data);
  };

  useEffect(() => {
    if (props.token) {
      loadMission();
      loadProjects();
      loadWorkers();
    }
  }, [props.token]);

  const loadMission = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);
    const mission_data = await data.json();
    setMission(mission_data);
  };
  console.log(status);

  const onSubmit = async (e) => {
    e.preventDefault();

    //Checking if password and phone are empty
    if (!title) {
      alert("please provide mission title...");
      return;
    }
    //Checking if password and phone are empty
    if (!description) {
      alert("please provide mission details...");
      return;
    }
    if (!project) {
      alert("please choose a project...");
      return;
    }
    if (!worker) {
      alert("please choose a worker...");
      return;
    }

    setLoader(true);
    const data = await fetch(url, patch_request()).catch((error) =>
      console.error(error)
    );
    if (data.status != 200) {
      alert(data.status);
    }
    setLoader(false);

    const update = await loadMission();
    if (data.status == 200) {
      alert("Successfully Edited Mission!");
      history.push("/missions");
    }
  };
  if (loader) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Loader />
        </Grid.Column>
      </Grid>
    );
  }
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link className="btn btn-dark" to="/missions">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Edit Mission Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Title
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Mission title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <h4 className="text-center mb-4">Worker</h4>
          <div>
            <Label color="black" as="a" basic>
              Worker
            </Label>

            <select
              class="form-select"
              className="form-control form-control-lg"
              name={"worker"}
              onChange={handleSelect}
            >
              <option>please choose worker:</option>
              {workers
                ? workers.map((worker) => (
                    <option value={worker.id}>
                      {worker.first_name + " " + worker.second_name}
                    </option>
                  ))
                : ""}
            </select>
          </div>

          <h4 className="text-center mb-4">Project</h4>
          <div>
            <Label color="black" as="a" basic>
              Project
            </Label>
            <select
              class="form-select"
              className="form-control form-control-lg"
              name={"project"}
              onChange={handleSelect}
            >
              <option>please choose a project:</option>
              {projects
                ? projects.map((project) => (
                    <option value={project.id}>{project.project_code}</option>
                  ))
                : ""}
            </select>
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Description
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Mission content"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-dark btn-block">Edit Mission</button>
        </form>
      </div>
    </div>
  );
};
export default EditMission;
