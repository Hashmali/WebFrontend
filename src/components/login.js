/****************************************************************************************************/
//Libraries
import React, { useState } from "react";
import Loader from "./Loader";
import Icon from "./images/icon_profile.png";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
/****************************************************************************************************/
//The Login function containing our Log-in form and functions to validate credentials
export default function Login(props) {
  //Will use history to navigate to Website upon successful authentication
  const history = useHistory();
  //States to store phone and password and send them to server for checking
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  //False-Don't display Loader,True-Display Loader.
  const [loader, setLoader] = useState(false);
  //A function to check if the server response is positive
  function check(data) {
    //If the user provided a valid phone number and password
    //The server will replay with a token and ID
 
    
    if (data.token) {
      //Passing the token and ID to other Components(will be used to fetch requests)
      props.userLogin(data.token);
      props.userId(data.id);
      //Turn of the loader
      setLoader(false);
      if (data.is_admin == false) {
        alert("You don't have permission to view website!");
        return;
      }

      history.push("/Home"); //navigate to home page
    } else {
      //If the user provided invalid credentials alert an error message.
      alert("failed to login...please try again!");
      setLoader(false);
    }
  }

  //A function to send a request to the server to validate data
  function sendRequest() {
    //Checking if password and phone are empty
    if (!password || !phone) {
      alert("please provide phone number and password...");
      return;
    }
    //Israeli phone number
    var regex = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
    //Checking if phone number is valid
    if (!regex.test(phone)) {
      alert("please enter a valid phone number...");
      return;
    }
    //Request options
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: phone, password: password }),
    };
    setLoader(true);
    //The url to fetch the data to
    fetch(
      "https://hashmali-backend.herokuapp.com/api/worker/login/",
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => {
        check(data);
      })
      .catch((error) => {alert("Website is currently down for maintenance!")
      setLoader(false);

    }
      );
  }
  //If loader is set to true then display it
  if (loader) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Loader />
        </Grid.Column>
      </Grid>
    );
  }
  //Displaying form
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Log-in to your account
        </Header>
        <Image src={Icon} size="small" centered />
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Phone number"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              color="black"
              fluid
              size="large"
              type="submit"
              onClick={sendRequest}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>If you don't have an account please contact admin.</Message>
      </Grid.Column>
    </Grid>
  );
}
