import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import Avatar from "../Avatar";

const Report = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  //console.log(toke)

  var toke = "Token " + props.token + " ";
  var url = "https://hashmali-backend.herokuapp.com/api/report/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  useEffect(() => {
    if (props.token) {
      fetchItems();
    }
  }, [props.token]);

  const fetchItems = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);

    const items = await data.json();
    setItems(items);
  };
  if (loader) {
    return <Loader />;
  }
  if (status === 200) {
    const currentItem = items.filter((item) => Number(item.id) === Number(id));

    return (
      <div className="container py-4">
        <Link className="btn btn-dark" to="/reports">
          Back to Home
        </Link>
        {currentItem[0] ? (
          <div>
            <h1 className="display-5">
              {" "}
              {"Title:" + " " + currentItem[0].title}
            </h1>

            <hr />
            <ul
              className="list-group w-50"
              style={{ justifyContent: "center" }}
            >
              <li className="list-group-item">
                <h3>
                  {" "}
                  Photo: <Avatar avatarUrl={currentItem[0].image} />
                </h3>
              </li>
              <li className="list-group-item">
                <h3>
                  Worker:{" "}
                  {currentItem[0].worker.first_name +
                    " " +
                    currentItem[0].worker.second_name}
                </h3>
              </li>
              <li className="list-group-item">
                <h3>Project: {currentItem[0].project.project_code}</h3>
              </li>
              <li className="list-group-item">
                <h3>Report Details: {currentItem[0].description}</h3>
              </li>
              <li className="list-group-item">
                <h3>Date: {currentItem[0].date}</h3>
              </li>
              <li className="list-group-item">
                <h3>Start Hour: {currentItem[0].start_hour}</h3>
              </li>
              <li className="list-group-item">
                <h3>Finish Hour: {currentItem[0].ending_hour} </h3>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="container py-4">
        <Link className="btn btn-dark" to="/reports">
          Back to Home
        </Link>
      </div>
    );
  }
};

export default Report;
