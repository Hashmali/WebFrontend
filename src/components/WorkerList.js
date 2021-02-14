import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Avatar from './Avatar'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, lastName, id, id_photo, phone, email,profile) {
  return {
    name,
    lastName,
    id,
    id_photo,
    phone,
    email,
    profile,
    details: [
      { type: '2020-01-05', age: '11091700', password: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.first_name}
        </TableCell>
        <TableCell align="left">{row.second_name}</TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left"><Avatar avatarUrl={row.id_photo}/></TableCell>
        
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left"><Avatar avatarUrl={row.image}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More Details:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Worker Type</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell align="left">Password</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">Pay Per Day</TableCell>
                    <TableCell align="left">Driving License</TableCell>
                    <TableCell align="left">Isreal License</TableCell>
                    <TableCell align="left">Isreal License Type</TableCell>
                    <TableCell align="left">Isreal License Expire</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                   <TableRow>
                      <TableCell component="th" scope="row">
                        {row.is_staff}
                      </TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell align="left">{row.password}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.pay_per_day}</TableCell>
                      <TableCell align="left">{row.driving_license_img}</TableCell>
                      <TableCell align="left">{row.work_license_israel}</TableCell>
                      <TableCell align="left">{row.work_license_type}</TableCell>
                      <TableCell align="left">{row.work_license_expire}</TableCell>
                    </TableRow>
                
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const rows2 = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99,50),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99,67),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79,75),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5,53),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5,53),
];

const rows = [
{name:"saed",lastName:"Jaber",id:"208480632",id_photo:"LATER",phone:"0525663961",email:"saedja@post.jce.ac.il",profile:"later"},
{name:"saed",lastName:"Jaber",id:"208480632",id_photo:"LATER",phone:"0525663961",email:"saedja@post.jce.ac.il",profile:"later"},

];

export default function CollapsibleTable(props) {
  useEffect(()=>{
    fetchItems();
  },[]);
  var toke="Token " + props.tok+" "

  const requestOptions =
 {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
  'Authorization' : toke,}
};
  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")

  const fetchItems= async ()=>{

    const data=await fetch('http://127.0.0.1:8000/api/worker/',requestOptions).catch(error=>console.error(error));
     setStatus(data.status)
    const items=await data.json();
    setItems(items);
    };
    console.log(status)
    if(status==200){
           return (
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell >Name</TableCell>
                      <TableCell align="left">Last Name</TableCell>
                      <TableCell align="left">ID</TableCell>
                      <TableCell align="left">ID PHOTO</TableCell>
                      <TableCell align="left">PHONE</TableCell>
                      <TableCell align="left">EMAIL</TableCell>
                      <TableCell align="left">Profile</TableCell>
                          </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((row) => (
                      <Row key={row.id} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );

          }
  else{

  return(
  <div>
  <h1>rendering...</h1>
    
  </div>

  );

  }

}







/* 

function List(props){
  useEffect(()=>{
    fetchItems();
  },[]);
  var toke="Token " + props.tok+" "

  const requestOptions =
 {
  method: 'GET',
  headers: { 'Content-Type': 'application/json',
  'Authorization' : toke,}
};
  const [items,setItems]=useState([])
  const [status,setStatus]=useState("")

  const fetchItems= async ()=>{

    const data=await fetch('http://127.0.0.1:8000/api/worker/',requestOptions).catch(error=>console.error(error));
     setStatus(data.status)
    const items=await data.json();
    setItems(items);
    };
    console.log(status)
    if(status==200){

      return(
      <div>
    <TableScrollbar  height="500px">

<Table striped bordered hover variant="light" >
     <thead>
       <tr>
         <th>isAdmin?</th>
         <th>photo</th>
         <th>Name</th>
         <th>LastName</th>
         <th>Age</th>
         <th>IDCard</th>
         <th>phone</th>
         <th>Email</th>
         <th>App Password</th>
         <th>Address</th>
         <th>Pay Per Day</th>
         <th>Israel License</th>
         <th>Israel License Type</th>
         <th>Israel License Expire</th>
       </tr>
    </thead>

          <tbody>
     
     {
     
     items.map((item,index)=>(
       <tr key={item.phone}>
         <td>{item.is_staff}</td>
         <td><Avatar avatarUrl={item.image}/></td>
         <td>{item.first_name}</td>
         <td>{item.second_name}</td>
         <td>{item.age}</td>
         <td>{item.id_no}<br></br> <Avatar avatarUrl={item.id_img}/></td>
         <td>{item.phone}</td>
         <td>{item.email}</td>
         <td>{item.password}</td>
         <td>{item.address}</td>
         <td>{item.pay_per_day}</td>
         <td>{item.work_license_israel}</td>
         <td>{item.work_license_type}</td>
         <td>{item.work_license_expire}</td>

       </tr>
     ))}
      </tbody>

   </Table>
   </TableScrollbar>
       
     
      </div>
    );
  }
  else{
    return(<h1>You do not have permission to perform this action</h1>);
  }

}
export default  List;

*/
