import ValidationError from "./ValidationError";

export default class Movie {
  static genres = [
    "Action",
    "Romance",
    "Sci-Fi",
    "Animated",
    "Comedy",
    "Crime",
    "Thriller"
  ];

  constructor({ title, genre, rating }) {
    this.title = title;
    this.genre = genre;
    this.rating = rating;
    this.sanitize();
    this.validate();
  }

  sanitize() {
    this.title = this.title.trim();
  }

  validate() {
    if (!this.title.length) {
      throw new ValidationError("Invalid title");
    }
    if (!Movie.genres.includes(this.genre)) {
      throw new ValidationError("Invalid genre");
    }
    if (this.rating < 1 || this.rating > 5) {
      throw new ValidationError("Invalid rating");
    }
  }
}
