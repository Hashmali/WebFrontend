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
    <Segment inverted style={{ backgroundColor: "black" }}>
      <Menu inverted secondary style={{ backgroundColor: "black" }}>
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
          name="Reports"
          active={activeItem === "Reports"}
          as={Link}
          to="/reports"
        />
        <Menu.Item
          name="Finance"
          active={activeItem === "Finance"}
          as={Link}
          to="/finance"
        />
        <Menu.Item
          name="Missions"
          active={activeItem === "Missions"}
          as={Link}
          to="/missions"
        />

        <Menu.Item name="Logout" active={activeItem === "Logout"}>
          <LogoutModal token={props.token}></LogoutModal>
        </Menu.Item>
      </Menu>
    </Segment>
  );
}
