import React, { useState, useEffect } from "react";
import { Link,useHistory, useParams } from "react-router-dom";
import Avatar from '../Avatar'

const Worker = (props) => {

  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")
  const { id } = useParams();
  let history = useHistory();



   useEffect(()=>{
    fetchItems();
     },[]);

    var toke="Token " + props.token+" "  
    var url="http://127.0.0.1:8000/api/worker/" + id+"/edit/"  

     const requestOptions =
 {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
  'Authorization' : toke,}
};

const requestOptions2 =
{
 method: 'DELETE',
 headers: {'Authorization' : toke,}
};

const deleteWorker = async (id) => {  
const data=await fetch(url,requestOptions2).catch(error=>console.error(error));
if(data.status==204){
  alert("Succesffully deleted worker!")
 history.push("/workers_management");
}

};







const fetchItems= async ()=>{
const data=await fetch(url,requestOptions).catch(error=>console.error(error));
   setStatus(data.status)
  const items=await data.json();
  setItems(items);
  };
  console.log(status)




  return (
    <div className="container py-4">
      <h1 className="display-5">Are you sure you want to delete {items.first_name+" "+items.second_name}?</h1>

      <Link className="btn btn-primary" to="/workers_management">
        Cancel
      </Link>
      <button 
      className="btn btn-danger"
      style={{marginLeft:"20px"}}
      onClick={() => deleteWorker(id)}>
      Confirm Delete</button>

      <h1 className="display-5"></h1>
      <hr />
      <ul className="list-group w-50">
      <li className="list-group-item">Profile: <Avatar avatarUrl={items.image}/></li>
      <li className="list-group-item">Email: {items.email}</li>
      <li className="list-group-item">phone: {items.phone}</li>
      <li className="list-group-item">ID: {items.id_no}</li>
      <li className="list-group-item">ID image: <Avatar avatarUrl={items.id_img}/></li>
      <li className="list-group-item">Type: {items.is_admin}</li>
      <li className="list-group-item">Age: {items.age}</li>
      <li className="list-group-item">Address: {items.address}</li>
      <li className="list-group-item">Pay Per Day: {items.pay_per_day}</li>
      <li className="list-group-item">Driving License Image: {items.driving_license_img}</li>
      <li className="list-group-item">Work License Image: {items.work_license_israel}</li>
      <li className="list-group-item">Work License Type: {items.work_license_type}</li>
      <li className="list-group-item">Work License Expire: {items.work_license_expire}</li>







      </ul>
    </div>
  );
};

export default Worker;

