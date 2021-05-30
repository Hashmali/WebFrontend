import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AddIcon from "@material-ui/icons/Add";

import Icon from "@material-ui/core/Icon";
//import "./CreateProject.css";
import PdfCreate from "./PdfCreate";
import { Prev } from "react-bootstrap/esm/PageItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0.4),
    },
  },
  formControl: {
    margin: theme.spacing(0.4),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  const [update, setUpdate] = useState(false);

  const [inputFields, setInputFields] = useState([
    { jobDescription: "", plan: "", actual: "", pricePerUnit: "", total: "" },
  ]);

  const handleSubmit = () => {
    console.log("InputFields", inputFields);
    let sumValues = 0;
    let total = 0;
    let pricePerUnit = 1;
    for (let i = 0; i < inputFields.length; i++) {
      if (!inputFields[i].total) {
        total = 0;
      } else {
        total = Number(inputFields[i].total);
      }
      total = Number(inputFields[i].total);
      sumValues += total;
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
    setUpdate(true);
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  useEffect(() => {
    if (update == true) {
      handleSubmit();
      setUpdate(false);
    }

    handleSubmit();
  }, [update, inputFields[inputFields.length - 1].total]);

  return (
    <div>
      <h1
        style={{
          direction: "rtl",
          textAlign: "center",
        }}
      >
        יצירת הצעת מחיר
      </h1>
      <Container
        style={{
          direction: "rtl",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField, index) => (
            <div key={index}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                  בחר מרשימה
                </InputLabel>
                <Select
                  name="jobDescription"
                  labelId="demo-simple-select-helper-label"
                  variant="filled"
                  value={inputField.jobDescription}
                  onChange={(event) => handleChangeInput(index, event)}
                >
                  <MenuItem
                    value={"נקודת תאורת קיר/תקרא"}
                    style={{ direction: "rtl" }}
                  >
                    נקודת תאורת קיר/תקרא
                  </MenuItem>

                  <MenuItem
                    value={"שקע יחיד רגיל"}
                    style={{ direction: "rtl" }}
                  >
                    שקע יחיד רגיל
                  </MenuItem>

                  <MenuItem
                    value={"שקע כפול רגיל"}
                    style={{ direction: "rtl" }}
                  >
                    שקע כפול רגיל
                  </MenuItem>

                  <MenuItem
                    value={"שקע יחיד מוגן מים רגיל"}
                    style={{ direction: "rtl" }}
                  >
                    שקע יחיד מוגן מים רגיל
                  </MenuItem>

                  <MenuItem
                    value={"שקע כפול רגיל מוגן מים"}
                    style={{ direction: "rtl" }}
                  >
                    שקע כפול רגיל מוגן מים{" "}
                  </MenuItem>

                  <MenuItem value={"שקע כוח יחיד"} style={{ direction: "rtl" }}>
                    שקע כוח יחיד
                  </MenuItem>
                  <MenuItem value={"שקע כוח כפול"} style={{ direction: "rtl" }}>
                    שקע כוח כפול
                  </MenuItem>

                  <MenuItem value={"שקע טלפון"} style={{ direction: "rtl" }}>
                    שקע טלפון
                  </MenuItem>

                  <MenuItem value={"שקע טלוויזיה"} style={{ direction: "rtl" }}>
                    שקע טלוויזיה
                  </MenuItem>
                  <MenuItem value={"מפסק תריס"} style={{ direction: "rtl" }}>
                    מפסק תריס
                  </MenuItem>
                  <MenuItem value={"מפסק מחליף"} style={{ direction: "rtl" }}>
                    מפסק מחליף
                  </MenuItem>
                  <MenuItem
                    value={"נק' 3 פאז+ פקט"}
                    style={{ direction: "rtl" }}
                  >
                    נק' 3 פאז+ פקט
                  </MenuItem>
                  <MenuItem value={"רמקולים"} style={{ direction: "rtl" }}>
                    רמקולים
                  </MenuItem>
                  <MenuItem value={"פלאזמה"} style={{ direction: "rtl" }}>
                    פלאזמה
                  </MenuItem>

                  <MenuItem
                    value={"נקודת מחשב כולל שקע"}
                    style={{ direction: "rtl" }}
                  >
                    נקודת מחשב כולל שקע
                  </MenuItem>
                  <MenuItem
                    value={"נקודת דוד חמום מפסק דו קטבי"}
                    style={{ direction: "rtl" }}
                  >
                    נקודת דוד חמום מפסק דו קטבי
                  </MenuItem>

                  <MenuItem value={"תנור אמבאטיה"} style={{ direction: "rtl" }}>
                    תנור אמבאטיה
                  </MenuItem>
                  <MenuItem
                    value={"פעמון כלל לחצן"}
                    style={{ direction: "rtl" }}
                  >
                    פעמון כלל לחצן
                  </MenuItem>

                  <MenuItem
                    value={"אנטרקום הכנה בלבד"}
                    style={{ direction: "rtl" }}
                  >
                    אנטרקום הכנה בלבד
                  </MenuItem>
                  <MenuItem
                    value={"נקודות אזעקה הכנה בלבד"}
                    style={{ direction: "rtl" }}
                  >
                    נקודות אזעקה הכנה בלבד
                  </MenuItem>
                  <MenuItem
                    value={"נקודת חימום רצפה"}
                    style={{ direction: "rtl" }}
                  >
                    נקודת חימום רצפה
                  </MenuItem>
                  <MenuItem
                    value={"לוח חשמל ראשי קומפלט"}
                    style={{ direction: "rtl" }}
                  >
                    לוח חשמל ראשי קומפלט
                  </MenuItem>

                  <MenuItem
                    value={"לוח חשמל משני קומפלט"}
                    style={{ direction: "rtl" }}
                  >
                    לוח חשמל משני קומפלט
                  </MenuItem>

                  <MenuItem value={"ריכוז תקשורת"} style={{ direction: "rtl" }}>
                    ריכוז תקשורת
                  </MenuItem>

                  <MenuItem value={"הארקת יסוד"} style={{ direction: "rtl" }}>
                    הארקת יסוד
                  </MenuItem>
                  <MenuItem value={"התקנת גופים"} style={{ direction: "rtl" }}>
                    התקנת גופים
                  </MenuItem>
                  <MenuItem
                    value={"קוי הזנה לבזק כולל צינור כבל גל 5 זוג"}
                    style={{ direction: "rtl" }}
                  >
                    קוי הזנה לבזק כולל צינור כבל גל 5 זוג
                  </MenuItem>
                  <MenuItem
                    value={"הכנת קוו כבלים"}
                    style={{ direction: "rtl" }}
                  >
                    הכנת קוו כבלים
                  </MenuItem>

                  <MenuItem
                    value={" קוי הזנה 10 כפול 5 ראשי"}
                    style={{ direction: "rtl" }}
                  >
                    קוי הזנה 10 כפול 5 ראשי
                  </MenuItem>
                  <MenuItem
                    value={"הכנת חשמל זמני"}
                    style={{ direction: "rtl" }}
                  >
                    הכנת חשמל זמני
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="text"
                name="jobDescription"
                label="תיאור העבודה"
                variant="filled"
                value={inputField.jobDescription}
                onChange={(event) => handleChangeInput(index, event)}
              />

              <TextField
                type="number"
                name="plan"
                label="בתוכנית"
                variant="filled"
                value={inputField.plan}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                type="number"
                name="actual"
                label="בפועל"
                variant="filled"
                value={inputField.actual}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                type="number"
                name="pricePerUnit"
                label="מחיר יחידה"
                variant="filled"
                value={inputField.pricePerUnit}
                onChange={(event) => handleChangeInput(index, event)}
              />

              <TextField
                name="total"
                label="סכום"
                variant="filled"
                value={
                  (inputField.total =
                    inputField.pricePerUnit * inputField.actual)
                }
                onChange={(event) => handleChangeInput(index, event)}
              />

              {index == 0 ? (
                <IconButton onClick={() => handleAddFields()}>
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleRemoveFields(index)}>
                  <RemoveIcon />
                </IconButton>
              )}

              <IconButton onClick={() => handleAddFields()}>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <h1 style={{ direction: "rtl", textAlign: "left" }}>
            סה"כ כולל:{" " + sum}
          </h1>
        </form>
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <Button
          size="big"
          color="black"
          type="submit"
          icon="refresh"
          onClick={handleSubmit}
          style={{ marginLeft: "10px" }}
        />
        <PdfCreate data={inputFields} />
      </div>
    </div>
  );
}
