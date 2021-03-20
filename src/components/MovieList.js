import react, { useState } from "react";
import Movie from "./Movie.js";
const name = "depoly";
const price = "10$";
const MovieList = (props) => (
  <section>
    <Movie me={name} ke={price} />
  </section>
);
export default MovieList;
