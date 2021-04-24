import React, { useState, useEffect, useRef } from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import IframeResizer from "iframe-resizer-react";

import Nav from "./Nav";

export default function Annotate(props) {
  const viewer = useRef(null);
  const [pdfInfo, setPdfInfo] = useState([]);

  const modifyPdf = async function modifyPdf() {
    const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText("This text was added with JavaScript!", {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });
    const pdfBytes = await pdfDoc.save();
    console.log(pdfBytes);
    var bytes = new Uint8Array(pdfBytes); // pass your byte response to this constructor
    var blob = new Blob([bytes], { type: "application/pdf" }); // change resultByte to bytes
    const docUrl = URL.createObjectURL(blob);
    setPdfInfo(docUrl);
    console.log(docUrl);
  };

  const handleFileSelected = (e) => {
    var file = e.target.files[0];
  };

  useEffect(() => {
    modifyPdf();
  }, []);

  console.log(props.token);
  return (
    <div>
      <Nav />
      <input onChange={handleFileSelected} type="file" />

      <>
        {
          <IframeResizer
            title="test-frame"
            src={pdfInfo}
            ref={viewer}
            type="application/pdf"
            style={{
              width: "100px",
              minWidth: "100%",
              height: "800px",
              minHeight: "100%",
            }}
          />
        }
      </>
      <h1> this is the Annotate page</h1>
      <h1>{props.token}</h1>
    </div>
  );
}
