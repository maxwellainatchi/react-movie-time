import React, { useState } from "react";
import Movie from "../../models/Movie";
import Rating from "../../components/Rating";
import { formStyle } from "../../utils";

export default ({ onSubmit }) => {
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
