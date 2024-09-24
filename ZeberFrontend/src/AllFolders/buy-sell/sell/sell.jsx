import React, { useState } from "react";
import './sell.css';
import axios from "axios";

function Sell() {
  const [files, setFiles] = useState([]);
  const [bookDetails, setBookDetails] = useState({
    name: "",
    address: "",
    author: "",
    language: "",
    publisher: "",
    publicationDate: "",
    mrp: 0,
    retailPrice: 0,
    discountedPrice: 0,
  });

  const [preview, setPreview] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit hua hai bro");
    console.log(bookDetails);
    console.log(files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("bookDetails", JSON.stringify(bookDetails));
    console.log(formData);
    console.log(formData.file);

    await axios
      .post("http://localhost:8080/uploads", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("file upload ke post mein error hai brother");
      });

    setFiles([]);
    setBookDetails({
      name: "",
      address: "",
      author: "",
      language: "",
      publisher: "",
      publicationDate: "",
      mrp: 0,
      retailPrice: 0,
      discountedPrice: 0,
    });
    setPreview(null);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [id]: value,
    });
  }

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Generate a preview of the cover image
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <div class="sell-container">
    <h1>Sell Your Book</h1>
    <form onSubmit={handleSubmit}>
     
      <div class="form-group">
        <label htmlFor="name">Book Name</label>
        <input type="text" id="name" placeholder="Enter the name of the book" value={bookDetails.name} onChange={handleChange} />
      </div>
  
   
      <div class="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" placeholder="Enter your address" value={bookDetails.address} onChange={handleChange} />
      </div>
  
      
      <div class="form-group">
        <label htmlFor="author">Author</label>
        <input type="text" id="author" placeholder="Enter the author's name" value={bookDetails.author} onChange={handleChange} />
      </div>
  
      <div class="form-group">
        <label htmlFor="language">Language</label>
        <input type="text" id="language" placeholder="Enter the book's language" value={bookDetails.language} onChange={handleChange} />
      </div>
  
      
      <div class="form-group">
        <label htmlFor="publisher">Publisher</label>
        <input type="text" id="publisher" placeholder="Enter the publisher's name" value={bookDetails.publisher} onChange={handleChange} />
      </div>
  
      
      <div class="form-group">
        <label htmlFor="publicationDate">Publication Date</label>
        <input type="date" id="publicationDate" value={bookDetails.publicationDate} onChange={handleChange} />
      </div>
  
      
      <div class="form-group">
        <label htmlFor="mrp">MRP</label>
        <input type="number" id="mrp" placeholder="Enter the MRP" value={bookDetails.mrp} onChange={(e) => setBookDetails({ ...bookDetails, mrp: parseInt(e.target.value) })} />
      </div>
  
     
      <div class="form-group">
        <label htmlFor="discountedPrice">Discounted Price</label>
        <input type="number" id="discountedPrice" placeholder="Enter the discounted price" value={bookDetails.discountedPrice} onChange={(e) => setBookDetails({ ...bookDetails, discountedPrice: parseInt(e.target.value) })} />
      </div>
  
      <div class="form-group">
        <label htmlFor="retailPrice">Retail Price</label>
        <input type="number" id="retailPrice" placeholder="Enter the retail price" value={bookDetails.retailPrice} onChange={(e) => setBookDetails({ ...bookDetails, retailPrice: parseInt(e.target.value) })} />
      </div>
  
     
      <div class="form-group">
        <label htmlFor="coverImage">Cover Image</label>
        <input type="file" id="coverImage" multiple onChange={handleFileChange} />
      </div>
  
      <button type="submit" class="submit-button">Sell Book</button>
    </form>
  </div>
  
  );
}

export default Sell;
