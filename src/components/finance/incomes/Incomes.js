import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import { Button } from "semantic-ui-react";
import Loader from "../../Loader";

const Incomes = (props) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var toke = "Token " + props.token + " ";
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
    console.log(toke);

    const data = await fetch(
      "https://hashmali-backend.herokuapp.com/api/finance/incomes/",
      requestOptions
    ).catch((error) => console.error(error));
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };
  if (status != 200) {
    return (
      <div>
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
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-5">
        <h1>Incomes:</h1>
        <table className="table border shadow">
          <thead style={{ backgroundColor: "black" }}>
            <tr style={{ color: "white" }}>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Project</th>
              <th scope="col">Date</th>
              <th scope="col">Image</th>
              <th>Action</th>
              <th scope="col">
                <Link to={`/finance/incomes/create`}>
                  <Button icon="add" color="yellow" />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((income, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{income.title}</td>
                <td>{income.amount}</td>
                <td>{income.description}</td>
                {income.project.project_code}
                <td>{income.month}</td>
                <td>
                  <Avatar avatarUrl={income.image} />
                </td>

                <td>
                  <Link to={`/finance/incomes/${income.id}`}>
                    <Button icon="eye" color="teal" />
                  </Link>
                  <Link to={`/finance/incomes/edit/${income.id}`}>
                    <Button icon="edit" color="blue" />
                  </Link>
                  <Link to={`/finance/incomes/delete/${income.id}`}>
                    <Button icon="delete" color="red" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Incomes;
