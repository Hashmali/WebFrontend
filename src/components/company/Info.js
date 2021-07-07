import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button } from "semantic-ui-react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import PhoneAndroidSharpIcon from "@material-ui/icons/PhoneAndroidSharp";
import EmailSharpIcon from "@material-ui/icons/EmailSharp";
import BusinessSharpIcon from "@material-ui/icons/BusinessSharp";
import AssignmentIndSharpIcon from "@material-ui/icons/AssignmentIndSharp";
import Avatar from "../Avatar";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: 230,
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Info(props) {
  var toke = "Token " + props.token + " ";
  var url = "https://hashmali-backend.herokuapp.com/api/info/1/";
  var url2 = "https://hashmali-backend.herokuapp.com/api/info/1/update/";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: toke },
  };

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);

  const fetchItems = async () => {
    setLoader(true);
    const data = await fetch(url, requestOptions).catch((error) =>
      console.error(error)
    );
    console.log(JSON.stringify(data));
    const items = await data.json();
    setItems(items);
    setLoader(false);
    setStatus(data.status);
  };

  useEffect(() => {
    if (props.token) {
      fetchItems();
    }
  }, [props.token]);

  const classes = useStyles();

  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Loader></Loader>
      </div>
    );
  }
  if (status == "200") {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative"></AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <Avatar avatarUrl={items.logo} />
              </Typography>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {items.company_name}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                The {items.company_name} is a company that specialize in
                electrical and industrial work, which includes the preparation
                of electrical and communication infrastructure.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link to={`/info_edit/`}>
                      <Button icon="edit" variant="contained" color="black" />
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container justify="center">
              <Grid xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={items.manager.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Company's Manager
                    </Typography>
                    <Typography variant="h6" color="black">
                      <AssignmentIndSharpIcon />
                      {items.manager.first_name +
                        " " +
                        items.manager.second_name}
                    </Typography>
                    <Typography variant="h6" color="black">
                      <PhoneAndroidSharpIcon />
                      {items.manager.phone}
                    </Typography>

                    <Typography variant="h6" color="black">
                      <EmailSharpIcon />
                      {items.manager.email}
                    </Typography>
                    <Typography variant="h6" color="black">
                      <BusinessSharpIcon />
                      {items.manager.address}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12} sm={6} md={4} style={{ marginLeft: "30px" }}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={items.deputy_director.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Deputy Director
                    </Typography>
                    <Typography variant="h6" color="black">
                      <AssignmentIndSharpIcon />
                      {items.deputy_director.first_name +
                        " " +
                        items.deputy_director.second_name}
                    </Typography>
                    <Typography variant="h6" color="black">
                      <PhoneAndroidSharpIcon />
                      {items.deputy_director.phone}
                    </Typography>

                    <Typography variant="h6" color="black">
                      <EmailSharpIcon />
                      {items.deputy_director.email}
                    </Typography>
                    <Typography variant="h6" color="black">
                      <BusinessSharpIcon />
                      {items.deputy_director.address}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Loader></Loader>
      </div>
    );
  }
}
