import React,{useState} from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PdfCreate(props) {
  const items=props.data
  var array=[]
  items.map((item,index)=>{
    let obj={}
    obj["jobDescription"]=item.jobDescription
    obj["plan"]=item.plan
    obj["actual"]=item.actual
    obj["pricePerUnit"]=item.pricePerUnit
    obj["total"]=item.total
    array.push(obj)
  })



const exportPDF=()=>{
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(15);
  const title = "My Awesome Report";
  const headers = [["jobDescription", "profession","plan","actual","pricePerUnit","total"]];
  const data = array.map(item=> [
    item.jobDescription,
    item.profession,
    item.plan,
    item.actual,
    item.pricePerUnit,
    item.total]
     );
     let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }
   
  return (
    <div>
    <button onClick={() => exportPDF()}>Generate Report</button>
  </div>
    );


}
    








