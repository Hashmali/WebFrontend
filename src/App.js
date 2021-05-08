import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CompanyDetails from "./components/company/CompanyDetails";
import EditCompanyDetails from "./components/company/EditCompanyDetails";

import Annotate from "./components/Annotate";

import Workers from "./components/workers/Workers";
import AddWorker from "./components/workers/AddWorker";
import ViewWorker from "./components/workers/ViewWorker";
import EditWorker from "./components/workers/EditWorker";
import DeleteWorker from "./components/workers/DeleteWorker";

import Reports from "./components/reports/Reports";
import AddReport from "./components/reports/AddReport";
import ViewReport from "./components/reports/ViewReport";
import EditReport from "./components/reports/EditReport";
import DeleteReport from "./components/reports/DeleteReport";

import Login from "./components/login";
import Logout from "./components/LogoutModal";
import PDF from "./components/PdfCreate";
//import Schedule from "./components/Schedule";
import Finance from "./components/finance";
import Projects from "./components/projects/Projects";
import AddProject from "./components/projects/AddProject";
import ViewProject from "./components/projects/ViewProject";
import EditProject from "./components/projects/EditProject";
import DeleteProject from "./components/projects/DeleteProject";

export default function App() {
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const parsedToken = localStorage.getItem("token");
    const parsedId = localStorage.getItem("id");
    setToken(parsedToken);
    setId(parsedId);
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
  }, [token, id]);

  const userLogin = (tok) => {
    setToken(tok);
  };
  const userId = (ID) => {
    setId(ID);
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Login {...props} userLogin={userLogin} userId={userId} />
          )}
        />

        <Route
          path="/Home"
          render={(props) => (
            <CompanyDetails {...props} token={token} id={id} />
          )}
        />

        <Route
          exact
          path="/info_edit"
          render={(props) => (
            <EditCompanyDetails {...props} token={token} id={id} />
          )}
        />

        <Route
          path="/annotate"
          render={(props) => <Annotate {...props} token={token} id={id} />}
        />

        <Route
          path="/workers_management"
          render={(props) => <Workers {...props} token={token} id={id} />}
        />

        <Route
          exact
          path="/workers/create"
          render={(props) => <AddWorker {...props} token={token} />}
        />

        <Route
          exact
          path="/workers/:id"
          render={(props) => <ViewWorker {...props} token={token} />}
        />

        <Route
          exact
          path="/workers/delete/:id"
          render={(props) => <DeleteWorker {...props} token={token} />}
        />

        <Route
          exact
          path="/workers/edit/:id"
          render={(props) => <EditWorker {...props} token={token} />}
        />

        <Route
          exact
          path="/reports"
          render={(props) => <Reports {...props} token={token} id={id} />}
        />

        <Route
          exact
          path="/reports/create"
          render={(props) => <AddReport {...props} token={token} id={id} />}
        />

        <Route
          exact
          path="/reports/:id"
          render={(props) => <ViewReport {...props} token={token} id={id} />}
        />

        <Route
          exact
          path="/reports/delete/:id"
          render={(props) => <DeleteReport {...props} token={token} id={id} />}
        />

        <Route
          exact
          path="/reports/edit/:id"
          render={(props) => <EditReport {...props} token={token} id={id} />}
        />

        <Route
          path="/PDF"
          render={(props) => <PDF {...props} token={token} id={id} />}
        />

        <Route
          path="/finance"
          render={(props) => <Finance {...props} token={token} id={id} />}
        />

        <Route
          exact
          path="/projects"
          render={(props) => <Projects {...props} token={token} id={id} />}
        />

        <Route
          exact
          path="/projects/create"
          render={(props) => <AddProject {...props} token={token} />}
        />

        <Route
          exact
          path="/projects/:id"
          render={(props) => <ViewProject {...props} token={token} />}
        />

        <Route
          exact
          path="/projects/delete/:id"
          render={(props) => <DeleteProject {...props} token={token} />}
        />

        <Route
          exact
          path="/projects/edit/:id"
          render={(props) => <EditProject {...props} token={token} />}
        />

        <Route
          path="/logout"
          render={(props) => <Logout {...props} token={token} id={id} />}
        />
      </Switch>
    </Router>
  );
}
