import React, { useState, useEffect } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import Loader from "./Loader";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";

function ModalExampleBasic(props) {
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState(true);

  var toke = "Token " + props.token + " ";

  const history = useHistory();

  useEffect(() => {
    if (loader) {
      signOut();
    }
  }, [loader]);

  function signOut() {
    console.log(props.token);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: toke },
    };
    fetch(
      "https://hashmali-backend.herokuapp.com/api/worker/logout/",
      requestOptions
    ).catch((error) => console.error(error));
    setLoader(false);

    history.push("/");
  }

  return (
    <Modal
      style={{
        marginTop: "150px",
        marginLeft: "300px",
      }}
      size="mini"
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button icon="sign-out" variant="contained" color="black" />}
    >
      <Header icon>
        <Icon name="sign-out" />
        Exit
      </Header>
      <Modal.Content>
        {loader ? (
          <Loader />
        ) : (
          <p style={{ marginLeft: "150px" }}>
            You are about to leave website,are you sure?{" "}
          </p>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="black" inverted onClick={() => setLoader(true)}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalExampleBasic;

/*
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import "./login.css";
import { propTypes } from "react-bootstrap/esm/Image";
import Nav from "./Nav";

export default function LogoutModal(props) {
  console.log("I am hereio!");
  var toke = "Token " + props.token + " ";
  const history = useHistory();
  function check() {
    history.push("/");
  }
  function GetRequest() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: toke },
    };
    fetch(
      "https://hashmali-backend.herokuapp.com/api/worker/logout/",
      requestOptions
    ).catch((error) => console.error(error));
    check();
  }

  return (
    <div>
      <Button variant="danger" onClick={GetRequest}>
        Confirm Log Out
      </Button>
    </div>
  );
}
*/
