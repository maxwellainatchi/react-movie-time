import React, { useState, useEffect } from "react";
import ConfirmButton from "./components/ConfirmButton";
import Cookies from "js-cookie";
import "./styles.css";
import MovieAdder from "./modelViews/movie/MovieAdder";
import MovieSearch from "./modelViews/movie/MovieSearch";
import MovieList from "./modelViews/movie/MovieList";
import { useAutoSaveState } from "./utils";

export default function App() {
  const [movies, setMovies] = useAutoSaveState("movies", []);
  const [searchedMovies, setSearchedMovies] = useState([]);

  return (
    <div>
      <MovieAdder onSubmit={movie => setMovies(movies.concat(movie))} />
      <h3>List of movies{movies.length ? ` (${movies.length})` : ""}:</h3>
      <ConfirmButton title="Delete all movies" onClick={() => setMovies([])} />
      <MovieList
        movies={movies}
        onClick={movie => setMovies(movies.splice(movies.indexOf(movie), 1))}
      />
      <hr />
      <MovieSearch
        onSubmit={searchTitle => {
          const sanitize = title => title.trim().toLowerCase();
          const sanitizedSearchTitle = sanitize(searchTitle);
          setSearchedMovies(
            movies.filter(movie =>
              sanitize(movie.title).includes(sanitizedSearchTitle)
            )
          );
        }}
      />
      {searchedMovies.length ? (
        <div>
          <h3>Search Results ({searchedMovies.length}): </h3>
          <button onClick={() => setSearchedMovies([])}>
            Clear Search Results
          </button>
          <MovieList movies={searchedMovies} />
        </div>
      ) : (
        undefined
      )}
    </div>
  );
}
