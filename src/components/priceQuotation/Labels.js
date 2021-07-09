import React from "react";
import { Annotator } from "./image-labeler-react/dist/Annotator";

export default function PdfCreate(props) {
  const items = props.items;
  var array = [];
  var testItems = ["hi", "bye"];
  return (
    <div className="App">
      <Annotator
        height={600}
        width={600}
        imageUrl={""}
        asyncSave={async (labeledData) => {
          // upload labeled data
          console.log(labeledData.boxes);
        }}
        types={
          ["בית תקע דו קטבי", "מכונת כביסה", "מנורת חירום"]
        
        
        
        
        
        
        }
        defaultType={"Cylinder"}
        defaultBoxes={array}
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
