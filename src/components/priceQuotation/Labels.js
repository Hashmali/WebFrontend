import React, { useState, useEffect } from "react";
import { Annotator } from "./image-labeler-react/dist/Annotator";
import PdfCreate from "./manually/PdfCreate";
import symbols from "../priceQuotation/symbols.js";
export default function Labels(props) {
  // console.log(symbols);
  const items = props.items;
  const [inputFields, setInputFields] = useState([]);
  const [status, setStatus] = useState(false);
  const [sum, setSum] = useState(0);

  //const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  useEffect(() => {
    if (inputFields.length > 0) {
      let count = 0;
      //console.log(inputFields);
      //console.log(inputFields);
      inputFields.map((item) => {
        count = count + item.total;
      });
      setSum(count);
      setStatus(true);
    }
  }, [inputFields]);

  return (
    <div className="App">
      <PdfCreate
        data={inputFields}
        sum={sum}
        fee={17}
        setStatus={setStatus}
        status={status}
        hide={true}
      />

      <Annotator
        height={600}
        width={600}
        imageUrl={""}
        asyncSave={async (labeledData) => {
          // console.log(labeledData.boxes);

          //Activate Later
          // upload labeled data
          var array = [];
          labeledData.boxes.map((item, index) => {
            let obj = {};
            obj["jobDescription"] = item.annotation;
            obj["plan"] = "1";
            obj["actual"] = "1";
            obj["pricePerUnit"] = item.price;
            obj["total"] = item.price;
            array.push(obj);
          });
          setInputFields(array);
        }}
        types={symbols}
      />
    </div>
  );
}
/*
import React from "react";
import { Annotator } from "image-labeler-react";
export default function PdfCreate(props) {
  const items = props.items;
  var array = [];
  var testItems = ["hi", "bye"];
  return (
    <div className="App">
      <Annotator
        height={600}
        width={600}
        imageUrl={
          "https://e1.pngegg.com/pngimages/234/293/png-clipart-render-naruto-uzumaki-naruto.png"
        }
        asyncUpload={async (labeledData) => {
          // upload labeled data
          console.log(labeledData.boxes);
        }}
        types={["שלום", "B", "Cylinder"]}
        defaultType={"Cylinder"}
        defaultBoxes={array}
      />
    </div>
  );
}





*/
