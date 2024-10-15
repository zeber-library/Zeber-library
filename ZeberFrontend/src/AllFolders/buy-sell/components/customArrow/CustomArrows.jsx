import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Sleek arrow icons

const arrowStyles = {
  display: 'block',
  color: '#fff',
  fontSize: '25px', // Slightly smaller size for a sleek look
  padding: '12px',
  backgroundColor: 'skyblue',
  borderRadius: '50%',
  opacity: 0.9,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={className}
      style={{ ...style, ...arrowStyles, left: '-30px' }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={className}
      style={{ ...style, ...arrowStyles, right: '-30px' }}
      onClick={onClick}
    />
  );
};

export { PrevArrow, NextArrow };

