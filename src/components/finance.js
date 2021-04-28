import React, { useEffect } from "react";
import Nav from "./Nav";

export default function Finance(props) {
  const [expenses, setExpenses] = React.useState({
    amount: "56",
    description: "test new",
    month: "2020-03-14",
  });
  const [incomes, setIncomes] = React.useState({
    amount: "122",
    description: "ahmad",
    project: "2",
    month: "2012-12-12",
    image:
      "https://en.wikipedia.org/wiki/File:Image_created_with_a_mobile_phone.png",
  });

  let BACKEND_URL = "https://hashmali-backend.herokuapp.com/api/finance/";
  const fetchExpenses = () => {
    let url = new URL(BACKEND_URL + "expenses/");
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("res " + JSON.stringify(resp));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  const fetchIncomes = () => {
    let url = new URL(BACKEND_URL + "incomes/");
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("res " + JSON.stringify(resp));
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  const createExpenses = () => {
    let url = new URL(BACKEND_URL + "expenses/create/");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenses),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("create exp " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  const createIncome = () => {
    let url = new URL(BACKEND_URL + "incomes/create/");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incomes),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("create Inc " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  const updateExpense = (id /*expense*/) => {
    id = prompt("enter the id");
    let url = new URL(BACKEND_URL + id + "/expupdate/");
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: "120",
        description: "second test",
        month: "2021-08-24",
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("update exp " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  const updateIncome = (id /*expense*/) => {
    let url = new URL(BACKEND_URL + "1" + "/incupdate/");
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: "1443",
        description: "saed",
        project: "2",
        month: "2012-12-12",
        image:
          "https://en.wikipedia.org/wiki/File:Image_created_with_a_mobile_phone.png",
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("update inc " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  const deleteExpense = (id /*expense*/) => {
    id = prompt("enter the id");
    let url = new URL(BACKEND_URL + id + "/expupdate/");
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("delete exp " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  const deleteIncome = (id /*expense*/) => {
    id = prompt("enter the id");
    let url = new URL(BACKEND_URL + 1 + "/incupdate/");
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("delete inc " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  useEffect(() => {
    //fetchIncomes();
    // createIncome();
    // updateIncome();
    // deleteIncome();
    // fetchExpenses();
    //createExpenses();
    //updateExpense();
    //deleteExpense();
  }, []);

  return (
    <div>
      <Nav activeItem="Finance" />
      <h1> i am the finance</h1>
      <h1>{props.token}</h1>
    </div>
  );
}
