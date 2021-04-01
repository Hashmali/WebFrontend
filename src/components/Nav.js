import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
export default function Nav(props) {
  const mystyle = {
    fontFamily: "david",
    fontSize: "20px",
    marginTop: "10px",
  };

  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark "
      style={{ background: "black" }}
    >
      <a class="navbar-brand" href="/Home" style={mystyle}>
        Hashmali
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item"></li>

          <li class="nav-item active">
            <Link to="/Home" class="nav-link">
              My Company<span class="sr-only">(current)</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/workers_management" class="nav-link">
              Workers Management
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/projects" class="nav-link">
              Projects
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/annotate" class="nav-link">
              Create Price Quote(in development )
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/schedule" class="nav-link">
              Schedule
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/finance" class="nav-link">
              Finance
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/logout" class="nav-link">
              logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
