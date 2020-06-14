import React from "react";

export default ({ value: rating, onChange: setRating, starCount = 5 }) => {
  return (
    <span>
      <label>
        Rating ({rating} star{rating === 1 ? "" : "s"}):{" "}
      </label>
      {[...Array(starCount)].map((_, i) => (
        <span
          style={{ color: rating > i ? "#FFDF00" : "gray" }}
          role="img"
          aria-label="star"
          key={i}
          onClick={() => setRating(i + 1)}
        >
          {rating > i ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
};
