import React, { useState } from "react";
import Rating from "./Rating";
import Movie from "./models/Movie";
import ConfirmButton from "./ConfirmButton";
import "./styles.css";

const formStyle = { border: "2px solid black", padding: "5px" };

const MovieView = ({ movie, onClick }) => {
  return (
    <span onClick={() => onClick(movie)}>
      {movie.title} : {movie.genre} | {movie.rating}
    </span>
  );
};

const MovieAdd = ({ onSubmit }) => {
  const defaultTitle = "";
  const defaultGenre = Movie.genres[0];
  const defaultRating = 5;

  const [title, setTitle] = useState(defaultTitle);
  const [genre, setGenre] = useState(defaultGenre);
  const [rating, setRating] = useState(defaultRating);

  const submitHandler = e => {
    e.preventDefault();
    e.target.reset();
    onSubmit(
      new Movie({
        title,
        genre,
        rating
      })
    );
  };

  const resetHandler = () => {
    setTitle(defaultTitle);
    setGenre(defaultGenre);
    setRating(defaultRating);
  };

  return (
    <form onSubmit={submitHandler} onReset={resetHandler} style={formStyle}>
      <h2>Add a movie: </h2>
      <label>Title: </label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <br />
      <label>Genre: </label>
      <select value={genre} onChange={e => setGenre(e.target.value)}>
        {Movie.genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <br />
      <Rating onChange={setRating} value={rating} />
      <br />
      <input type="submit" value="Submit" />
      <input type="reset" />
    </form>
  );
};

const MovieList = ({ movies, onClick }) => {
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

const MovieSearch = ({ onSubmit }) => {
  const [searchTitle, setSearchTitle] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    e.target.reset();
    onSubmit(searchTitle);
  };

  const resetHandler = () => {
    setSearchTitle("");
  };

  return (
    <form onSubmit={submitHandler} onReset={resetHandler} style={formStyle}>
      <h2>Search for a movie: </h2>
      <label>Title: </label>
      <input
        type="text"
        value={searchTitle}
        onChange={e => setSearchTitle(e.target.value)}
        required
      />
      <br />
      <input type="submit" value="Search" />
      <input type="reset" />
    </form>
  );
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);

  return (
    <div>
      <MovieAdd onSubmit={movie => setMovies(movies.concat(movie))} />
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
