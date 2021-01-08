import React,{useState,useEffect} from 'react';
import Table from "react-bootstrap/Table";
import RegisterForum from "./RegisterForum"
const mystyle = {
width:100,
hight:50,
marginTop:-600, 


};










function Avatar(props) {
    
  return (
    <img
    width="150" height="100"
      src="https://www.comingsoon.net/wp-content/themes/comingsoon/images/cs_default_image.jpg"
      />
  );
}



function List(props){
  useEffect(()=>{
    fetchItems();
  },[]);
  const requestOptions =
 {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
  'Authorization' : 'Token ceb152feffce94ec5dd5a4bc872ae1e1cea2bcfd '}
};
  const [items,setItems]=useState([])

  const fetchItems= async ()=>{

    const data=await fetch('http://127.0.0.1:8000/api/project/',requestOptions);
    const items=await data.json();
    console.log(items.item);
    setItems(items);
    };

    return(
      <div>
    <RegisterForum tok={props.token}/>


<Table striped bordered hover variant="dark" style={mystyle}>
     <thead>
       <tr>
         <th>id</th>
         <th>property_type</th>
         <th>LastName</th>
         <th>phone</th>
         <th>photo</th>
       </tr>
     </thead>
          <tbody>
     {items.map((item,index)=>(
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
      

     
     
     
      </div>
    );
}
export default  List;

