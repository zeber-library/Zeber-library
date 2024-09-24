// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import axios from 'axios';
// import BookItem from './BookItem';
// import './BooksList.css';
// import { PrevArrow, NextArrow } from './CustomArrows';

// const BooksList = () => {
//   const [booksData, setBooksData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/books/buybooks')
//       .then(response => {
//         console.log(response.data);
//         setBooksData(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the books data!', error);
//       });
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <h2 style={{ fontSize: '40px', marginLeft: '30px' , marginTop : '70px'}}>TOP BEST SELLERS</h2>
//       <div className="books-carousel">
//         <Slider {...settings}>
//           {booksData.map((book) => (
//             <div key={book._id}>
//               <Link 
//                 to={`/book/${book._id}`} 
//                 style={{ textDecoration: 'none' }} 
//               >
//                 <BookItem book={book} />
//               </Link>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </>
//   );
// };

// export default BooksList;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import BookItem from './BookItem';
import './BooksList.css';
import { PrevArrow, NextArrow } from '../customArrow/CustomArrows';

const BooksList = ({ apiType }) => {
  const [booksData, setBooksData] = useState([]); // Default to empty array
  const [heading, setHeading] = useState('');

  useEffect(() => {
    let apiUrl = '';

    if (apiType === 'buybooks') {
      apiUrl = 'http://localhost:8080/api/books/buybooks';
      setHeading('TOP BUYERS');
    } else if (apiType === 'sellbooks') {
      apiUrl = 'http://localhost:8080/books';
      setHeading('TOP BEST SELLERS');
    }

    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setBooksData(Array.isArray(response.data) ? response.data : []); 
      })
      .catch(error => {
        console.error('There was an error fetching the books data!', error);
      });
  }, [apiType]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
   
  <>
  <>
  <h2 style={{ fontSize: '40px', marginLeft: '30px' , marginTop : '70px'}}>{heading}</h2>
  <div className="books-carousel">
    <Slider {...settings}>
      {Array.isArray(booksData) && booksData.length > 0 ? (
        booksData.map((book) => (
          <div key={book._id}>
            <Link
              to={`/${apiType === 'buybooks' ? 'buy' : 'sell'}/book/${book._id}`} // Adjusted route path
              style={{ textDecoration: 'none' }}
            >
              <BookItem book={book} />
            </Link>
          </div>
        ))
      ) : (
        <p>No books available</p> // Fallback message if data is not an array or is empty
      )}
    </Slider>
  </div>
</>

  </>
  );
};

export default BooksList;
