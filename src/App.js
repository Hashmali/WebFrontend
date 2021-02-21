import React,{ useState,useEffect }  from "react";
import {Route,BrowserRouter as Router,Switch} from "react-router-dom"
import Company from "./components/Company";
import About from "./components/About";
import Workers from "./components/Workers"
import AddWorker from "./components/workers/AddWorker";
import ViewWorker from "./components/workers/ViewWorker";
import EditWorker from "./components/workers/EditWorker";
import DeleteWorker from "./components/workers/DeleteWorker";

import Login from "./components/login"
import Logout from "./components/logout"
import PDF from "./components/PdfCreate"
import Schedule from "./components/Schedule"
import Finance from "./components/finance" 

import Projects from "./components/Projects"
import AddProject from "./components/projects/AddProject";
import ViewProject from "./components/projects/ViewProject";
import EditProject from "./components/projects/EditProject";
import DeleteProject from "./components/projects/DeleteProject";





export default function App() {

const [token,setToken]=useState('');
const [id,setId]=useState('');

useEffect(() => {
  const parsedToken = localStorage.getItem("token")
  const parsedId = localStorage.getItem("id")
  setToken(parsedToken)
  setId(parsedId)
}, [])




useEffect(() => {
  localStorage.setItem("token", token)
  localStorage.setItem("id", id)

}, [token,id])



  const userLogin=(tok)=>{
    setToken(tok)
  }
  const userId=(ID)=>{
    setId(ID)
  }

  return (

  <Router>
    <Switch>
        <Route exact path="/" 
        render={(props) => (
        <Login {...props} userLogin={userLogin} userId={userId} />
         )} />
        <Route path="/Home"
         render={(props) => (
          <Company {...props} token={token} id={id} />
           )} />      
        <Route path="/workers_management"
         render={(props) => (
          <Workers {...props} token={token} id={id} />
           )} />      

          <Route exact path="/workers/create"
            render={(props) => (
            <AddWorker {...props} token={token}/>
           )} />



           <Route exact path="/workers/:id"
          render={(props) => (
          <ViewWorker {...props} token={token}/>
           )} />

          <Route exact path="/workers/delete/:id"
          render={(props) => (
          <DeleteWorker {...props} token={token}/>
           )} />

          
          <Route exact path="/workers/edit/:id"
          render={(props) => (
          <EditWorker {...props} token={token}/>
           )} />






        <Route path="/about"
         render={(props) => (
          <About {...props} token={token} id={id} />
           )} />      
        <Route path="/PDF"
         render={(props) => (
          <PDF {...props} token={token} id={id} />
           )} />      
         <Route  path="/schedule"
         render={(props) => (
          <Schedule {...props} token={token} id={id} />
           )} />
          <Route path="/finance"
         render={(props) => (
          <Finance {...props} token={token} id={id} />
           )} />
        <Route exact path="/projects"
         render={(props) => (
          <Projects {...props} token={token} id={id} />
           )} />


        <Route exact path="/projects/create"
            render={(props) => (
            <AddProject {...props} token={token}/>
           )} />



           <Route exact path="/projects/:id"
          render={(props) => (
          <ViewProject {...props} token={token}/>
           )} />

          <Route exact path="/projects/delete/:id"
          render={(props) => (
          <DeleteProject {...props} token={token}/>
           )} />

          
          <Route exact path="/projects/edit/:id"
          render={(props) => (
          <EditProject {...props} token={token}/>
           )} />

        <Route path="/logout"
         render={(props) => (
          <Logout {...props} token={token} id={id} />
           )} />

    </Switch>

    </Router>
  );
}
