import React,{useState,useEffect} from 'react';
import Avatar from './Avatar'
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
    const [value, setValue] = useState('What is real? How do you define real?')

    const handleSave = val => {
      console.log('Edited Value -> ', val)
      setValue(val)
      //add put request
     }

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
   
   
   <h2>Company's Name:
   <EdiText  type="text" value={items.company_name}  onSave={handleSave} />
   </h2>
    <Avatar avatarUrl={source}/>
    <h2>Company's logo:
    <EdiText  type="text" value={items.logo}  onSave={handleSave} />
    </h2>

 </div>

<div class="container">
 <div class="row">
   <div class="col-sm-4">
     <h3>Company's Manager: </h3>
     <h6> Name:
     <EdiText  type="text" value={items.manager.first_name}  onSave={handleSave} />
     </h6>
        <h6>Last Name:
        <EdiText  type="text" value={items.manager.second_name}  onSave={handleSave} />
        </h6>
        <h6>Phone:
        <EdiText  type="text" value={items.manager.phone}  onSave={handleSave} />
        </h6>
        <h6>Email:
        <EdiText  type="text" value={items.manager.email}  onSave={handleSave} /></h6>
        <h6>Address:
        <EdiText  type="text" value={items.manager.address}  onSave={handleSave} /></h6>
      </div>

   
   <div class="col-sm-4">
     <h3>Deputy Director:</h3>
        <h6>Name:
        <EdiText  type="text" value={items.deputy_director.first_name}  onSave={handleSave} /></h6>
        <h6>Last Name:
        <EdiText  type="text" value={items.deputy_director.second_name}  onSave={handleSave} /></h6>
          <h6>Age:
          <EdiText  type="text" value={items.deputy_director.age}  onSave={handleSave} /></h6>

        <h6>Phone:
        <EdiText  type="text" value={items.deputy_director.phone}  onSave={handleSave} /></h6>
        <h6>Email:
        <EdiText  type="text" value={items.deputy_director.email}  onSave={handleSave} /></h6>
        <h6>Address:
        <EdiText  type="text" value={items.deputy_director.address}  onSave={handleSave} /></h6>
     </div>
   
   <div class="col-sm-4">
     <h3>Vehicles:</h3>
     {    
      //Need to find a way for this later!!
        items.car.map((car,index)=>
        <div>
        <h6>license number:
        <EdiText  type="text" value={car.license_no}  onSave={handleSave} /></h6>
        <h6>license due to:
        <EdiText  type="text" value={car.license_expiry_date}  onSave={handleSave} /></h6>
        <h6>Bituah due to:
        <EdiText  type="text" value={car.insurance_expiry_date}  onSave={handleSave} /></h6>
        <h6>Bituah till age:[number from 20-70]
        <EdiText  type="text" value= {car.insurance_age}  onSave={handleSave} /></h6>
        <h6>Photo:
        <EdiText  type="text" value= {car.image}  onSave={handleSave} /></h6>

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
  