import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import one from './assets/generated_images/generated_one.png';
// import two from './assets/generated_images/generated_two.png';
import three from './assets/generated_images/generated_three.png';
// import four from './assets/generated_images/generated_four.png';
import "./StudentView.css";

const initialImages = [git 
  one, // Directly store the image URL paths
  // two,
  three,
  // four,
];

const StudentView = () => {
  const [notes, setNotes] = useState("");
  const [userName, setUserName] = useState("");
  const [homework, setLectureTopic] = useState("");
  const [dueDates, setStudentID] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track which image to display
  const sliderRef = useRef(null); // Reference to the slider

  const settings = {
    dots: false, // Set to false to remove dots
    infinite: true, // Disable infinite scrolling
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay because we will control the images manually
  };

  useEffect(() => {
    if (currentImageIndex < initialImages.length - 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1); // Move to next image
      }, 5000); // Change image every 1.5 seconds

      // Cleanup the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentImageIndex); // Move the slider to the current image
    }
  }, [currentImageIndex]);

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
          <Slider ref={sliderRef} {...settings}>
            {initialImages.map((img, index) => (
              <div key={index} className="carousel-slide">
                <img src={img} alt={`Generated Image ${index + 1}`} className="carousel-image" />
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
