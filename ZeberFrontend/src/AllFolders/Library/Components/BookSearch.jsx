import React, { useState, useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Header from './Header';
import "./BookSearch.css"
const BookSearch = () => {

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);
   const location=useLocation();
   const navigate=useNavigate()
   const { searchTerm } = location.state || {}
   useEffect(()=>{
    const fetchAllBooks=async()=>{
        const response = await fetch(`http://localhost:5000/api/getbooks`);
        if(!response.ok){
          navigate('*')
        }
        const data = await response.json();
        setBooks(data);
    }
    fetchAllBooks()
   },[books])

   useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`http://localhost:5000/api/books?q=${searchTerm}`);
      if(!response.ok){
        navigate('*')
      }
      const data = await response.json();
      setFilteredBooks(data);
    };
  
    if (searchTerm) {
      fetchBooks();
    } else {
      setFilteredBooks(books); // Or handle no search case
    }
  }, [searchTerm]);

  return (
    <div>
     <Header/>

      {/* Display filtered books */}
      <ul style={{display:'flex'}}>
        {filteredBooks.length>0?(filteredBooks.map((book) => (
          <li key={book._id} style={{ display:'flex',flexDirection:'column',margin:'2rem 1rem',justifyContent:'center', alignItems: 'center', }}>
            <Link to='/book' state={{book}}>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           <img
            
            src={book.coverImages[0]} // Display book image
            alt={book.title}
            style={{ width: '115px', height: '150px',cursor:'pointer'}}
          />
           </div></Link>
            <div>
              <h3 style={{textAlign:'center'}}>{book.title}</h3>
              <p style={{textAlign:'center'}}>{book.author}</p>
            </div>
          </li>
        ))):"No search result found"}
      </ul>
    </div>
  );
};

export default BookSearch;
