import React, { useState, useEffect } from "react";
import { Annotator } from "./image-labeler-react/dist/Annotator";
import PdfCreate from "./manually/PdfCreate";
export default function Labels(props) {
  const items = props.items;
  const [inputFields, setInputFields] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (inputFields.length > 0) {
      console.log(inputFields);
      setStatus(true);
    }
  }, [inputFields]);

  return (
    <div className="App">
      <PdfCreate
        data={inputFields}
        sum={200}
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
          console.log(labeledData.boxes);

          /*
          //Activate Later
          // upload labeled data
          var array = [];
          labeledData.boxes.map((item, index) => {
            let obj = {};
            obj["jobDescription"] = item.annotation;
            obj["plan"] = "";
            obj["actual"] = "";
            obj["pricePerUnit"] =  item.price;
            obj["total"] = "";
            array.push(obj);
          });
         setInputFields(array);
             */
        }}
        types={[
          {
            item: "בית תקע דו קטבי",
            price: "10",
            photo:
              "https://i.pinimg.com/originals/7a/1b/47/7a1b4776e95e6ad87504976907b664d1.jpg",
          },
          {
            item: "מכונת כביסה",
            price: "12",
            photo:
              "https://www.pngitem.com/pimgs/m/510-5102492_sasuke-uchiha-png-transparent-sasuke-uchiha-png-png.png",
          },
          {
            item: "מנורת חירום",
            price: "15",
            photo:
              "https://www.kindpng.com/picc/m/705-7050505_i-mage-madara-uchiha-png-transparent-png.png",
          },
        ]}
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
