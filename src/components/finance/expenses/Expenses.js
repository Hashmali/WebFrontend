import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import { Button } from "semantic-ui-react";
import Loader from "../../Loader";

const Expenses = (props) => {
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
      "https://hashmali-backend.herokuapp.com/api/report/",
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
        <h1>Expenses:</h1>
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
                <Link to={`/finance/expenses/create`}>
                  <Button icon="add" color="yellow" />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((report, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{report.title}</td>
                <td>{report.amount}</td>
                <td>{report.description}</td>
                {report.project.project_code}
                <td>{report.date}</td>
                <td>
                  <Avatar avatarUrl={report.image} />
                </td>

                <td>
                  <Link to={`/finance/expenses/${report.id}`}>
                    <Button icon="eye" color="teal" />
                  </Link>
                  <Link to={`/finance/expenses/edit/${report.id}`}>
                    <Button icon="edit" color="blue" />
                  </Link>
                  <Link to={`/finance/expenses/delete/${report.id}`}>
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
export default Expenses;
