import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../Avatar";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import DatePicker from "react-date-picker";
import { TimePicker } from "antd";
import "antd/dist/antd.css";

import moment from "moment";

const AddMission = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);

  const [startDate, setStartDate] = useState(new Date());

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
  var url = "https://hashmali-backend.herokuapp.com/api/mission/create/";
  var url2 = "https://hashmali-backend.herokuapp.com/api/project/";
  var url3 = "https://hashmali-backend.herokuapp.com/api/worker/";

  function post_request() {
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
    let djangoFormatDate =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();

    console.log(djangoFormatDate);
    newData.append("date", djangoFormatDate);
    newData.append("description", mission.description);

    const requestOptions = {
      method: "POST",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions;
  }
  const requestOptions2 = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

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
    if (!startDate) {
      alert("please provide date...");
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

    const data = await fetch(url, post_request()).catch((error) =>
      console.error(error)
    );
    if (data.status) {
      if (data.status != 201) {
        alert(data.status);
      }
      if (data.status == 201) {
        alert("Successfully created mission!");
        history.push("/missions");
      }
    }
  };

  const loadProjects = async () => {
    const data = await fetch(url2, requestOptions2).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const projects_data = await data.json();
    setProjects(projects_data);
  };
  const loadWorkers = async () => {
    const data = await fetch(url3, requestOptions2).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const workers_data = await data.json();
    setWorkers(workers_data);
  };

  useEffect(() => {
    if (props.token) {
      loadProjects();
      loadWorkers();
    }
  }, [props.token]);

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

        <h2 className="text-center mb-4">Fill in Mission Details:</h2>
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
              Date
            </Label>

            <DatePicker
              className="form-control form-control-lg"
              value={startDate}
              onChange={(date) => setStartDate(date)}

              // onChange={(date) => setStartDate(date)}
            />
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

          <button className="btn btn-dark btn-block">Create Mission</button>
        </form>
      </div>
    </div>
  );
};

export default AddMission;
