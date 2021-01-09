import React,{ useState,useEffect }  from "react";
import {Route,BrowserRouter as Router,Switch} from "react-router-dom"
import Company from "./components/Company";
import About from "./components/About";
import Workers from "./components/Workers"
import Login from "./components/login"
import Logout from "./components/logout"
import PDF from "./components/pdf_test"
import Schedule from "./components/schedule"
import Finance from "./components/finance" 
import Projects from "./components/Projects"
export default function App() {

const [token,setToken]=useState('');

useEffect(() => {
  const parsedToken = localStorage.getItem("token")
  setToken(parsedToken)
}, [])




useEffect(() => {
  localStorage.setItem("token", token)
}, [token])



  const userLogin=(tok)=>{
    setToken(tok)
  }


  return (
    <Router>
    <Switch>
      <Route>
        <Route path="/" exact
        render={(props) => (
        <Login {...props} userLogin={userLogin} />
         )} />
        <Route path="/Home"
         render={(props) => (
          <Company {...props} token={token} />
           )} />      
        <Route path="/workers_management"
         render={(props) => (
          <Workers {...props} token={token} />
           )} />      
        <Route path="/about"
         render={(props) => (
          <About {...props} token={token} />
           )} />      
        <Route path="/PDF"
         render={(props) => (
          <PDF {...props} token={token} />
           )} />      
         <Route  path="/schedule"
         render={(props) => (
          <Schedule {...props} token={token} />
           )} />
          <Route path="/finance"
         render={(props) => (
          <Finance {...props} token={token} />
           )} />
        <Route path="/projects"
         render={(props) => (
          <Projects {...props} token={token} />
           )} />
        <Route path="/logout"
         render={(props) => (
          <Logout {...props} token={token} />
           )} />


      </Route>
    </Switch>
    </Router>
  );
}
