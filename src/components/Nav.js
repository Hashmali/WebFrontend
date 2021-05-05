import React, { useEffect, useState } from "react";
import { Menu, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";
export default function MenuExampleInvertedSegment(props) {
  const [activeItem, setActiveItem] = useState("My Company");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.activeItem) {
      setActiveItem(props.activeItem);
    }
  }, [props.activeItem]);

  console.log(activeItem);

  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          name="My Company"
          active={activeItem === "My Company"}
          as={Link}
          to="/Home"
        />
        <Menu.Item
          name="Workers Management"
          active={activeItem === "Workers Management"}
          as={Link}
          to="/workers_management"
        />
        <Menu.Item
          name="Projects"
          active={activeItem === "Projects"}
          as={Link}
          to="/projects"
        />
        <Menu.Item
          name="Create Price Quote(in development)"
          active={activeItem === "Create Price Quote(in development)"}
          as={Link}
          to="/annotate"
        />
        <Menu.Item
          name="Schedule"
          active={activeItem === "Schedule"}
          as={Link}
          to="/schedule"
        />
        <Menu.Item
          name="Finance"
          active={activeItem === "Finance"}
          as={Link}
          to="/finance"
        />
        <Menu.Item name="Logout" active={activeItem === "Logout"}>
          <LogoutModal token={props.token}></LogoutModal>
        </Menu.Item>
      </Menu>
    </Segment>
  );
}

/*import React, { useState } from "react";
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
*/
