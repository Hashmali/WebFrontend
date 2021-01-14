import React,{useState,useEffect} from 'react';
import Nav from "./Nav"
import Avatar from './Avatar'
const source="/images/logo.png"

export default function Company(props) {
  const styles={
    background: "white",
    pic: {
      width: 180,
      height: 180,
      borderRadius: 180 / 2,
      overflow: "hidden",
      borderWidth: 3,
    },



  }
  console.log(props.id)
  useEffect(()=>{
		fetchItems();
	  },[]);
	var toke="Token " + props.token+" "
	var url='http://127.0.0.1:8000/api/worker/'+props.id+'/view/'
	const requestOptions =
 	{
  		method: 'GET',
  		headers: { 'Content-Type': 'application/json',
  		'Authorization' : toke,}
	};
	console.log(JSON.stringify(url))
		const [items,setItems]=useState([])
		const [status,setStatus]=useState("")
		const fetchItems= async ()=>{
		const data=await fetch(url,requestOptions).catch(error=>console.error(error));
	console.log(JSON.stringify(data))

		setStatus(data.status)
		const items=await data.json();
		setItems(items);
		};
		if(status=="200"){
      return(
        <div class="all">
        <Nav/>
      
       <div class="jumbotron text-center" style={styles} >
        <Avatar avatarUrl={source}/>
       
     </div>

     
   <div class="container">
     <div class="row">
       <div class="col-sm-4">
         <h3>Company Manager </h3>
         <p>Lorem ipsum dolor..</p>
       </div>
   
       
       <div class="col-sm-4">
         <h3>Deputy Director</h3>
         <p>Lorem ipsum dolor..</p>
       </div>
       <div class="col-sm-4">
         <h3>Deputy Director</h3>
         <p>Lorem ipsum dolor..</p>
       </div>
   
       
       <div class="col-sm-4">
         <h3>Vehicles</h3>
         <p>Lorem ipsum dolor..</p>
       </div>
     </div>
   </div>
   <div class="jumbotron text-center" style={styles} >
        <img src={items.image} style={styles.pic}/>
        <h6>{"Welcome "+items.first_name+" "+ items.second_name } </h6>
        <h6>{"Your Phone is:  "+items.phone} </h6>
     </div>
   



   </div>
   





      );




    }
    else{
      return (
        <div class="all">
          <Nav/>
         <div class="jumbotron text-center" style={styles} >
          <Avatar avatarUrl={source}/>
     
       </div>
     
     <div class="container">
       <div class="row">
         <div class="col-sm-4">
           <h3>Company Manager </h3>
           <p>Lorem ipsum dolor..</p>
         </div>
     
         
         <div class="col-sm-4">
           <h3>Deputy Director</h3>
           <p>Lorem ipsum dolor..</p>
         </div>
     
     
         
         <div class="col-sm-4">
           <h3>Vehicles</h3>
           <p>Lorem ipsum dolor..</p>
         </div>
       </div>
     </div>
     </div>
     
     
     
     
     
     
     
         )
       


    }
   
  
}

