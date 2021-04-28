import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import FilterTable from "react-filter-tables";
import Nav from "./Nav";

export default function Schedule(props) {
  const [data, setData] = React.useState([]);
  let BACKEND_URL = "https://hashmali-backend.herokuapp.com/api/report/";
  const fetchReports = () => {
    let url = new URL(BACKEND_URL);
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("res " + JSON.stringify(resp));
        setData(...data, resp);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  // let data = [
  //   {
  //     "First Name": 1,
  //     "Last Name": "test",
  //     DATE: "alan",
  //     "Start Hour": "abcd123",
  //     "Finish Hour": "abcd123",
  //     Project: "abcd123",
  //     Description: "nedw",
  //     "View images": "images",
  //     Action: "images",
  //   },
  // ];

  useEffect(() => {
    fetchReports();
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
        recordsPerPage={8}
        style={{ position: "center", minWidth: "100%" }}
        classNames={["your_css_class_1", "your_css_class_2"]}
      />
    </div>
  );
}
