import React from "react";
import { Link } from "react-router-dom";

//book component for each book card on the sliders
const BookCard = ({
  book, //the book form array
  handleBookSelect, //to set the selectedBook state when clicked on it
  trending, //for showing available button only for the other sliders except the trending one
}) => {
  return (
    <div
      className={`slide`}
      onClick={() => {
        handleBookSelect(book);
      }}
    >
      <div className="img">
        <img src={book.image} alt="Books" />
      </div>
      <div className="heading">
        <h4>Featured Books</h4>
      </div>
      {trending ? null : (
        <div className="button">
          <Link to="/book">
            <button>Available</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookCard;
