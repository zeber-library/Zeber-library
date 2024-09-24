import React from "react";
import { Link } from "react-router-dom";
//Aboutbook Component
//since the book Array yet containes only images yet , the rest data is hard coded

//receving props from the Library.jsx
const AboutBookComponent = ({
  book, //the book selected
  handleClose, // function to close the aboutbook conatiner
}) => {
  return (
    <div className="BookContainer">
      <div className="AboutBook">
        <div className="heading">
          {/*close span */}
          <span className="close" onClick={handleClose}>
            <i className="fa fa-xmark"></i>
          </span>
          <h3>About this book</h3>
        </div>
        {/*book image */}
        <div className="image">
          <img src={book.image} alt="Book" />
        </div>

        {/**book details  */}
        <div className="bookDetails">
          <h4>Book Name</h4>
          <span>Author Name</span>
        </div>

        {/**rating  */}
        <div className="rating-stars">
          {[...Array(4)].map((_, index) => (
            <i key={index} className="fas fa-star"></i>
          ))}
          <i className="fas fa-star-half-alt"></i>
          <span className="rating-text">4/5</span>
        </div>

        {/*book genre  */}
        <div className="genre">
          <span>THRILLER | ACTION | SAD</span>
        </div>
        <Link to="/book">
          <button>
            <i className="fa fa-book"></i> Read Now
          </button>
        </Link>

        {/*book paragraph */}
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
          eum nostrum nulla. Excepturi deleniti quod fugiat veniam provident
          nisi, commodi id fuga, dolor sapiente obcaecati iusto quisquam iste
          facere saepe!
        </p>
      </div>
    </div>
  );
};

export default AboutBookComponent;
