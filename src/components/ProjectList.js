import React,{useState,useEffect} from 'react';
import Table from "react-bootstrap/Table";
import TableScrollbar from 'react-table-scrollbar';
import File from "./ProjectFiles"
function Avatar(props) {
  let source=props.avatarUrl  
if(!source){
source="/images/NoProjectImage.jpg"
}
  return (
    <img
    width="150" height="100"
      src={source}
      />
  );
}



function List(props){
  useEffect(()=>{
    fetchItems();
  },[]);
  var toke="Token " + props.tok+" "

  const requestOptions =
 {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
  'Authorization' : toke,}
};
  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")

  const fetchItems= async ()=>{

    const data=await fetch('http://127.0.0.1:8000/api/project/',requestOptions).catch(error=>console.error(error));
     setStatus(data.status)
    const items=await data.json();
    console.log(status);
    setItems(items);

  };

    if(status=="200"){
      console.log("here2")

      return(
  <div>
<File arr={items}/>

    <TableScrollbar  height="500px">
  <Table striped bordered hover variant="dark" >
     <thead>
       <tr>
         <th>Project ID</th>
          <th>Contractor</th>
         <th>Contractor Phone</th>
         <th>Contractor Email</th>
         <th>Architect</th>
         <th>Architect Phone</th>
         <th>Architect Email</th>
         <th>City</th>
         <th>Street</th>
         <th>Project Code</th>
         <th>Property Number</th>
         <th>Owner</th>
         <th>Owner Phone</th>
         <th>Owner Email</th>
         <th>Photo</th>
        </tr>
      </thead>
      <tbody>
      {
   
     items.map((item,index)=>(
       <tr key={item.phone}>
         <td>{item.id}</td>
         <td>{item.contractor_first_name+" "+item.contractor_second_name}</td>
         <td>{item.contractor_phone_no}</td>
         <td>{item.contractor_email}</td>
         <td>{item.architect_first_name+" "+item.architect_second_name}</td>
         <td>{item.architect_phone_no}</td>
         <td>{item.architect_email}</td>
         <td>{item.city}</td>
         <td>{item.street}</td>
         <td>{item.project_code}</td>
         <td>{item.property_no}</td>
         <td>{item.owner_first_name+" "+item.owner_second_name}</td>
         <td>{item.owner_phone_no}</td>
         <td>{item.owner_email}</td>
         <td><Avatar avatarUrl={items[1].file[0].file1}/></td>       
       </tr>
     ))}
      </tbody>
   </Table>
   </TableScrollbar>
<div id="Another table">
<TableScrollbar  height="500px">
    <Table striped bordered hover variant="dark" >
     <thead>
       <tr>
         <th>File ID</th>
          <th>File Name</th>
         <th>Image</th>
         <th>Uploaded At</th>
         <th>File Code</th>
        </tr>
      </thead>
      <tbody>
{
 items.map((item,index)=>
 <p> 
 {item.file.map((sub)=>
<tr>
  <td>{sub.id}</td>
  <td>{sub.project_code}</td>
  <td>{sub.name}</td>
  <td>{sub.uploaded_at}</td>
  <td><Avatar avatarUrl={sub.file1}/>{}</td>
</tr>
  )}
</p>
 
 )
}
</tbody>
</Table>
</TableScrollbar>


</div>





</div>





      );
     }
  else{
    console.log("here")
    return(<h1>You do not have permission to perform this action</h1>);
  }

}
export default  List;

