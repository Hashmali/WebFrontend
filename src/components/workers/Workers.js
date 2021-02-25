import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from '../Avatar'
import Nav from "../Nav"

const List = (props) => {
  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  useEffect(()=>{
    fetchItems();
  },[]);


  
  var toke="Token " + props.token+" "  
  const requestOptions =
 {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
  'Authorization' : toke,}
};





const fetchItems= async ()=>{
  const data=await fetch('http://127.0.0.1:8000/api/worker/',requestOptions).catch(error=>console.error(error));
   setStatus(data.status)
  const items=await data.json();
  setItems(items);
  };


 if(status!= 200){return(<h1>failed to get data!</h1>)}

  return (
<div>
    <Nav/>

    <div className="container">

      <div className="py-4">
        <h1>List Of Workers:</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">ID</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Profile</th>
              <th>Action</th>
              <th scope="col"><Link class="btn btn-warning mr-" to={`/workers/create`}>ADD</Link></th>

            </tr>
          </thead>
          <tbody>
            {items.map((worker, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{worker.first_name}</td>
                <td>{worker.second_name}</td>
                <td>{worker.id_no}</td>
                <td>{worker.phone}</td>
                <td>{worker.email}</td>
                <td><Avatar avatarUrl={worker.image}/></td>

                <td>
                  <Link class="btn btn-primary mr-2" to={`/workers/${worker.id}`}>
                    View  
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/workers/edit/${worker.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    to={`/workers/delete/${worker.id}`}
                  >
                  Delete
               
                  </Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};
export default List;
