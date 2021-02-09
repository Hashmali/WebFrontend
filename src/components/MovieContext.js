import React,{useState,createContext} from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';

export const MovieContext=createContext();

export const MovieProvider=props=>{
  const [movies,setMovies]=useState([
    {name:'Harry Poter',Price:"10$",id:23124},
    {name:'Game of Thrones',Price:"10$",id:2566124},
    {name:'Inception',Price:"10$",id:23524}
     ]);






  return(
<MovieContext.Provider value={"helloo"}>
{props.children}

</MovieContext.Provider>

  );

}