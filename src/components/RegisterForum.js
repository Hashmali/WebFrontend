import React, { useState,useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Register.css"
export default function RegisterForum(props) {
  console.log("Token")
  var toke="Token " + props.tok+" "
  console.log(toke)

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [admin, setAdmin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const divStyle = {
    background: "#eee",
    padding: "20px",
    marginTop: "-80px"
  };
  



  const requestOptions =
  {
   method: 'POST',
   headers: { 'Content-Type': 'application/json',
            'Authorization' : toke,
            },
  body: JSON.stringify({ phone:phone,password:password,password2:password2,
                       is_admin:admin,first_name:firstName,second_name:lastName,image:null
      })
  };
  const printData=()=>{

    console.log(phone)
    console.log(password)
    console.log(password2)
    console.log(firstName)
    console.log(lastName)
    console.log("Admin Value")
    console.log(admin)

  }



   const fetchItems= async ()=>{
   const data=await fetch('http://127.0.0.1:8000/api/worker/register/',requestOptions);
 
    };






  function validateForm() {
    return phone.length > 0 && password.length;
  }

  function handleSubmit(event) {  
    event.preventDefault();
  }
  
  return (
    <div className="Register">
      <Form className="Register" onSubmit={handleSubmit} style={divStyle}>

      <Form.Row>
    <Col>

    <Form.Group size="lg" controlId="phone">
      
          <Form.Label class="labels">Phone</Form.Label>
          <Form.Control
            autoFocus
            type="number"  
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
    </Col>
    <Col>
 
    <Form.Group size="lg" controlId="password">
          <Form.Label  class="labels">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>


    </Col>
    <Col>

    <Form.Group size="lg" controlId="password">
          <Form.Label  class="labels">password2</Form.Label>
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
     <Form.Group size="lg" controlId="password">
          <Form.Label  class="labels">firstName</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

    </Col>
    <Col>
    <Form.Group size="lg" controlId="password">
          <Form.Label  class="labels">lastName</Form.Label>
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
<Form.Group size="lg" controlId="password">
          <Form.Label  class="labels">admin</Form.Label>
          <Form.Control
            type="checkbox"
            value={admin}
            onClick={(e) => setAdmin(!admin)}
          />
        </Form.Group>
</Col>
</Form.Row>
         
        <Button block size="lg" type="submit" disabled={!validateForm()}  onClick={fetchItems}>
          Add New Worker
        </Button>
      </Form>
    </div>
  );
}

