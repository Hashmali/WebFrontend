import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import Avatar from "../Avatar";

const EditProject = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [pic, setPic] = useState();
  const [picUrl, setPicUrl] = useState("");
  const [loader, setLoader] = useState(false);

  const submitImage = () => {
    const newData = new FormData();
    newData.append("building_image", picUrl);
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
      if (name == "building_image") {
        setPreviewImage(e.target.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (name == "building_image") {
      setPic(e.target.files[0]);
    }
  };

  const [project, setProject] = useState({
    project_code: "",
    property_type: "",
    address_link: "",
    city: "",
    street: "",
    property_no: "",
    owner_first_name: "",
    owner_second_name: "",
    owner_phone_no: "",
    owner_email: "",
    contractor_first_name: "",
    contractor_second_name: "",
    contractor_phone_no: "",
    contractor_email: "",
    architect_first_name: "",
    architect_second_name: "",
    architect_phone_no: "",
    architect_email: "",
    building_image: "",
    progress: "",
  });
  const {
    project_code,
    property_type,
    address_link,
    city,
    street,
    property_no,
    owner_first_name,
    owner_second_name,
    owner_phone_no,
    owner_email,
    contractor_first_name,
    contractor_second_name,
    contractor_phone_no,
    contractor_email,
    architect_first_name,
    architect_second_name,
    architect_phone_no,
    architect_email,
    building_image,
    progress,
  } = project;

  const onInputChange = (e) => {
    //  onChange={(e)=>setImage(e.target.files[0])}

    if (e.target.type == "file") {
      alert(e.target.name);
      setProject({ ...project, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/project/" + id + "/manage/";
  var url2 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  function patch_request() {
    const newData = new FormData();
    /* 
           project_code, property_type, address_link, city, street,property_no,
            owner_first_name,owner_second_name,owner_phone_no,owner_email,
            contractor_first_name,contractor_second_name,contractor_phone_no,contractor_email,
            architect_first_name,architect_second_name,architect_phone_no,architect_email,building_image
        */
    newData.append("project_code", project.project_code);
    newData.append("property_type", project.property_type);
    newData.append("address_link", project.address_link);
    newData.append("city", project.city);

    newData.append("owner_first_name", project.owner_first_name);
    newData.append("owner_second_name", project.owner_second_name);
    newData.append("owner_phone_no", project.owner_phone_no);
    newData.append("owner_email", project.owner_email);

    newData.append("contractor_first_name", project.contractor_first_name);
    newData.append("contractor_second_name", project.contractor_second_name);
    newData.append("contractor_phone_no", project.contractor_phone_no);
    newData.append("contractor_email", project.contractor_email);

    newData.append("architect_first_name", project.architect_first_name);
    newData.append("architect_second_name", project.architect_second_name);
    newData.append("architect_phone_no", project.architect_phone_no);
    newData.append("architect_second_name", project.architect_email);
    newData.append("progress", project.progress);

    if (pic) {
      handleImageUpload();
    }

    const requestOptions2 = {
      method: "PUT",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions2;
  }

  useEffect(() => {
    if (props.token) {
      loadProject();
    }
  }, [props.token]);

  useEffect(() => {
    if (picUrl) {
      submitImage();
      loadProject();
    }
  }, [picUrl]);

  const loadProject = async () => {
    setLoader(true);

    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);

    const project_data = await data.json();
    setProject(project_data);
    setPreviewImage(project_data.building_image);
    //setPreviewID(project_data.id_img)
    // setPreviewDrive(project_data.driving_license_img)
  };
  console.log(status);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const data = await fetch(url, patch_request()).catch((error) =>
      console.error(error)
    );
    if (data.status != 200) {
      alert(data.status);
    }
    setLoader(false);

    const update = await loadProject();
    if (data.status == 200) {
      alert("Successfully updated project!");
      //history.push("/projects");
    }
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link className="btn btn-dark" to="/projects">
          Back to Projects
        </Link>

        <h2 className="text-center mb-4">Edit Project Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <hr />
          <h4 className="text-center mb-4">Project</h4>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Project Code
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter project code"
              name="project_code"
              value={project_code}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 className="text-center mb-4">Property</h4>
            <Label color="black" as="a" basic>
              Property Type
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter property type"
              name="property_type"
              value={property_type}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Property Number
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter property number"
              name="property_no"
              value={property_no}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Address
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter address"
              name="address_link"
              value={address_link}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              City
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter city name"
              name="city"
              value={city}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Street
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter street name"
              name="street"
              value={street}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <h4 className="text-center mb-4">Owner</h4>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Owner Name
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter owner first name "
              name="owner_first_name"
              value={owner_first_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Owner Last Name
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter owner last name "
              name="owner_second_name"
              value={owner_second_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Owner Phone Number
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter owner phone number"
              name="owner_phone_no"
              value={owner_phone_no}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Owner Email
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter owner email"
              name="owner_email"
              value={owner_email}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <h4 className="text-center mb-4">Contractor</h4>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Contractor Name
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter contractor first name "
              name="contractor_first_name"
              value={contractor_first_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Contractor Last Name
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter contractor last name "
              name="contractor_second_name"
              value={contractor_second_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Contractor Phone
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter contractor phone number"
              name="contractor_phone_no"
              value={contractor_phone_no}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Contractor Email
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter contractor email"
              name="contractor_email"
              value={contractor_email}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <h4 className="text-center mb-4">Architect</h4>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Architect Name
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter architect first name "
              name="architect_first_name"
              value={architect_first_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Architect Last Name
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter architect last name "
              name="architect_second_name"
              value={architect_second_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Architect Phone
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter architect phone number"
              name="architect_phone_no"
              value={architect_phone_no}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Architect Email
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter architect email"
              name="architect_email"
              value={architect_email}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Project Progress?
            </Label>

            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Update Project progress"
              name="progress"
              value={progress}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Avatar avatarUrl={previewImage} />
            <Label color="black" as="a" basic>
              Upload project Image
            </Label>

            <input
              type="file"
              name="building_image"
              onChange={(e) => onInputChange(e)}
              accept="image/*"
            />
          </div>

          <button className="btn btn-dark btn-block">Update Project</button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
