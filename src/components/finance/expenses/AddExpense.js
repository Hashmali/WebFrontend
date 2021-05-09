import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../Avatar";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../../Loader";
import DatePicker from "react-date-picker";
import { TimePicker } from "antd";
import "antd/dist/antd.css";

import moment from "moment";

const AddExpense = (props) => {
  let history = useHistory();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [projects, setProjects] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    description: "",
  });
  const { title, amount, description } = expense;
  const onInputChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  var toke = "Token " + props.token + " ";
  var url =
    "https://hashmali-backend.herokuapp.com/api/finance/expenses/create/";

  function post_request() {
    const newData = new FormData();
    /* 
       title,
    amount,
    description,
    image,

        */
    newData.append("title", expense.title);
    newData.append("amount", expense.amount);
    newData.append("description", expense.description);

    let djangoFormatDate =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();

    console.log(djangoFormatDate);
    newData.append("month", djangoFormatDate);

    const requestOptions = {
      method: "POST",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions;
  }
  const requestOptions2 = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //Checking if password and phone are empty
    if (!title) {
      alert("please provide expense title...");
      return;
    }
    //Checking if password and phone are empty
    if (!description) {
      alert("please provide expense details...");
      return;
    }
    if (!startDate) {
      alert("please provide date...");
      return;
    }

    const data = await fetch(url, post_request()).catch((error) =>
      console.error(error)
    );
    if (data.status) {
      if (data.status != 201) {
        alert(data.status);
      }
      if (data.status == 201) {
        alert("Successfully created Expense!");
        history.push("/finance");
      }
    }
  };

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

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link className="btn btn-dark" to="/finance">
          Back to Home
        </Link>

        <h2 className="text-center mb-4">Fill in Expense Details:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Title
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Expense title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Amount
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Expense amount"
              name="amount"
              value={amount}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <Label color="black" as="a" basic>
              Description
            </Label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Expense content"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label color="black" as="a" basic>
              Date
            </Label>

            <DatePicker
              className="form-control form-control-lg"
              value={startDate}
              onChange={(date) => setStartDate(date)}

              // onChange={(date) => setStartDate(date)}
            />
          </div>

          <button className="btn btn-dark btn-block">Create Expense</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
