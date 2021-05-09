import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../../Loader";
import Avatar from "../../Avatar";

const EditIncome = (props) => {
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
    "https://hashmali-backend.herokuapp.com/api/finance/" + id + "/incupdate/";
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
    amount,
    description,
    project,
    image,

        */
    newData.append("title", income.title);
    newData.append("amount", income.amount);
    newData.append("description", income.description);
    newData.append("project", income.project);
    if (pic) {
      handleImageUpload();
      console.log(picUrl);
      newData.append("image", picUrl);
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
      loadIncome();
      loadProjects();
    }
  }, [props.token]);

  useEffect(() => {
    if (picUrl) {
      submitImage();
    }
  }, [picUrl]);

  const loadIncome = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);
    const income_data = await data.json();
    setIncome(income_data);
    setPreviewImage(income_data.image);
  };
  console.log(status);

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

    const update = await loadIncome();
    if (data.status == 200) {
      alert("Successfully Edited Income!");
      history.push("/finance");
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
        <Link className="btn btn-dark" to="/finance">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Edit Income Details:</h2>
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

          <button className="btn btn-dark btn-block">Edit Income</button>
        </form>
      </div>
    </div>
  );
};
export default EditIncome;
