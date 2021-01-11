import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";

import "./CreateProject.css"
export default function CreateProject(props) {
  console.log("Token")
  var toke="Token " + props.tok+" "
  console.log(toke)
  const divStyle = {
    background: "#eee",
    padding: "20px",
    marginTop: "-80px"
  };
  
  const [id, setID] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [contractorName2, setContractorName2] = useState("");
  const [contractorPhone, setContractorPhone] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");
  const [architectName, setArchitectName] = useState("");
  const [architectName2, setArchitectName2] = useState("");
  const [architectPhone, setArchitectPhone] = useState("");
  const [architectEmail, setArchitectEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerName2, setOwnerName2] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [image, setImage] = useState("");

  const requestOptions =
  {
   method: 'POST',
   headers: { 'Content-Type': 'application/json',
            'Authorization' : toke,
            },
  body: JSON.stringify(
    { 
      id:id,
      image:null,
      project_code:projectCode,
      contractor_first_name:contractorName,
      contractor_second_name:contractorName2,
      contractor_phone_no:contractorPhone,
      contractor_email:contractorEmail,
      architect_first_name:architectName,
      architect_second_name:architectName2,
      architect_phone_no:contractorPhone,
      architect_email:architectEmail,
      city:city,
      street:street,
      owner_first_name:ownerName,
      owner_second_name:ownerName2,
      owner_phone_no:ownerPhone,
      owner_email:ownerEmail,
      image:null
     
    
    
    }
      
      
      )
  };
  const printData=()=>{

  }



   const fetchItems= async ()=>{
   const data=await fetch('http://127.0.0.1:8000/api/project/create/',requestOptions);
 
    };






  function validateForm() {
    return true;
  }

  function handleSubmit(event) {  
    event.preventDefault();
  }
  
  return (
 <div className="CreateProject">
<Form className="ProjectFourm" onSubmit={handleSubmit} style={divStyle}>
  <Form.Row>
    <Col>
    <Form.Group size="lg" >

    <Form.Label className="labels">ID</Form.Label>
          <Form.Control
            autoFocus
            type="text"  
            value={id}
            onChange={(e) => setID(e.target.value)}
          /> 
          </Form.Group>
    </Col>
    </Form.Row>
    
    <Form.Row>
    <Col>
    <Form.Group size="lg" >

      <Form.Label  className="labels" >contractorName</Form.Label>
          <Form.Control
            type="text"
            value={contractorName}
            onChange={(e) => setContractorName(e.target.value)}
          />
          </Form.Group>
    </Col>
    <Col>
    <Form.Group size="lg" >
    <Form.Label  className="labels">contractorName2</Form.Label>
          <Form.Control
            type="text"
            value={contractorName2}
            onChange={(e) => setContractorName2(e.target.value)}
          />
</Form.Group>
    </Col>
    <Col>
    <Form.Group size="lg" >

    <Form.Label  className="labels" >contractorPhone</Form.Label>
          <Form.Control
            type="text"
            value={contractorPhone}
            onChange={(e) => setContractorPhone(e.target.value)}
          />  
</Form.Group>
    </Col>
    <Col>
    <Form.Group size="lg" >

    <Form.Label  className="labels">contractorEmail</Form.Label>
          <Form.Control
            type="text"
            value={contractorEmail}
            onChange={(e) => setContractorEmail(e.target.value)}
          />
</Form.Group>
    </Col>
  </Form.Row>
  <Form.Row>

  <Col>
  <Form.Group size="lg" >

   <Form.Label  className="labels">architectName</Form.Label>
          <Form.Control
            type="text"
            value={architectName}
            onChange={(e) => setArchitectName(e.target.value)}
          />
</Form.Group>
  </Col>
  <Col>
  <Form.Group size="lg" >

           <Form.Label  className="labels">architectName2</Form.Label>
          <Form.Control
            type="text"
            value={architectName2}
            onChange={(e) => setArchitectName2(e.target.value)}
          />
</Form.Group>
</Col>
  <Col>
  <Form.Group size="lg" >

          <Form.Label  className="labels">architectPhone</Form.Label>
          <Form.Control
            type="text"
            value={architectPhone}
            onChange={(e) => setArchitectPhone(e.target.value)}
          />
          </Form.Group>
          </Col>
  <Col>
  <Form.Group size="lg" >

          <Form.Label  className="labels">architectEmail</Form.Label>
          <Form.Control
            type="text"
            value={architectEmail}
            onChange={(e) => setArchitectEmail(e.target.value)}
          />
</Form.Group>
</Col>
  </Form.Row>
  <Form.Row>
  <Col>
  <Form.Group size="lg" >

          <Form.Label  className="labels">city</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
</Form.Group>
</Col>
  <Col>
  <Form.Group size="lg" >

          <Form.Label  className="labels">street</Form.Label>
          <Form.Control
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
</Form.Group>
</Col>
  </Form.Row>
  <Form.Row>
  <Col>
  <Form.Group size="lg" >

        <Form.Label  className="labels">ownerName</Form.Label>
          <Form.Control
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          
          />
          </Form.Group>
          </Col>
  <Col>   
  <Form.Group size="lg" >

  <Form.Label  className="labels">ownerName2</Form.Label>
          <Form.Control
            type="text"
            value={ownerName2}
            onChange={(e) => setOwnerName2(e.target.value)}
          />
</Form.Group>
</Col>
  <Col>
  <Form.Group size="lg" >

          <Form.Label  className="labels">ownerPhone</Form.Label>
          <Form.Control
            type="text"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
          />
</Form.Group>
</Col>
  <Col>
  <Form.Group size="lg" >

<Form.Label  className="labels">ownerEmail</Form.Label>
<Form.Control
  type="text"
  value={ownerEmail}
  onChange={(e) => setOwnerEmail(e.target.value)}
/>
</Form.Group>
</Col>
  </Form.Row>
  <Form.Row>
  <Col>
  <Form.Group>
          <Form.Label  className="labels">image</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          </Form.Group>

</Col>
</Form.Row>
<Form.Group size="lg" >

        <Button block size="lg" type="submit" disabled={!validateForm()}  onClick={fetchItems}>
          Create a New Project
        </Button>
    </Form.Group>
      </Form>
    </div>
  );
}

