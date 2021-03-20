import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import "./CreateProject.css";
import PdfCreate from "./PdfCreate";
import { Prev } from "react-bootstrap/esm/PageItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0.4),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CreateProject(props) {
  const classes = useStyles();
  console.log("Token");
  var toke = "Token " + props.tok + " ";
  const [sum, setSum] = useState(0);
  const [clicked, setClicked] = useState(false);

  const [inputFields, setInputFields] = useState([
    { jobDescription: "", plan: "", actual: "", pricePerUnit: "", total: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(!clicked);
    console.log("InputFields", inputFields);
    let sumValues = 0;
    let total = 0;
    let pricePerUnit = 1;
    for (let i = 0; i < inputFields.length; i++) {
      if (!inputFields[i].pricePerUnit) {
        pricePerUnit = 1;
      } else {
        pricePerUnit = Number(inputFields[i].pricePerUnit);
      }
      if (!inputFields[i].total) {
        total = 0;
      } else {
        total = Number(inputFields[i].total);
      }
      total = Number(inputFields[i].total);
      sumValues += total * pricePerUnit;
      setSum(sumValues);
    }
    console.log(sum);
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { jobDescription: "", plan: "", actual: "", pricePerUnit: "", total: "" },
    ]);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputFields];

    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <Container>
      <h1>Create Quote :</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <TextField
              name="jobDescription"
              label="jobDescription"
              variant="filled"
              value={inputField.jobDescription}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              name="plan"
              label="plan"
              variant="filled"
              value={inputField.plan}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              name="actual"
              label="actual"
              variant="filled"
              value={inputField.actual}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              name="pricePerUnit"
              label="pricePerUnit"
              variant="filled"
              value={inputField.pricePerUnit}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              name="total"
              label="total"
              variant="filled"
              value={inputField.total}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <IconButton onClick={() => handleRemoveFields(index)}>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => handleAddFields()}>
              <AddIcon />
            </IconButton>
          </div>
        ))}

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
      <h1>Sum:{sum}</h1>
      {clicked && <PdfCreate data={inputFields} />}
    </Container>
  );
}
