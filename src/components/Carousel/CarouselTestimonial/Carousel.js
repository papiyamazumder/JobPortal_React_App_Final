import React, { useState } from 'react';
import './Carousel.css';
import { IoPerson } from "react-icons/io5";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < items.length - 3 ? prevIndex + 1 : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : items.length - 3
    );
  };

  return (<>
 
      <button className="carousel-button left" onClick={prev}>
      <MdKeyboardArrowLeft size={35} className='carousel-arrow-btn'  />
      </button>
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentIndex * 35.7}%)` }}
        >
          {items.map((item, index) => (
            <div className="carousel-card" key={index}>
              <p className="testimonial-name"><IoPerson color='black' /> {item.name}</p>
              <p className='testimonial-comments'>{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <button className="carousel-button right" onClick={next}>
      <MdKeyboardArrowRight size={35} className='carousel-arrow-btn' />
      </button>
    </>
  );
};

export default Carousel;
