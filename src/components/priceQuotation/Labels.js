import React, { useState, useEffect } from "react";
import { Annotator } from "./image-labeler-react/dist/Annotator";
import PdfCreate from "./manually/PdfCreate";
export default function Labels(props) {
  const items = props.items;
  const [inputFields, setInputFields] = useState([]);
  const [status, setStatus] = useState(false);





  useEffect(() => {
    if(inputFields.length>0)
    {
      console.log(inputFields)
      setStatus(true);
    }

  }, [inputFields]);




  return (
    <div className="App">
     
     <PdfCreate data={inputFields} sum={200} fee={17} setStatus={setStatus} status={status} hide={true}/>

      <Annotator
        height={600}
        width={600}
        imageUrl={""}
        asyncSave={async (labeledData) => {
          console.log(labeledData.boxes)
     
          /*Activate Later
          // upload labeled data
          var array = [];
          labeledData.boxes.map((item, index) => {
            let obj = {};
            obj["jobDescription"] = item.annotation;
            obj["plan"] = "";
            obj["actual"] = "";
            obj["pricePerUnit"] = "";
            obj["total"] = "";
            array.push(obj);
          });
         setInputFields(array);
     */
     
        }}
        types={
          ["בית תקע דו קטבי", "מכונת כביסה", "מנורת חירום"]
        }
        defaultType={"מכונת כביסה"}
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
