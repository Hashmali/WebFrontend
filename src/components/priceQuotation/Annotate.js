import React from "react";
import Nav from "../Nav";
import { Tab } from "semantic-ui-react";
import CreateQuote from "./manually/CreateQuote";

export default function FinanceManagement(props) {
  const panes = [
    {
      menuItem: "יצירת הצעת מחיר מתוך תוכנית חשמל",
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },

    {
      menuItem: "יצירת הצעת מחיר ידנית",
      render: () => <CreateQuote />,
    },
  ];

  return (
    <div>
      <Nav activeItem="Price Quote" token={props.token} />
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
