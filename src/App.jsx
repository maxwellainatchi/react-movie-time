import React, { useState } from "react";
import Rating from "./Rating";
import Movie from "./models/Movie";
import TabBar, { Page } from "./TabBar";
import "./styles.css";

const MovieView = ({ movie, onClick }) => {
  return (
    <span onClick={() => onClick(movie)}>
      {movie.title} : {movie.genre} | {movie.rating}
    </span>
  );
};

const MovieAdd = ({ onSubmit }) => {
  const defaultTitle = null;
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
    <form
      onSubmit={submitHandler}
      onReset={resetHandler}
      style={{ border: "2px solid black", padding: "5px" }}
    >
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
        <li onClick={() => onClick(movie)}>
          <MovieView key={movie.title} onClick={onClick} movie={movie} />
        </li>
      ))}
    </ul>
  );
};

const MovieAddPage = ({ movies, addMovie, removeMovie }) => {
  return (
    <div>
      <MovieAdd onSubmit={addMovie} />
      <h3>List of movies{movies.length ? ` (${movies.length})` : ""}:</h3>
      <MovieList movies={movies} onClick={removeMovie} />
    </div>
  );
};

export default function App() {
  const [movies, setMovies] = useState([]);

  return (
    <TabBar
      pages={[
        new Page(
          "Add Movie",
          (
            <MovieAddPage
              movies={movies}
              addMovie={movie => setMovies(movies.concat(movie))}
              removeMovie={movie =>
                setMovies(movies.splice(movies.indexOf(movie), 1))
              }
            />
          )
        ),
        new Page("Search Movie")
      ]}
    />
  );
}
