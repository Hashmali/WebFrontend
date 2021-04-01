import Loader from "react-loader-spinner";
import React from "react";

export default function LoaderSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Loader type="Puff" color="#343a40" height={150} width={150} />
    </div>
  );
}
