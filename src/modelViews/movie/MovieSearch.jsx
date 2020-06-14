import React, { useState } from "react";
import { formStyle } from "../../utils";

export default ({ onSubmit }) => {
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
