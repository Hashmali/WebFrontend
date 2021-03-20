import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TableScrollbar from "react-table-scrollbar";
import Avatar from "./Avatar.js";

function List(props) {
  const items = props.arr;
  var array = [];

  items.map((item, index) =>
    item.file.map((sub) => {
      let obj = {};
      obj["id"] = sub.id;
      obj["project_code"] = sub.project_code;
      obj["name"] = sub.name;
      obj["uploaded_at"] = sub.uploaded_at;
      obj["file1"] = sub.file1;
      array.push(obj);
      // console.log(sub.id,sub.project_code,sub.name,sub.uploaded_at,sub.file1)
    })
  );
  return (
    <tbody>
      {array.map((item) => (
        <tr>
          <td>{item.project_code}</td>

          <td>{item.id}</td>
          <td>{item.name}</td>

          <td>{item.uploaded_at}</td>
          <td>
            <Avatar avatarUrl={item.file1} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
export default List;
