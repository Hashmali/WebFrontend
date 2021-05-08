import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import Avatar from "../Avatar";

const EditReport = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [pic, setPic] = useState();
  const [loader, setLoader] = useState(false);
  const [picUrl, setPicUrl] = useState("");
  const [projects, setProjects] = useState([]);

  const submitImage = () => {
    const newData = new FormData();
    newData.append("image", picUrl);
    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    setLoader(true);
    fetch(url, requestOptions2)
      .then((res) => res.json())
      .then((image) => {
        setPicUrl(image.url);
      })
      .catch((error) => alert("error while updating..."));
    setLoader(false);
  };

  const handleImageUpload = () => {
    console.log(pic);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "hashmaliProject");
    data.append("cloud_name", "dj42j4pqu");
    setLoader(true);
    fetch(url2, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((image) => {
        setPicUrl(image.url);
      })
      .catch((error) => alert("error while uploading..."));
    setLoader(false);
  };

  const imageHandler = (e, name) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      if (name == "image") {
        setPreviewImage(e.target.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (name == "image") {
      setPic(e.target.files[0]);
    }
  };

  const [report, setReport] = useState({
    title: "",
    description: "",
    project: "",
    image: "",
  });
  const { title, description, project, image } = report;
  const onInputChange = (e) => {
    if (e.target.type == "file") {
      alert(e.target.name);
      setReport({ ...report, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setReport({ ...report, [e.target.name]: e.target.value });
  };
  function handleSelect(e) {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    setReport({ ...report, [name]: parseInt(value) });
    console.log(report);
  }

  var toke = "Token " + props.token + " ";
  var workerID = props.id;

  var url =
    "https://hashmali-backend.herokuapp.com/api/report/" + id + "/update/";
  var url2 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";
  var url3 = "https://hashmali-backend.herokuapp.com/api/project/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };
  const requestOptions3 = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  function patch_request() {
    const newData = new FormData();
    /* 
    title,
    description,
    start_hour,
    ending_hour,
    project,
    image,  
        */
    newData.append("title", report.title);
    newData.append("worker", workerID);
    newData.append("description", report.description);
    newData.append("project", report.project);
    if (pic) {
      handleImageUpload();
    }

    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions2;
  }
  const loadProjects = async () => {
    const data = await fetch(url3, requestOptions3).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const projects_data = await data.json();
    setProjects(projects_data);
  };

  useEffect(() => {
    if (props.token) {
      loadReport();
      loadProjects();
    }
  }, [props.token]);

  useEffect(() => {
    if (picUrl) {
      submitImage();
    }
  }, [picUrl]);

  const loadReport = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);
    const report_data = await data.json();
    setReport(report_data);
    setPreviewImage(report_data.image);
  };
  console.log(status);

  const onSubmit = async (e) => {
    e.preventDefault();
    //Checking if password and phone are empty
    if (!title) {
      alert("please provide report title...");
      return;
    }
    //Checking if password and phone are empty
    if (!description) {
      alert("please provide report details...");
      return;
    }

    //Checking if password and phone are empty
    if (!image) {
      alert("please upload image...");
      return;
    }
    if (!project) {
      alert("please choose a project...");
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

    const update = await loadReport();
    if (data.status == 200) {
      alert("Successfully Edited report!");
      history.push("/reports");
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
        <Link className="btn btn-dark" to="/reports">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Edit Report Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Title
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter report title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Description
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter report content"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <h4 className="text-center mb-4">Project</h4>
          <div>
            <select
              class="form-select"
              className="form-control form-control-lg"
              name={"project"}
              onChange={handleSelect}
            >
              <option selected>{report.project}</option>
              {projects
                ? projects.map((project) => (
                    <option value={project.id}>{project.project_code}</option>
                  ))
                : ""}
            </select>
          </div>
          <h4 className="text-center mb-4">Photo</h4>
          <div className="form-group">
            <Avatar avatarUrl={previewImage} />
            <Label color="black" as="a" basic>
              Upload a photo
            </Label>
            <input
              type="file"
              name="image"
              onChange={(e) => onInputChange(e)}
              accept="image/*"
            />
          </div>

          <button className="btn btn-dark btn-block">Update Report</button>
        </form>
      </div>
    </div>
  );
};

export default EditReport;
