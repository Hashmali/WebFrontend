import React,{useState,useEffect} from 'react';
import Table from "react-bootstrap/Table";
import TableScrollbar from 'react-table-scrollbar';

const mystyle = {
};










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

    const data=await fetch('http://127.0.0.1:8000/api/worker/',requestOptions).catch(error=>console.error(error));
     setStatus(data.status)
    const items=await data.json();
    console.log(status);
    setItems(items);
    };

    if(status=="200"){
      console.log("here2")

      return(
      <div>
    <TableScrollbar  height="500px">

<Table striped bordered hover variant="light" style={mystyle}>
     <thead>
       <tr>
         <th>#</th>
         <th>Name</th>
         <th>LastName</th>
         <th>phone</th>
         <th>photo</th>
       </tr>
     </thead>

          <tbody>
     
     {
     
     items.map((item,index)=>(
       <tr key={item.phone}>
         <td>{index}</td>
         <td>{item.first_name}</td>
         <td>{item.second_name}</td>
         <td>{item.phone}</td>
         <td><Avatar avatarUrl={item.image}/></td>
       </tr>
     ))}
      </tbody>

   </Table>
   </TableScrollbar>
       
     
      </div>
    );
  }
  else{
    console.log("here")
    return(<h1>You do not have permission to perform this action</h1>);
  }

}
export default  List;

