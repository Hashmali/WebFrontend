import React, { useState, useEffect } from "react";
import { Link,useHistory, useParams } from "react-router-dom";
import Avatar from '../Avatar'

const EditWorker = (props) => {

let history = useHistory();
const { id } = useParams();
const [status,setStatus]=useState("")
const[previewImage,setPreviewImage]=useState();
const[previewID,setPreviewID]=useState();
const[previewDrive,setPreviewDrive]=useState();
const[pic,setPic]=useState();
const[idPic,setIdPic]=useState();
const[drivePice,setDrivePic]=useState();

 
const imageHandler = (e,name) => {
    let reader = new FileReader();
    reader.onload = function(e) {
        if(name=="image"){setPreviewImage(e.target.result);}
        if(name=="id_img"){setPreviewID(e.target.result);}
        if(name=="driving_license_img"){setPreviewDrive(e.target.result);}
    }
    reader.readAsDataURL(e.target.files[0]);
    if(name=="image"){setPic(e.target.files[0])}
    if(name=="id_img"){setIdPic(e.target.files[0])}
    if(name=="driving_license_img"){setDrivePic(e.target.files[0])}
      
  }


const [worker, setWorker] = useState({
    first_name: "",
    second_name: "",
    password:"",
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
  const {  first_name, second_name, password, phone, id_no,id_img,driving_license_img,
            work_license_israel,work_license_type,work_license_expire,age,address,
            pay_per_day,email,image,is_admin
        } = worker;
  const onInputChange = e => {
//  onChange={(e)=>setImage(e.target.files[0])}

    if(e.target.type=="file"){
    alert(e.target.name)
    setWorker({ ...worker, [e.target.name]: e.target.files[0] });
    imageHandler(e,e.target.name)
    }
    setWorker({ ...worker, [e.target.name]: e.target.value });
  
};

  var toke="Token " + props.token+" "
  var url="https://hashmali-backend.herokuapp.com/api/worker/" + id+"/edit/"  


    const requestOptions =
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : toke,}
    };

    function patch_request(){
        const newData=new FormData();
        /* 
        first_name, second_name, password, phone, id_no,id_img,driving_license_img,
        work_license_israel,work_license_type,work_license_expire,age,address,
        pay_per_day,email,image,is_admin
        */
        newData.append('first_name',worker.first_name);
        newData.append('second_name',worker.second_name);
        newData.append('password',worker.password);
        newData.append('password2',worker.password);
        newData.append('phone',worker.phone);
        newData.append('id_no',worker.id_no);
        newData.append('work_license_israel',worker.work_license_israel);
        newData.append('work_license_type',worker.work_license_type);
        newData.append('work_license_expire',worker.work_license_expire);
        newData.append('age',worker.age);
        newData.append('address',worker.address);
        newData.append('pay_per_day',worker.pay_per_day);
        newData.append('email',worker.email);
        newData.append('is_admin',worker.is_admin);
        if(pic){newData.append('image',pic,pic.name)}
        if(drivePice){newData.append('driving_license_img',drivePice,drivePice.name)}
        if(idPic){newData.append('id_img',idPic,idPic.name)}
     
    
         const requestOptions2 =
          {
             method: 'PATCH',
             headers: {'Authorization' : toke,},
             body: newData,
         };
          return requestOptions2
        }
    
  
  
  useEffect(() => {
    loadWorker();
  }, []);

  const loadWorker = async () => {
    const data=await fetch(url,requestOptions).catch(error=>console.error(error));
    setStatus(data.status)
    const worker_data=await data.json();
    setWorker(worker_data);
    setPreviewImage(worker_data.image)
    setPreviewID(worker_data.id_img)
    setPreviewDrive(worker_data.driving_license_img)
  };
  console.log(status)



  const onSubmit = async e => {
    e.preventDefault();
    const data=await fetch(url,patch_request()).catch(error=>console.error(error));
    if(data.status!=200){
      alert(data.status)
    }
    
    const update= await loadWorker()
    if(data.status==200){
      alert("Succesffully updated worker!")
     history.push("/workers_management");
    }
  };




  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
      <Link className="btn btn-dark" to="/workers_management">
        Back to Workers
      </Link>

        <h2 className="text-center mb-4">Edit Worker Details:</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker first name"
              name="first_name"
              value={first_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker last name"
              name="second_name"
              value={second_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter worker password"
              name="password"
              value={password}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker phone number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker email"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <Avatar avatarUrl={previewImage}/>

            <input
              type="file"
              name="image"              
              onChange={e => onInputChange(e)}
              accept="image/*"
            />

          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="is admin?"
              name="is_admin"
              value={is_admin}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker age"
              name="age"
              value={age}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker address"
              name="address"
              value={address}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker pay per day"
              name="pay_per_day"
              value={pay_per_day}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter worker id"
              name="id_no"
              value={id_no}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <Avatar avatarUrl={previewID}/>
            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Upload worker image"
              name="id_img"
              onChange={e => onInputChange(e)}
              accept="image/*"
            />
          </div>
          <div className="form-group">   
          <Avatar avatarUrl={previewDrive}/>
            <input  
              type="file"
              className="form-control form-control-lg"
              placeholder="Upload worker driving license image"
              name="driving_license_img"
              onChange={e => onInputChange(e)}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Upload worker work license israel"
              name="work_license_israel"
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Upload worker work license expire date"
              name="work_license_expire"
              value={work_license_expire}
              onChange={e => onInputChange(e)}
            />
          </div>
         <button className="btn btn-dark btn-block">Update Worker</button>
        </form>
      </div>
    </div>
  );
};

export default EditWorker;
