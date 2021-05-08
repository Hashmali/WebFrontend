import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import Avatar from "../Avatar";
const EditWorker = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [previewID, setPreviewID] = useState();
  const [previewDrive, setPreviewDrive] = useState();
  const [pic, setPic] = useState();
  const [idPic, setIdPic] = useState();
  const [drivePic, setDrivePic] = useState();
  const [loader, setLoader] = useState(false);
  const [picUrl, setPicUrl] = useState("");
  const [idPicUrl, setIdPicUrl] = useState();
  const [drivePicUrl, setDrivePicUrl] = useState();

  const submitDriveImage = () => {
    const newData = new FormData();
    newData.append("driving_license_img", drivePicUrl);
    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    setLoader(true);
    fetch(url, requestOptions2)
      .then((res) => res.json())
      .then((image) => {
        setDrivePicUrl(image.url);
      })
      .catch((error) => alert("error while updating..."));
    setLoader(false);
  };

  const submitIDImage = () => {
    const newData = new FormData();
    newData.append("id_img", idPicUrl);
    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    setLoader(true);
    fetch(url, requestOptions2)
      .then((res) => res.json())
      .then((image) => {
        setIdPicUrl(image.url);
      })
      .catch((error) => alert("error while updating..."));
    setLoader(false);
  };

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
  const handleDriveImageUpload = () => {
    console.log(pic);
    const data = new FormData();
    data.append("file", drivePic);
    data.append("upload_preset", "hashmaliProject");
    data.append("cloud_name", "dj42j4pqu");
    setLoader(true);
    fetch(url2, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((image) => {
        setDrivePicUrl(image.url);
      })
      .catch((error) => alert("error while uploading..."));
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

  const handleIdImageUpload = () => {
    console.log(pic);
    const data = new FormData();
    data.append("file", idPic);
    data.append("upload_preset", "hashmaliProject");
    data.append("cloud_name", "dj42j4pqu");
    setLoader(true);
    fetch(url2, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((image) => {
        setIdPicUrl(image.url);
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
      if (name == "id_img") {
        setPreviewID(e.target.result);
      }
      if (name == "driving_license_img") {
        setPreviewDrive(e.target.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (name == "image") {
      setPic(e.target.files[0]);
    }
    if (name == "id_img") {
      setIdPic(e.target.files[0]);
    }
    if (name == "driving_license_img") {
      setDrivePic(e.target.files[0]);
    }
  };

  const [worker, setWorker] = useState({
    first_name: "",
    second_name: "",
    password: "",
    phone: "",
    id_no: "",
    id_img: "",
    driving_license_img: "",
    work_license_israel: "",
    work_license_type: "",
    work_license_expire: "",
    age: "",
    address: "",
    pay_per_day: "",
    email: "",
    image: "",
    is_admin: "",
  });
  const {
    first_name,
    second_name,
    password,
    phone,
    id_no,
    id_img,
    driving_license_img,
    work_license_israel,
    work_license_type,
    work_license_expire,
    age,
    address,
    pay_per_day,
    email,
    image,
    is_admin,
  } = worker;
  const onInputChange = (e) => {
    //  onChange={(e)=>setImage(e.target.files[0])}

    if (e.target.type == "file") {
      alert(e.target.name);
      setWorker({ ...worker, [e.target.name]: e.target.files[0] });
      imageHandler(e, e.target.name);
    }
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/worker/" + id + "/edit/";
  var url2 = "https://api.cloudinary.com/v1_1/dj42j4pqu/image/upload";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  function patch_request() {
    const newData = new FormData();
    /* 
        first_name, second_name, password, phone, id_no,id_img,driving_license_img,
        work_license_israel,work_license_type,work_license_expire,age,address,
        pay_per_day,email,image,is_admin
        */
    newData.append("first_name", worker.first_name);
    newData.append("second_name", worker.second_name);

    if (password) {
      newData.append("password", worker.password);
      newData.append("password2", worker.password);
    }

    newData.append("phone", worker.phone);
    newData.append("id_no", worker.id_no);
    newData.append("work_license_israel", worker.work_license_israel);
    newData.append("work_license_type", worker.work_license_type);
    newData.append("work_license_expire", worker.work_license_expire);
    newData.append("age", worker.age);
    newData.append("address", worker.address);
    newData.append("pay_per_day", worker.pay_per_day);
    newData.append("email", worker.email);
    newData.append("is_admin", worker.is_admin);
    if (pic) {
      handleImageUpload();
    }
    if (idPic) {
      handleIdImageUpload();
    }
    if (drivePic) {
      handleDriveImageUpload();
    }

    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions2;
  }

  useEffect(() => {
    if (props.token) {
      loadWorker();
    }
  }, [props.token]);

  useEffect(() => {
    if (picUrl) {
      submitImage();
      loadWorker();
    }
  }, [picUrl]);

  useEffect(() => {
    if (idPicUrl) {
      submitIDImage();
      loadWorker();
    }
  }, [idPicUrl]);

  useEffect(() => {
    if (drivePicUrl) {
      submitDriveImage();
      loadWorker();
    }
  }, [drivePicUrl]);

  const loadWorker = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);

    const worker_data = await data.json();
    setWorker(worker_data);
    setPreviewImage(worker_data.image);
    setPreviewID(worker_data.id_img);
    setPreviewDrive(worker_data.driving_license_img);
  };
  console.log(status);

  const onSubmit = async (e) => {
    e.preventDefault();
    //Checking if password and phone are empty

    //Israeli phone number
    var regex = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
    //Checking if phone number is valid
    if (!regex.test(phone)) {
      alert("please enter a valid phone number...");
      return;
    }

    if (!is_admin) {
      alert("please  set user type...");
      return;
    }
    if (!email) {
      alert("please  enter email...");
      return;
    }
    if (!age) {
      alert("please  enter worker age...");
      return;
    }

    if (id_no) {
      if (id_no.length > 10) {
        alert("ID has more than 10 digits.");
        return;
      }
    }

    setLoader(true);
    const data = await fetch(url, patch_request()).catch((error) =>
      console.error(error)
    );
    if (data.status != 200) {
      alert(data.status);
    }
    setLoader(false);

    const update = await loadWorker();
    if (data.status == 200) {
      alert("Successfully updated worker!");
      history.push("/workers_management");
    }
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link className="btn btn-dark" to="/workers_management">
          Back to Workers
        </Link>

        <h2 className="text-center mb-4">Edit Worker Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Worker First Name
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker first name"
              name="first_name"
              value={first_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Worker Last Name
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker last name"
              name="second_name"
              value={second_name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Password
            </Label>

            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter worker password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Phone Number
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker phone number"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Email
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker email"
              name="email"
              value={email}
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
          <div className="form-group">
            <Label color="black" as="a" basic>
              Is an admin?
            </Label>
            <select
              className="form-control form-control-lg"
              name="is_admin"
              value={is_admin}
              onChange={(e) => onInputChange(e)}
            >
              <option>Choosing</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              age
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker age"
              name="age"
              value={age}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              address
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker address"
              name="address"
              value={address}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Pay per day
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker pay per day"
              name="pay_per_day"
              value={pay_per_day}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Id
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker id"
              name="id_no"
              value={id_no}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Upload Id image
            </Label>

            <Avatar avatarUrl={previewID} />
            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Upload worker image"
              name="id_img"
              onChange={(e) => onInputChange(e)}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <Avatar avatarUrl={previewDrive} />
            <Label color="black" as="a" basic>
              Upload driving license image
            </Label>

            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Upload worker driving license image"
              name="driving_license_img"
              onChange={(e) => onInputChange(e)}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Israel Work license
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Upload worker work license israel"
              name="work_license_israel"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Israel Work license due date
            </Label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Upload worker work license expire date"
              name="work_license_expire"
              value={work_license_expire}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-dark btn-block">Update Worker</button>
        </form>
      </div>
    </div>
  );
};

export default EditWorker;
