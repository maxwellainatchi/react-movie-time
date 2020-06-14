import React from "react";
import MovieView from "./MovieView";

export default ({ movies, onClick }) => {
  if (movies.length === 0) {
    return <div>No movies</div>;
  }
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.title} onClick={() => onClick(movie)}>
          <MovieView key={movie.title} onClick={onClick} movie={movie} />
        </li>
      ))}
    </ul>
  );
};
