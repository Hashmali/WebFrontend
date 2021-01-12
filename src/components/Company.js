import React from 'react';
import Nav from "./Nav"
import Avatar from './Avatar'
const source="/images/logo.png"

export default function Company(props) {
  const styles={
    background: "white",
  }


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

