import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
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
      <Form onSubmit={handleSubmit}>
     
     
     
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            autoFocus
            type="number"  
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
       
       
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>password2</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group size="lg" controlId="password">
          <Form.Label>admin</Form.Label>
          <Form.Control
            type="checkbox"
            value={admin}
            onClick={(e) => setAdmin(!admin)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>firstName</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()}  onClick={fetchItems}>
          Login
        </Button>
      </Form>
    </div>
  );
}

