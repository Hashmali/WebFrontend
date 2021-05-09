import React from "react";
import Nav from "../Nav";
import Incomes from "./incomes/Incomes";
import Expenses from "./expenses/Expenses";

import { Tab } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

export default function FinanceManagement(props) {
  const panes = [
    {
      menuItem: "Incomes",
      render: () => <Incomes token={props.token} id={props.id} />,
    },
    {
      menuItem: "Expenses",
      render: () => <Expenses token={props.token} id={props.id} />,
    },
  ];

  return (
    <div>
      <Nav activeItem="Finance" token={props.token} />
      <Tab
        menu={{
          color: "black",
          inverted: true,
          attached: false,
          tabular: false,
          style: {
            marginTop: "-14px",
            display: "flex",
            justifyContent: "center",
          },
        }}
        panes={panes}
      />
    </div>
  );
}
