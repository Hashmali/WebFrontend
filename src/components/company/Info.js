/*Libraries*/
import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import Loader from "react-loader-spinner";
const source = "/images/logo.png";
/*******************************************************************************************************/
export default function Info(props) {
  const styles = {
    background: "white",
    pic: {
      width: 180,
      height: 180,
      borderRadius: 180 / 2,
      overflow: "hidden",
      borderWidth: 3,
    },
    move: {
      marginLeft: 150,
    },
  };
  /*******************************************************************************************************/

  console.log(props.id);
  useEffect(() => {
    fetchItems();
    //    fetchCars();
  }, []);
  var toke = "Token " + props.token + " ";
  var url = "https://hashmali-backend.herokuapp.com/api/info/1/";
  var url2 = "https://hashmali-backend.herokuapp.com/api/info/1/update/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  const fetchItems = async () => {
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    console.log(JSON.stringify(data));
    const items = await data.json();
    setItems(items);
    setStatus(data.status);
  };

  if (status == "200") {
    return (
      <div class="all">
        <div class="jumbotron text-center" style={styles}>
          <div class="testing" style={styles.testing}></div>

          <h2>Company's Name:{items.company_name}</h2>
          <Avatar avatarUrl={items.logo} />
        </div>

        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <h3>Company's Manager: </h3>
              <h6>Name:{items.manager.first_name}</h6>
              <h6>Last Name:{items.manager.second_name}</h6>
              <h6>Phone:{items.manager.phone}</h6>
              <h6>Email:{items.manager.email}</h6>
              <h6>Address:{items.manager.address}</h6>
            </div>

            <div class="col-sm-4">
              <h3>Deputy Director:</h3>
              <h6>Name:{items.deputy_director.first_name}</h6>
              <h6>Last Name:{items.deputy_director.second_name}</h6>
              <h6>Age:{items.deputy_director.age}</h6>
              <h6>Phone:{items.deputy_director.phone}</h6>
              <h6>Email:{items.deputy_director.email}</h6>
              <h6>Address:{items.deputy_director.address}</h6>
            </div>

            <div class="col-sm-4">
              <h3>Vehicles:</h3>
              {items.car.map((car, index) => (
                <div>
                  <h6>license number:{car.license_no}</h6>
                  <h6>license due to:{car.license_expiry_date}</h6>
                  <h6>Bituah due to:{car.insurance_expiry_date}</h6>
                  <h6>
                    Bituah till age:[number from 20-70] {car.insurance_age}
                  </h6>
                  <h6>
                    Photo:
                    <Avatar avatarUrl={car.image} />
                  </h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Loader
          type="Puff"
          color="#343a40"
          height={150}
          width={150}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
}
