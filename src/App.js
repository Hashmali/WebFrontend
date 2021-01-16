import React,{ useState,useEffect }  from "react";
import {Route,BrowserRouter as Router,Switch} from "react-router-dom"
import Company from "./components/Company";
import About from "./components/About";
import Workers from "./components/Workers"
import Login from "./components/login"
import Logout from "./components/logout"
import PDF from "./components/PdfCreate"
import Schedule from "./components/schedule"
import Finance from "./components/finance" 
import Projects from "./components/Projects"
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
      <Route>
        <Route path="/" exact
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
        <Route path="/projects"
         render={(props) => (
          <Projects {...props} token={token} id={id} />
           )} />
        <Route path="/logout"
         render={(props) => (
          <Logout {...props} token={token} id={id} />
           )} />
      </Route>
    </Switch>
    </Router>
  );
}
