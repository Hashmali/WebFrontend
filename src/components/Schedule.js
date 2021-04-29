import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import FilterTable from "react-filter-tables";
import Nav from "./Nav";

export default function Schedule(props) {
  var toke = "Token " + props.token + " ";
  const [data, setData] = React.useState([]);

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
