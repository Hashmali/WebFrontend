import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Loader";
import Avatar from "../../Avatar";

const Expense = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  //console.log(toke)

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/finance/" + id + "/expupdate/";

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
  return (
    <div className="container py-4">
      <Link className="btn btn-dark" to="/finance">
        Back to Home
      </Link>
      <h1 className="display-5"> {"Title:" + " " + items.title}</h1>
      <hr />
      <ul className="list-group w-50" style={{ justifyContent: "center" }}>
        <li className="list-group-item">
          <h3>Amount: {items.amount}</h3>
        </li>

        <li className="list-group-item">
          <h3>Expense Details: {items.description}</h3>
        </li>
        <li className="list-group-item">
          <h3>Date: {items.month}</h3>
        </li>
      </ul>
    </div>
  );
};

export default Expense;
