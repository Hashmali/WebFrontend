import React,{useState,useEffect} from 'react';
import Avatar from './Avatar'
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
    }
  console.log(props.id)
  useEffect(()=>{
		fetchItems();
//    fetchCars();

  
  },[]);
	var toke="Token " + props.token+" "
	var url='http://127.0.0.1:8000/api/info/1/'
  var url2='http://127.0.0.1:8000/api/info/1/car'

	const requestOptions =
 	{
  		method: 'GET',
  		headers: { 'Content-Type': 'application/json',
  		'Authorization' : toke,}
	};
  

    const [items,setItems]=useState([])
		const [status,setStatus]=useState("")




     const fetchItems= async ()=>{
		const data=await fetch(url,requestOptions).catch(error=>console.error(error));
    console.log(JSON.stringify(data))
		const items=await data.json();
		setItems(items);
    setStatus(data.status)
		};







    if(status=="200"){


return (
  <div class="all">
  
   <div class="jumbotron text-center" style={styles} >
  <div class="testing" style={styles.testing}>
   </div> 
   
   
   <h2>Company's Name:{items.company_name}</h2>
    <Avatar avatarUrl={source}/>
    <h2>Company's logo:{items.logo}</h2>

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

/*
    


*/
  