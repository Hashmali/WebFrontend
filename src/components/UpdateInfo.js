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
    move:{
      marginLeft:150
      
    },
    movesName:{
      marginLeft:100
      
    }


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
  const[preview,setPreview]=useState();
  const[clicked,setClicked]=useState(false);


 
  const imageHandler = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.onload = function(e) {
      setPreview(e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
    setClicked(true)

    SetCover(e.target.files[0])
    console.log(cover)
}
 



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
    SetCover(items.logo)
    setPreview(items.logo)

    setStatus(data.status)
		};

    const UpdateItems= async (title,value)=>{
      const data=await fetch(url2,put_request(title,value)).catch(error=>console.error(error));
      console.log(JSON.stringify(data))
      };
  
const newImage=async ()=>
{
 setClicked(false)
alert("successfully updated logo!")
const data=await fetch(url2,put_image()).catch(error=>console.error(error));
console.log(JSON.stringify(data))
const update= await fetchItems()

}


    if(status=="200"){
      

return (



  


  <div class="all">
  
   <div class="jumbotron text-center" style={styles} >
  <div class="testing" style={styles.testing}>
   </div> 
   
   
   <h2>Company's Name:</h2>
 <h2 style={styles.movesName}>
   <EdiText  type="text" inputProps="company_name" value={items.company_name}   onSave={handleSave} />
</h2>
<div class="container" style={styles.move}>
    <h2>Current Logo</h2>
    <Avatar avatarUrl={preview}/>
    <input type="file" onChange={imageHandler} accept="image/*"/>    
    
    {clicked && <button onClick={()=>newImage()} >submit</button>}

    </div>



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
  