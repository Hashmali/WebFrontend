import { ListItemSecondaryAction } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "../Loader";
import Avatar from "../Avatar";
import { Alert } from "bootstrap";
import { Grid } from "semantic-ui-react";
import { SingleBedSharp } from "@material-ui/icons";
const EditCompanyDetails = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [pic, setPic] = useState("");
  const [picUrl, setPicUrl] = useState("");

  const [loader, setLoader] = useState(false);
  const imageHandler = (e, name) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      if (name == "logo") {
        setPreviewImage(e.target.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (name == "logo") {
      setPic(e.target.files[0]);
    }
  };

  const [info, setInfo] = useState({
    company_name: "",
    logo: "",
    manager: "",
    deputy_director: "",
  });

  const { company_name, logo, manager, deputy_director } = info;

  const [workers, setWorkers] = useState([]);

  const onInputChange = (e) => {
    //  onChange={(e)=>setImage(e.target.files[0])}

    if (e.target.type == "file") {
      alert(e.target.name);
      setInfo({ ...info, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  var toke = "Token " + props.token + " ";
  var url = "https://hashmali-backend.herokuapp.com/api/info/1/update/";
  var url2 = "https://hashmali-backend.herokuapp.com/api/worker/";
  var url3 = "https://hashmali-backend.herokuapp.com/api/info/1/";
  var url4 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";

  const handleImageUpload = () => {
    console.log(pic);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "hashmaliProject");
    data.append("cloud_name", "dj42j4pqu");
    setLoader(true);
    fetch(url4, {
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

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  function patch_request() {
    const newData = new FormData();
    /*company_name, logo, manager, deputy_director*/
    newData.append("company_name", info.company_name);
    newData.append("manager", info.manager);
    newData.append("deputy_director", info.deputy_director);

    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions2;
  }

  useEffect(() => {
    if (props.token) {
      loadDetails();
      loadWorkers();
      getSelected();
    }
  }, [props.token]);

  useEffect(() => {
    if (picUrl) {
      submitImage();
      loadDetails();
      loadWorkers();
      getSelected();
    }
  }, [picUrl]);

  const loadDetails = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);
    const company_data = await data.json();
    setInfo(company_data);
    setPreviewImage(company_data.logo);
  };
  console.log(status);

  const loadWorkers = async () => {
    const data = await fetch(url2, requestOptions).catch((error) =>
      console.error(error)
    );

    setStatus(data.status);
    const workers_data = await data.json();
    setWorkers(workers_data);
  };
  console.log(status);

  const getSelected = async () => {
    const data = await fetch(url3, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    const selected_data = await data.json();
    setSelectedManager(
      selected_data.manager.first_name + " " + selected_data.manager.second_name
    );
    setSelectedDirector(
      selected_data.deputy_director.first_name +
        " " +
        selected_data.deputy_director.second_name
    );
  };
  const submitImage = () => {
    const newData = new FormData();
    newData.append("logo", picUrl);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const newData = new FormData();
    /*company_name, logo, manager, deputy_director*/
    newData.append("company_name", info.company_name);
    newData.append("manager", info.manager);
    newData.append("deputy_director", info.deputy_director);
    if (pic) {
      handleImageUpload();
      console.log(picUrl);
      newData.append("logo", picUrl);
    }

    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };

    const data = await fetch(url, requestOptions2).catch((error) =>
      console.error(error)
    );
    if (data.status != 200) {
      setLoader(false);
      alert(data.status);
    }

    const update = await loadDetails();
    if (data.status == 200) {
      alert("Successfully updated Company's Details!");
      setLoader(false);
      if (!pic) {
        history.push("/Home");
      }
    }
  };

  function handleSelect(e) {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    setInfo({ ...info, [name]: parseInt(value) });
    console.log(info);
  }

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
        <Link className="btn btn-dark" to="/Home">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Edit Company Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <hr />
          <h4 className="text-center mb-4">Companys Name:</h4>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter company's name"
              name="company_name"
              value={company_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 className="text-center mb-4">Company's Logo</h4>

            <div className="form-group">
              <Avatar avatarUrl={previewImage} />
              <input
                type="file"
                name="logo"
                onChange={(e) => onInputChange(e)}
                accept="image/*"
              />
            </div>
          </div>
          <h4 className="text-center mb-4">Manager</h4>
          <div>
            <select
              class="form-select"
              aria-label="Default select example"
              name={"manager"}
              onChange={handleSelect}
            >
              <option selected>{selectedManager}</option>
              {workers.map((worker) => (
                <option value={worker.id}>
                  {worker.first_name + " " + worker.second_name}
                </option>
              ))}
            </select>
          </div>

          <h4 className="text-center mb-4">Deputy Director:</h4>
          <div className="form-group">
            <select
              class="form-select"
              aria-label="Default select example"
              name={"deputy_director"}
              onChange={handleSelect}
            >
              <option selected>{selectedDirector}</option>
              {workers.map((worker) => (
                <option value={worker.id}>
                  {worker.first_name + " " + worker.second_name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-dark btn-block">Update Details</button>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyDetails;
