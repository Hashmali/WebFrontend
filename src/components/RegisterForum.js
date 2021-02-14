import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Register.css"
export default function RegisterForum(props) {
  var toke="Token " + props.tok+" "
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [admin, setAdmin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState();
  const divStyle = {
    background: "white",
    padding: "20px",
    marginTop: "-80px"
  };
  
  function postReq(){
    if(!image){console.log("No Image was provided")}

  const bodyData=new FormData();
  bodyData.append('phone',phone);
  bodyData.append('password',password);
  bodyData.append('password2',password2);
  bodyData.append('is_staff',admin);
  bodyData.append('first_name',firstName);
  bodyData.append('second_name',lastName);

  const requestOptions =
  {
    
   method: 'POST',
   headers: { 
            'Authorization' : toke,
            },
  body: bodyData
  };
return requestOptions;
}

  const fetchItems= async ()=>{
    if(password!=password2){
      alert("Password fields didn't match.")
    return
    }


    const data=await fetch('http://127.0.0.1:8000/api/worker/register/',postReq());
  const req=await data.json();
  alert(data.status)
  if(data.status==201){
    alert("Successfully added new worker!")
  }
  else{
    alert(req.phone)


  }
  

};

  function validateForm() {
    return phone.length > 0 && password.length>0&&
    password2.length>0&&firstName.length>0 &&lastName.length>0;



  }

  function handleSubmit(event) {  
    event.preventDefault();
  }
  
  return (
    <div className="Register">
      <Form className="Register" onSubmit={handleSubmit} style={divStyle}>
      <Form.Row>
      <Col>
      <Form.Group size="lg" >
          <Form.Label class="labels">Phone</Form.Label>
          <Form.Control
           inline
           autoFocus
            type="number"  
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
    </Col>
    <Col>
 
    <Form.Group size="lg" >
          <Form.Label  class="labels">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>


    </Col>
    <Col>

    <Form.Group size="lg" >
          <Form.Label  class="labels">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group> 
    </Col>
     </Form.Row>
     <Form.Row>
     <Col>
     <Form.Group size="lg" >
          <Form.Label  class="labels">First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

    </Col>
    <Col>
    <Form.Group size="lg" >
          <Form.Label  class="labels">Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group> 
    </Col>
</Form.Row>       
<Form.Row>       
<Col>
<Form.Group size="lg" >
          <Form.Label  class="labels">is Admin?</Form.Label>
          <Form.Control
            type="checkbox"
            value={admin}
            onClick={(e) => setAdmin(!admin)}
          />
        </Form.Group>
</Col>
<Col>
<Form.Group size="lg" >
          <Form.Label  class="labels">Upload A Photo</Form.Label>
          <Form.Control
            type="file"
          onChange={(e)=>setImage(e.target.files[0])}
            accept="image/*"
          />

        </Form.Group>
</Col>


</Form.Row>
         
        <Button block size="lg" type="submit" style={{    background: "black",
}} disabled={!validateForm()}  onClick={fetchItems}>
          Add New Worker
        </Button>
      </Form>
    </div>
  );
}

