import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import FilterTable from "react-filter-tables";
import Nav from "./Nav";

export default function Schedule(props) {
  var toke = "Token " + props.token + " ";
  const [data, setData] = React.useState([]);
  const [report, setReport] = React.useState({
    title: "fifth test",
    description: "this is the fourth test ",
    date: "2020-12-09",
    start_hour: "01:09",
    ending_hour: "02:09",
    image:
      "https://en.wikipedia.org/wiki/File:Image_created_with_a_mobile_phone.png",
    worker: "1",
    project: "1",
  });
  let BACKEND_URL = "https://hashmali-backend.herokuapp.com/api/report/";
  const fetchReports = () => {
    let url = new URL(BACKEND_URL);
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("res " + JSON.stringify(resp));
        setData(resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  const createReport = () => {
    let url = new URL(BACKEND_URL + "create/");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("create report " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  const updateReport = (id /*expense*/) => {
    //id = prompt("enter the id");
    let url = new URL(BACKEND_URL + "1" + "/update/");
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: toke },
      body: JSON.stringify(report),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("update report " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  const deleteExpense = (id /*expense*/) => {
    //id = prompt("enter the id");
    let url = new URL(BACKEND_URL + "5" + "/update/");
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: toke },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("delete report " + resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  useEffect(() => {
    fetchReports();
    createReport();
    updateReport();
    deleteExpense();
  }, []);

  console.log("data is " + data);
  return (
    <div>
      <Nav activeItem="Schedule" />
      <h1> i am the schedule</h1>
      <h1>{props.token}</h1>
      <FilterTable
        data={data}
        onClick={(rowObject) => {
          console.log(rowObject);
        }}
        recordsPerPage={50}
        style={{ position: "center", minWidth: "100%" }}
        classNames={["your_css_class_1", "your_css_class_2"]}
      />
    </div>
  );
}
