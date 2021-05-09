import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import Loader from "../../Loader";
import Avatar from "../../Avatar";

const EditExpense = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);

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
    "https://hashmali-backend.herokuapp.com/api/finance/" + id + "/expupdate/";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };
  const requestOptions3 = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  function patch_request() {
    const newData = new FormData();
    /* 
       title,
    amount,
    description,
        */
    newData.append("title", expense.title);
    newData.append("amount", expense.amount);
    newData.append("description", expense.description);

    const requestOptions2 = {
      method: "PATCH",
      headers: { Authorization: toke },
      body: newData,
    };
    return requestOptions2;
  }

  useEffect(() => {
    if (props.token) {
      loadExpense();
    }
  }, [props.token]);

  const loadExpense = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    setStatus(data.status);
    setLoader(false);
    const expense_data = await data.json();
    setExpense(expense_data);
  };
  console.log(status);

  const onSubmit = async (e) => {
    e.preventDefault();

    //Checking if password and phone are empty
    if (!title) {
      alert("please provide Expense title...");
      return;
    }
    //Checking if password and phone are empty
    if (!description) {
      alert("please provide Expense details...");
      return;
    }

    setLoader(true);
    const data = await fetch(url, patch_request()).catch((error) =>
      console.error(error)
    );
    if (data.status != 200) {
      alert(data.status);
    }
    setLoader(false);

    const update = await loadExpense();
    if (data.status == 200) {
      alert("Successfully Edited Expense!");
      history.push("/finance");
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

        <h2 className="text-center mb-4">Edit Expense Details:</h2>
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
          <button className="btn btn-dark btn-block">Edit Expense</button>
        </form>
      </div>
    </div>
  );
};
export default EditExpense;
