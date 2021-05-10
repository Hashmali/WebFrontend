import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { Button } from "semantic-ui-react";
import SystemUpdateAltSharpIcon from "@material-ui/icons/SystemUpdateAltSharp";
export default function PdfCreate(props) {
  function fix(str) {
    return str.split("").reverse().join("");
  }

  const items = props.data;
  var array = [];
  items.map((item, index) => {
    let obj = {};
    obj["jobDescription"] = item.jobDescription;
    obj["plan"] = item.plan;
    obj["actual"] = item.actual;
    obj["pricePerUnit"] = item.pricePerUnit;
    obj["total"] = item.total;
    array.push(obj);
  });

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.addFont("./jspdfHebrewSupport/David-normal.ttf", "David", "normal");
    doc.setFont("David");

    doc.setFontSize(15);
    const headers = [
      [
        "jobDescription",
        "profession",
        "plan",
        "actual",
        "pricePerUnit",
        "total",
      ],
    ];
    const data = array.map((item) => [
      item.jobDescription,
      item.profession,
      item.plan,
      item.actual,
      item.pricePerUnit,
      item.total,
    ]);
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };
    const tableColumn = [
      "שם עובד",
      "מספר פרויקט",
      "תאריך דיוח",
      "כניסה",
      "יציאה",
      "תיאור",
    ];
    const tableRows = ["מספר פרויקט", "תאריך דיוח", "כניסה", "יציאה", ""];
    const fixTableRows = [
      fix(tableRows[0]),
      fix(tableRows[1]),
      fix(tableRows[2]),
      fix(tableRows[3]),
    ];
    console.log(fixTableRows);
    let title = "הצעת מחיר";
    doc.text(fix(title), marginLeft, 40, {
      styles: {
        font: "David",
        align: "left",
        isSymmetricSwapping: true,
        isInputVisual: true,
        isOutputVisual: false,
      },
    });

    doc.autoTable(content);

    doc.save("price.pdf");
  };

  return (
    <div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      <table id="table-to-xls">
        <tr>
          <th>סכום</th>
          <th>מחיר יחידה</th>
          <th>בפועל</th>
          <th>בתוכנית</th>
          <th>תיאור העבודה</th>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
          <td>94</td>
          <td>94</td>

          <td>94</td>
        </tr>
      </table>
    </div>
  );
}
