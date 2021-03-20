import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const List = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchItems();
  }, []);
  var toke = "Token " + props.tok + " ";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const fetchItems = async () => {
    const data = await fetch(
      "https://hashmali-backend.herokuapp.com/api/worker/",
      requestOptions
    ).catch((error) => console.error(error));
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };

  if (status != 200) {
    return <h1>failed to get data!</h1>;
  }

  return (
    <div className="container">
      <div className="py-4">
        <Link class="btn btn-warning mr-" to={`/workers/create`}>
          ADD
        </Link>
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
                <td>
                  <Avatar avatarUrl={worker.image} />
                </td>

                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/workers/${worker.id}`}
                  >
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
  );
};

export default List;

/*
import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Avatar from './Avatar'
import EdiText from 'react-editext'

export default function CollapsibleTable(props) {
  const[preview,setPreview]=useState();


  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  
  
  function Row(props) {
  
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    
    return (
      <React.Fragment>
        <TableRow className={classes.root} >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
          <EdiText  type="text" inputProps="first_name" value={row.first_name} onSave={handleSave} />
          </TableCell>
          <TableCell align="left">
          <EdiText  type="text" inputProps="second_name" value={row.second_name} onSave={handleSave} /></TableCell>
          <TableCell align="left">
          <EdiText  type="text" inputProps="id_no" value={row.id_no} onSave={handleSave} /></TableCell>
          <TableCell align="left">
          {!clicked &&  <input type="file" onChange={imageHandler} accept="image/*"/>}
           {clicked && <button onClick={()=>newImage("id_img","1")} >{row.id}</button>}
          
          </TableCell>        
          <TableCell align="left">
          <EdiText  type="text" inputProps="phone" value={row.phone} onSave={handleSave} /></TableCell>
          <TableCell align="left">
          <EdiText  type="text" inputProps="email" value={row.email} onSave={handleSave} /></TableCell>
          <TableCell align="left">
      
          {!clicked2 &&  <input type="file" onChange={imageHandler2} accept="image/*"/>}
           {clicked2 && <button onClick={()=>newImage("image","2")} >submit</button>}

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  More Details:
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Worker Type</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell align="left">Password</TableCell>
                      <TableCell align="left">Address</TableCell>
                      <TableCell align="left">Pay Per Day</TableCell>
                      <TableCell align="left">Driving License</TableCell>
                      <TableCell align="left">Isreal License</TableCell>
                      <TableCell align="left">Isreal License Type</TableCell>
                      <TableCell align="left">Isreal License Expire</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                     <TableRow>
                        <TableCell component="th" scope="row">
                          {row.is_staff}
                        </TableCell>
                        <TableCell>
                        <EdiText  type="text" inputProps="age" value={row.age} onSave={handleSave} /></TableCell>
                        <TableCell align="left">FIX UPDATE PASSWORD</TableCell>
                        <TableCell align="left">
                        <EdiText  type="text" inputProps="address" value={row.address} onSave={handleSave} /></TableCell>
                        <TableCell align="left">
                        <EdiText  type="text" inputProps="pay_per_day" value={row.pay_per_day} onSave={handleSave} /></TableCell>
                        <TableCell align="left">
                        <EdiText  type="text" inputProps="driving_license_img" value={row.driving_license_img} onSave={handleSave} /></TableCell>
                        <TableCell align="left">
                        <EdiText  type="text" inputProps="work_license_israel" value={row.work_license_israel} onSave={handleSave} /></TableCell>
                        <TableCell align="left">
                        <EdiText  type="text" inputProps="work_license_type" value={row.work_license_type} onSave={handleSave} /></TableCell>
                        <TableCell align="left">
                        <EdiText  type="text" inputProps="work_license_expire" value={row.work_license_expire} onSave={handleSave} /></TableCell>
                      </TableRow>                
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
























































  useEffect(()=>{
    fetchItems();
  },[]);
  var toke="Token " + props.tok+" "
  var url2='http://127.0.0.1:8000/api/worker/4/edit/'




  const requestOptions =
 {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
  'Authorization' : toke,}
};
  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")
  const [value, setValue] = useState('')
  const[cover,SetCover]=useState();
  const[cover2,SetCover2]=useState();

  const[clicked,setClicked]=useState(false);
  const[clicked2,setClicked2]=useState(false);

  const imageHandler = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.onload = function(e) {
    }
    reader.readAsDataURL(e.target.files[0]);
    setClicked(true)

    SetCover(e.target.files[0])
    console.log(cover)
}
const imageHandler2 = (e) => {
  console.log(e.target.files[0]);
  let reader = new FileReader();
  reader.onload = function(e) {
  }
  reader.readAsDataURL(e.target.files[0]);
  setClicked2(true)

  SetCover2(e.target.files[0])
  console.log(cover2)
}





  
  const handleSave = (val,inputProps) => {
    console.log('Edited Value -> ', val)
    setValue(val)
    console.log(value) 
    UpdateItems(inputProps,val)
   }


   function put_image(title,button){
    const uploadImage=new FormData();
    alert(title)
    if(button=="1")
    {
      uploadImage.append(title,cover,cover.name);

    }
    if(button=="2")
    {
      uploadImage.append(title,cover2,cover2.name);

    }
    console.log(uploadImage)
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
  
    const newImage=async (title,button)=>
    {
    if(button=="1"){
    setClicked(false)
    const data=await fetch(url2,put_image(title,"1")).catch(error=>console.error(error));
    console.log(JSON.stringify(data))
    const update= await fetchItems()
    }
    if(button=="2"){
    setClicked2(false)
    const data=await fetch(url2,put_image(title,"2")).catch(error=>console.error(error));
    console.log(JSON.stringify(data))
    const update= await fetchItems()
    }
    alert("successfully updated logo!")

  
    
    }
  
  
  
  
  
  

    


   function patch_request(title,name){
    const data=new FormData();
    data.append(title,name);

    let obj={}
    obj[title]=name
      console.log(obj)
      const requestOptions2 =
      {
         method: 'PATCH',
         headers: {'Authorization' : toke,},
         body: data
     };
     console.log(requestOptions2.body)
      return requestOptions2
    }










   
   const UpdateItems= async (title,value)=>{
    const data=await fetch(url2,patch_request(title,value)).catch(error=>console.error(error));
    console.log(JSON.stringify(data))
    const update= await fetchItems()

    };













  const fetchItems= async ()=>{
    const data=await fetch('http://127.0.0.1:8000/api/worker/',requestOptions).catch(error=>console.error(error));
     setStatus(data.status)
    const items=await data.json();
    setItems(items);

    };
    console.log(status)
    if(status==200){
           return (
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell/>
                      <TableCell >Name</TableCell>
                      <TableCell align="left">Last Name</TableCell>
                      <TableCell align="left">ID</TableCell>
                      <TableCell align="left">ID PHOTO</TableCell>
                      <TableCell align="left">PHONE</TableCell>
                      <TableCell align="left">EMAIL</TableCell>
                      <TableCell align="left">Profile</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((row) => (
                      <Row key={row.id} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }


          else{
  return(
  <div>
  <h1>rendering...</h1>
  </div>
  );
  }
}
*/
