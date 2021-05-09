import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "../../Loader";
import Avatar from "../../Avatar";

const DeleteIncome = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  let history = useHistory();

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/finance/" + id + "/incupdate/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const requestOptions2 = {
    method: "DELETE",
    headers: { Authorization: toke },
  };

  useEffect(() => {
    if (props.token) {
      fetchItems();
    }
  }, [props.token]);

  const deleteIncome = async (id) => {
    const data = await fetch(url, requestOptions2).catch((error) =>
      console.error(error)
    );
    if (data.status == 204) {
      alert("Successfully deleted income!");
      history.push("/finance");
    }
  };

  const fetchItems = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);

    const items = await data.json();
    setLoader(false);

    setItems(items);
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container py-4">
      <h1 className="display-5">
        Are you sure you want to delete this income-{items.title}?
      </h1>
      <Link className="btn btn-primary" to="/finance">
        Cancel
      </Link>
      <button
        className="btn btn-danger"
        style={{ marginLeft: "20px" }}
        onClick={() => deleteIncome(id)}
      >
        Confirm Delete
      </button>
      <hr />
      <ul className="list-group w-50" style={{ justifyContent: "center" }}>
        <li className="list-group-item">
          <h3>
            {" "}
            Photo: <Avatar avatarUrl={items.image} />
          </h3>
        </li>
        <li className="list-group-item">
          <h3>Amount: {items.amount}</h3>
        </li>
        <li className="list-group-item">
          <h3>Project: {items.project}</h3>
        </li>
        <li className="list-group-item">
          <h3>Income Details: {items.description}</h3>
        </li>
        <li className="list-group-item">
          <h3>Date: {items.month}</h3>
        </li>
      </ul>
    </div>
  );
};

export default DeleteIncome;
