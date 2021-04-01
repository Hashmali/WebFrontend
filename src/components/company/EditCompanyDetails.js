import { ListItemSecondaryAction } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "../Loader";
import Avatar from "../Avatar";

const EditCompanyDetails = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [pic, setPic] = useState();
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
    if (pic) {
      newData.append("logo", pic, pic.name);
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
      loadDetails();
      loadWorkers();
      getSelected();
    }
  }, [props.token]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const data = await fetch(url, patch_request()).catch((error) =>
      console.error(error)
    );
    if (data.status != 200) {
      setLoader(false);
      alert(data.status);
    }

    const update = await loadDetails();
    if (data.status == 200) {
      alert("Succesffully updated Company's Details!");
      setLoader(false);

      history.push("/Home");
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
    return <Loader />;
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

/*import React,{useState,useEffect} from 'react';
import Avatar from '../Avatar'
import EdiText from 'react-editext'

const source="/images/logo.png"

export default function Info(props) {
  
  const styles={
    background: "white",
    pic: {
      width: 180,
      height: 180,
      borderRadius: 180 / 2,
      overflow: "hidden",
      borderWidth: 3,
    },
    move:{
      marginLeft:150
      
    },
    movesName:{
      marginLeft:100
      
    }


    }
  console.log(props.id)
  useEffect(()=>{
		fetchItems();
//    fetchCars();

  
  },[]);
	var toke="Token " + props.token+" "
	var url='http://127.0.0.1:8000/api/info/2/'
  var url2='http://127.0.0.1:8000/api/info/2/update/'


  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")
  const [value, setValue] = useState('What is real? How do you define real?')
  const[cover,SetCover]=useState();
  const[preview,setPreview]=useState();
  const[clicked,setClicked]=useState(false);


 
  const imageHandler = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.onload = function(e) {
      setPreview(e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
    setClicked(true)

    SetCover(e.target.files[0])
    console.log(cover)
}
 



  const requestOptions =
 	{
  		method: 'GET',
  		headers: { 'Content-Type': 'application/json',
  		'Authorization' : toke,}
	};

function put_request(title,name){
  let obj={}
  obj['company_name']=items.company_name
  obj[title]=name
console.log(obj)
    const requestOptions2 =
    {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json','Authorization' : toke,},
       body: JSON.stringify(obj)
   };
   console.log(requestOptions2.body)
    return requestOptions2
  }

  function put_image(){
    const uploadImage=new FormData();
    uploadImage.append('logo',cover,cover.name);
    console.log(uploadImage)
      const requestOptions3 =
      {
         method: 'PATCH',
         headers: {'Authorization' : toke,},
         body: uploadImage
     };
     console.log(requestOptions3.body)
      return requestOptions3
    }
  

 

    const handleSave = (val,inputProps) => {
      console.log('Edited Value -> ', val)
      setValue(val)
       UpdateItems(inputProps,val)
     }

    const fetchItems= async ()=>{
		const data=await fetch(url,requestOptions).catch(error=>console.error(error));
    console.log(JSON.stringify(data))
		const items=await data.json();
		setItems(items);
    SetCover(items.logo)
    setPreview(items.logo)

    setStatus(data.status)
		};

    const UpdateItems= async (title,value)=>{
      const data=await fetch(url2,put_request(title,value)).catch(error=>console.error(error));
      console.log(JSON.stringify(data))
      };
  
const newImage=async ()=>
{
 setClicked(false)
alert("successfully updated logo!")
const data=await fetch(url2,put_image()).catch(error=>console.error(error));
console.log(JSON.stringify(data))
const update= await fetchItems()

}


    if(status=="200"){
      

return (



  


  <div class="all">
  
   <div class="jumbotron text-center" style={styles} >
  <div class="testing" style={styles.testing}>
   </div> 
   
   
   <h2>Company's Name:</h2>
 <h2 style={styles.movesName}>
   <EdiText  type="text" inputProps="company_name" value={items.company_name}   onSave={handleSave} />
</h2>
<div class="container" style={styles.move}>
    <h2>Current Logo</h2>
    <Avatar avatarUrl={preview}/>
    <input type="file" onChange={imageHandler} accept="image/*"/>    
    
    {clicked && <button onClick={()=>newImage()} >submit</button>}

    </div>



 </div>

<div class="container">
 <div class="row">
   
 <div class="col-sm-4">
     <h3>Company's Manager: </h3>
     <h6>Name:{items.manager.first_name}</h6>
        <h6>Last Name:{items.manager.second_name}</h6>
        <h6>Phone:{items.manager.phone}</h6>
        <h6>Email:{items.manager.email}</h6>
        <h6>Address:{items.manager.address}</h6>
   </div>

   
   <div class="col-sm-4">
     <h3>Deputy Director:</h3>
        <h6>Name:{items.deputy_director.first_name}</h6>
        <h6>Last Name:{items.deputy_director.second_name}</h6>
        <h6>Age:{items.deputy_director.age}</h6>
        <h6>Phone:{items.deputy_director.phone}</h6>
        <h6>Email:{items.deputy_director.email}</h6>
        <h6>Address:{items.deputy_director.address}</h6>  
   </div>
   <div class="col-sm-4">
     <h3>Vehicles:</h3>
     {    
      
        items.car.map((car,index)=>
        <div>
        <h6>license number:{car.license_no}</h6>
        <h6>license due to:{car.license_expiry_date}</h6>
        <h6>Bituah due to:{car.insurance_expiry_date}</h6>
        <h6>Bituah till age:[number from 20-70] {car.insurance_age}</h6>
        <h6>Photo:{car.image}</h6>
        </div>     
        )
     }
       <select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
  
  
  
   </div>



   




 </div>
</div>
</div>   
   );


    }

    else{
      return (
        <div class="all">
         <div class="jumbotron text-center" style={styles} >
          <Avatar avatarUrl={source}/>
     
       </div>
     
     <div class="container">
       <div class="row">
         <div class="col-sm-4">
           <h3>Company Manager </h3>
         </div>
     
         
         <div class="col-sm-4">
           <h3>Deputy Director</h3>
         </div>
     
     
         
         <div class="col-sm-4">
           <h3>Vehicles</h3>
         </div>
       </div>
     </div>
     </div>   
         );
  
}
}

  


*/
