import { useState } from "react";
import { createBook } from "../client/books";

const OfficeLibrary = () => {
  const [selectedGenre, setSelectedGenre] = useState("technical")
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const entries = [...formData.entries()];
    const book = Object.fromEntries(entries);
    if (!book.title || !book.author) {
      setError("All fields are required!")
      return
    } else if (!book.genre) {
      setError("Please select a genre!")
    } else{
      setMessage("Book added to library!")
    }

    setError("");
    createBook(book)
  };

  return (
    <form onSubmit={handleSubmit} style={{padding:"10px", backgroundColor:"#f9f9f9"}}>
      <div className="mb-3">
        <label className="form-label" htmlFor="title">Title:</label>
        <input
          className="form-control"
          name="title"
          id="title"
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="author">Author:</label>
        <input
          className="form-control"
          name="author"
          id="author"
        />
      </div>

      <p>Select your favorite fruit:</p>
      <label>
        <input type="radio" name="genre" value="technical" checked={selectedGenre === 'technical'} onChange={handleChange} /> technical
      </label>
      <br />
      <label>
        <input type="radio" name="genre" value="fiction" checked={selectedGenre === 'fiction'} onChange={handleChange} /> fiction
      </label>
      <br />
      <label>
        <input type="radio" name="genre" value="buisness" checked={selectedGenre === 'buisness'} onChange={handleChange} /> buisness
      </label>
      <br />
      {error && <p style={{ color: "red" }}><b>{error}</b></p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button type="submit">Add Book</button>
    </form >
  );
}

export default OfficeLibrary;