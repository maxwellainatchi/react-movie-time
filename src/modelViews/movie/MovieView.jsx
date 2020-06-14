import React from "react";

export default ({ movie, onClick }) => {
  return (
    <span onClick={() => onClick(movie)}>
      {movie.title} : {movie.genre} | {movie.rating}
    </span>
  );
};
