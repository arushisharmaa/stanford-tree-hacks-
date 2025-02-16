import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from './assets/logo.png';  // Import your logo
import "./StudentView.css";

const images = [
  <img src={logo} alt="App Logo" className="logo" />, 
  "https://ibb.co/Pz9mydjv",
  "https://ibb.co/Pz9mydjv",
  "https://ibb.co/Pz9mydjv",
  "https://ibb.co/Pz9mydjv",
  "https://ibb.co/Pz9mydjv",
  "https://ibb.co/Pz9mydjv",
  "https://ibb.co/Pz9mydjv",
  "https://ibb.co/Pz9mydjv",
];

const StudentView = () => {
  const [notes, setNotes] = useState("");
  const [userName, setUserName] = useState("");
  const [homework, setLectureTopic] = useState("");
  const [dueDates, setStudentID] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="cornell-container">
      {/* Header Section */}
      <div className="cornell-header">
        <input
          type="text"
          className="header-input"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="header-input"
          placeholder="Lecture Topic"
          value={homework}
          onChange={(e) => setLectureTopic(e.target.value)}
        />
        <input
          type="text"
          className="header-input"
          placeholder="Student ID Number"
          value={dueDates}
          onChange={(e) => setStudentID(e.target.value)}
        />
      </div>

      <div className="cornell-body">
        {/* Image Carousel (Left Column) */}
        <div className="cornell-left-column">
          <h3>Noteworthy AI Images</h3>
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index} className="carousel-slide">
                <img src={img} alt={`Question ${index + 1}`} className="carousel-image" />
              </div>
            ))}
          </Slider>
        </div>

        {/* Notes Section (Right Column) */}
        <div className="cornell-right-column">
          <h3>Notes</h3>
          <textarea
            className="cornell-input"
            placeholder="Write your detailed notes here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Section (Footer) */}
      <div className="cornell-footer">
        <h3>Summary</h3>
        <textarea className="cornell-summary" placeholder="Write summary here" />
      </div>
    </div>
  );
};

export default StudentView;
