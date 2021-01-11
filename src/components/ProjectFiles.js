import React,{useState,useEffect} from 'react';
import Table from "react-bootstrap/Table";
import TableScrollbar from 'react-table-scrollbar';



function List(props){
const items=props.arr
var array=[]
var obj={}

items.map((item,index)=>
  item.file.map((sub)=>
{
  obj["id"]=sub.id
  obj["project_code"]=sub.project_code
  obj["name"]=sub.name
  obj["id"]=sub.uploaded_at
  obj["file1"]=sub.file1
 
array.push(obj)
 // console.log(sub.id,sub.project_code,sub.name,sub.uploaded_at,sub.file1)
}
  )
    )
    console.log(array)
  return(<div></div>);


}
export default  List;

