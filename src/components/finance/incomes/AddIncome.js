import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../Avatar";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../../Loader";
import ImageFilterFrames from "material-ui/svg-icons/image/filter-frames";
import DatePicker from "react-date-picker";
import { TimePicker } from "antd";
import "antd/dist/antd.css";

import moment from "moment";

const AddIncome = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [projects, setProjects] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

  const [income, setIncome] = useState({
    title: "",
    amount: "",
    description: "",
    project: "",
    image: "",
  });
  const { title, amount, description, project, image } = income;
  const onInputChange = (e) => {
    if (e.target.type == "file") {
      alert(e.target.name);
      setIncome({ ...income, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  function handleSelect(e) {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    setIncome({ ...income, [name]: parseInt(value) });
    console.log(income);
  }

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/finance/incomes/create/";
  var url2 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";
  var url3 = "https://hashmali-backend.herokuapp.com/api/project/";

  function post_request() {
    const newData = new FormData();
    /* 
       title,
    amount,
    description,
    project,
    image,

        */
    newData.append("title", income.title);
    newData.append("amount", income.amount);
    newData.append("description", income.description);
    newData.append("project", income.project);

    let djangoFormatDate =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();

    console.log(djangoFormatDate);
    newData.append("month", djangoFormatDate);
    newData.append("image", income.image);
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
  const requestOptions2 = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //Checking if password and phone are empty
    if (!title) {
      alert("please provide income title...");
      return;
    }
    //Checking if password and phone are empty
    if (!description) {
      alert("please provide income details...");
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

    const data = await fetch(url, post_request()).catch((error) =>
      console.error(error)
    );
    if (data.status) {
      if (data.status != 201) {
        alert(data.status);
      }
      if (data.status == 201) {
        alert("Successfully created Income!");
        history.push("/finance");
      }
    }
  };

  const loadProjects = async () => {
    const data = await fetch(url3, requestOptions2).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const projects_data = await data.json();
    setProjects(projects_data);
  };

  useEffect(() => {
    if (props.token) {
      loadProjects();
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
        <Link className="btn btn-dark" to="/finance">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Fill in Income Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Title
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Income title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Amount
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Income amount"
              name="amount"
              value={amount}
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
              placeholder="Enter Income content"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
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

          <h4 className="text-center mb-4">Project</h4>
          <div>
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

          <button className="btn btn-dark btn-block">Create Income</button>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
