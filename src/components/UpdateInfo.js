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
  var url2='http://127.0.0.1:8000/api/info/1/update/'


  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")
  const [value, setValue] = useState('What is real? How do you define real?')
  const[cover,SetCover]=useState();

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
    setStatus(data.status)
		};

    const UpdateItems= async (title,value)=>{
      const data=await fetch(url2,put_request(title,value)).catch(error=>console.error(error));
      console.log(JSON.stringify(data))
      };
  
const newImage=()=>
{
console.log(cover)
const data=fetch(url2,put_image()).catch(error=>console.error(error));
console.log(JSON.stringify(data))





}











    if(status=="200"){


return (
  <div class="all">
  
   <div class="jumbotron text-center" style={styles} >
  <div class="testing" style={styles.testing}>
   </div> 
   
   
   <h2>Company's Name:
   <EdiText  type="text" inputProps="company_name" value={items.company_name}  onSave={handleSave} />
   </h2>
    <Avatar avatarUrl={source}/>
    <h2>Company's logo:
    <Avatar avatarUrl={items.logo}/>

    <input type="file" onChange={(e)=>SetCover(e.target.files[0])}/>    
    <button onClick={()=>newImage()} >submit</button>
    </h2>

 </div>

<div class="container">
 <div class="row">
   <div class="col-sm-4">
     <h3>Company's Manager: </h3>
     <h6> Name:
     <EdiText  type="text" inputProps="manager.first_name" value={items.manager.first_name}  onSave={handleSave} />
     </h6>
        <h6>Last Name:
        <EdiText  type="text" inputProps="manager.second_name" value={items.manager.second_name}  onSave={handleSave} />
        </h6>
        <h6>Phone:
        <EdiText  type="text" inputProps="manager.phone" value={items.manager.phone}  onSave={handleSave} />
        </h6>
        <h6>Email:
        <EdiText  type="text" inputProps="manager.email" value={items.manager.email}  onSave={handleSave} /></h6>
        <h6>Address:
        <EdiText  type="text" inputProps="manager.address" value={items.manager.address}  onSave={handleSave} /></h6>
      </div>

   
   <div class="col-sm-4">
     <h3>Deputy Director:</h3>
        <h6>Name:
        <EdiText  type="text" inputProps="deputy_director.first_name" value={items.deputy_director.first_name}  onSave={handleSave} /></h6>
        <h6>Last Name:
        <EdiText  type="text" inputProps="deputy_director.second_name" value={items.deputy_director.second_name}  onSave={handleSave} /></h6>
          <h6>Age:
          <EdiText  type="text" inputProps="deputy_director.age" value={items.deputy_director.age}  onSave={handleSave} /></h6>

        <h6>Phone:
        <EdiText  type="text" inputProps="deputy_director.phone" value={items.deputy_director.phone}  onSave={handleSave} /></h6>
        <h6>Email:
        <EdiText  type="text" inputProps="deputy_director.email" value={items.deputy_director.email}  onSave={handleSave} /></h6>
        <h6>Address:
        <EdiText  type="text"  inputProps="deputy_director.address"  value={items.deputy_director.address}  onSave={handleSave} /></h6>
     </div>
   
   <div class="col-sm-4">
     <h3>Vehicles:</h3>
     {    
      //Need to find a way for this later!!
        items.car.map((car,index)=>
        <div>
        <h6>license number:
        <EdiText  type="text" inputProps="license_no"  value={car.license_no}  onSave={handleSave} /></h6>
        <h6>license due to:
        <EdiText  type="text" inputProps="license_expiry_date"  value={car.license_expiry_date}  onSave={handleSave} /></h6>
        <h6>Bituah due to:
        <EdiText  type="text" inputProps="insurance_expiry_date" value={car.insurance_expiry_date}  onSave={handleSave} /></h6>
        <h6>Bituah till age:[number from 20-70]
        <EdiText  type="text" inputProps="insurance_age" value= {car.insurance_age}  onSave={handleSave} /></h6>
        <h6>Photo:
        <EdiText  type="text"inputProps="image" value= {car.image}  onSave={handleSave} /></h6>

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
  