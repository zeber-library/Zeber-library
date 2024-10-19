import React, { useState, useEffect } from "react";
import FileUpload from "../FileUpload";
import Button from "../Button/Button";
import axios from "axios";
import { X } from 'lucide-react';
import EmailTrackingForm from '../EmailTrackingForm';
import './form.css'; // Import the CSS file

export default function Form({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    genre: "",
    bookImage: null,
    bookPDF: null,
  });

  const [resetTrigger, setResetTrigger] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (file, type) => {
    setFormData({
      ...formData,
      [type]: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResetTrigger((prev) => !prev);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("genre", formData.genre);
    data.append("bookImage", formData.bookImage);
    data.append("bookPDF", formData.bookPDF);

    axios
      .post("http://localhost:3000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.message || "Book uploaded successfully!");
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        alert("Error uploading book");
      });
  };

  useEffect(() => {
    if (resetTrigger) {
      setFormData({
        name: "",
        author: "",
        description: "",
        genre: "",
        bookImage: null,
        bookPDF: null,
      });

      setResetTrigger(false);
    }
  }, [resetTrigger]);

  return (
    <div className="upload-book-overlay">
      <div className="form-container">
        <button 
          onClick={onClose}
          className="close-button"
        >
          <X size={30}/>
        </button>
        
        {isSubmitted ? (
          <div className="submitted-container">
            <h2 className="title">Book Under Review</h2>
            <p className="text">Thank you for your submission. Your book is currently under review.</p>
            <EmailTrackingForm />
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="title">Upload Your Books</h2>

            <div className="upload-container">
              <FileUpload
                fileType="cover Image"
                file={formData.bookImage}
                onFileChange={(file) => handleFileChange(file, "bookImage")}
              />
              <FileUpload
                fileType="book PDF"
                file={formData.bookPDF}
                onFileChange={(file) => handleFileChange(file, "bookPDF")}
              />
            </div>

            <div className="input-container">
              <div className="input-group">
                <label className="label" htmlFor="name-input">Name of the book</label>
                <input
                  className="input"
                  placeholder="Enter book's name"
                  type="text"
                  id="name-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label className="label" htmlFor="author-input">Author</label>
                <input
                  className="input"
                  placeholder="Enter author's name"
                  type="text"
                  id="author-input"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label className="label" htmlFor="description-input">Description</label>
              <input
                className="input"
                placeholder="Enter description"
                type="text"
                id="description-input"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="label" htmlFor="genre-select">Genre</label>
              <select
                className="input"
                id="genre-select"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select genre</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="biography">Biography</option>
                <option value="mystery">Mystery</option>
                <option value="thriller">Thriller</option>
                <option value="romance">Romance</option>
                <option value="horror">Horror</option>
                <option value="other">Other</option>
              </select>
            </div>

            <p className="text">Want to share more books? Feel free to upload as many as you like!</p>
            <Button />
          </form>
        )}
      </div>
    </div>
  );
}
