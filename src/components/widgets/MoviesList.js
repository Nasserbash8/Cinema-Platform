import { lazy ,Suspense, useState,useEffect} from "react";
import { Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import FeauterdMovies from "./FeauterdMovies";



function MoviesList() {
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
 
 
  return (
   
    loading ? (
      <h1>Loading...</h1>
    ) : (
      <Row>
        {movies.map((movie) => (
          <FeauterdMovies key={movie.id} movie={movie} />
        ))}
      </Row>
    )
   
  )
}

export default MoviesList