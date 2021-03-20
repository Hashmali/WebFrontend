import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TableScrollbar from "react-table-scrollbar";
import File from "./ProjectFiles";
import Avatar from "./Avatar.js";

function List(props) {
  useEffect(() => {
    fetchItems();
  }, []);
  var toke = "Token " + props.tok + " ";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  const fetchItems = async () => {
    const data = await fetch(
      "https://hashmali-backend.herokuapp.com/api/project/",
      requestOptions
    ).catch((error) => console.error(error));
    setStatus(data.status);
    const items = await data.json();
    setItems(items);
  };

  if (status == "200") {
    return (
      <div>
        <TableScrollbar height="500px">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Contractor</th>
                <th>Contractor Phone</th>
                <th>Contractor Email</th>
                <th>Architect</th>
                <th>Architect Phone</th>
                <th>Architect Email</th>
                <th>City</th>
                <th>Street</th>
                <th>Project Code</th>
                <th>Property Number</th>
                <th>Owner</th>
                <th>Owner Phone</th>
                <th>Owner Email</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.phone}>
                  <td>{item.id}</td>
                  <td>
                    {item.contractor_first_name +
                      " " +
                      item.contractor_second_name}
                  </td>
                  <td>{item.contractor_phone_no}</td>
                  <td>{item.contractor_email}</td>
                  <td>
                    {item.architect_first_name +
                      " " +
                      item.architect_second_name}
                  </td>
                  <td>{item.architect_phone_no}</td>
                  <td>{item.architect_email}</td>
                  <td>{item.city}</td>
                  <td>{item.street}</td>
                  <td>{item.project_code}</td>
                  <td>{item.property_no}</td>
                  <td>
                    {item.owner_first_name + " " + item.owner_second_name}
                  </td>
                  <td>{item.owner_phone_no}</td>
                  <td>{item.owner_email}</td>
                  <td>
                    <Avatar avatarUrl={item.image} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScrollbar>

        <TableScrollbar height="500px">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>File ID</th>
                <th>File Name</th>
                <th>Uploaded At</th>
                <th>Image</th>
              </tr>
            </thead>
            <File arr={items} />
          </Table>
        </TableScrollbar>
      </div>
    );
  } else {
    return <h1>You do not have permission to perform this action</h1>;
  }
}
export default List;
