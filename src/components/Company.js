import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Image,Text,Font, View, Document, StyleSheet } from '@react-pdf/renderer';
import Nav from "./Nav"

export default function Company(props) {
  console.log(props.token)
  
    return (
   <div class="all">
     <Nav/>
    <div class="jumbotron text-center">
     <h1>Hashmali</h1>
     <p>Insert Company Logo Here</p>
     <p>Insert Company Name Here</p>
     <p>{props.token}</p>


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

