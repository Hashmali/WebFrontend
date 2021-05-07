import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../Avatar";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import ImageFilterFrames from "material-ui/svg-icons/image/filter-frames";

const AddReport = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);

  const [previewImage, setPreviewImage] = useState();
  const [pic, setPic] = useState();
  const [picUrl, setPicUrl] = useState();

  const handleImageUpload1 = () => {
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
    worker: "",
    description: "",
    date: "",
    start_hour: "",
    ending_hour: "",
    project: "",
    image: "",
  });
  const {
    title,
    worker,
    description,
    date,
    start_hour,
    ending_hour,
    project,
    image,
  } = report;
  const onInputChange = (e) => {
    console.log(e.target.value);

    if (e.target.type == "file") {
      alert(e.target.name);
      setReport({ ...report, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  var toke = "Token " + props.token + " ";
  var url = "https://hashmali-backend.herokuapp.com/api/report/create/";
  var url2 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";

  function post_request() {
    const newData = new FormData();
    /* 
    title,
    worker,
    description,
    date,
    start_hour,
    ending_hour,
    project,
    image,  

        */
    newData.append("title", report.title);
    newData.append("worker", report.worker);
    newData.append("description", report.description);
    newData.append("date", report.date);
    newData.append("start_hour", report.start_hour);
    newData.append("ending_hour", report.ending_hour);
    newData.append("project", report.project);
    newData.append("image", report.image);
    if (pic) {
      handleImageUpload1();
      console.log(picUrl);
      newData.append("image", picUrl);
    }

    const requestOptions = {
      method: "POST",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions;
  }

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

    const data = await fetch(url, post_request()).catch((error) =>
      console.error(error)
    );
    if (data.status) {
      if (data.status != 201) {
        alert(data.status);
      }
      if (data.status == 201) {
        alert("Successfully created report!");
        history.push("/reports");
      }
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

        <h2 className="text-center mb-4">Fill in Report Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Title
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker first name"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Worker
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker last name"
              name="worker"
              value={worker}
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
              placeholder="Enter worker password"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Date
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker phone number"
              name="date"
              value={date}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Start Hour
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker email"
              name="start_hour"
              value={start_hour}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Finish Hour
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker email"
              name="ending_hour"
              value={ending_hour}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Project
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker address"
              name="project"
              value={project}
              onChange={(e) => onInputChange(e)}
            />
          </div>

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

          <button className="btn btn-dark btn-block">Create Worker</button>
        </form>
      </div>
    </div>
  );
};

export default AddReport;
