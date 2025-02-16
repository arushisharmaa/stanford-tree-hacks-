import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import empty from './assets/generated_images/empty.png';
import one from './assets/generated_images/generated_one.png';
import two from './assets/generated_images/generated_two.png';
import three from './assets/generated_images/generated_three.png';
import four from './assets/generated_images/generated_four.png';
import "./StudentView.css";

const initialImages = [empty, one, two, three, four];

const StudentView = () => {
  const navigate = useNavigate(); 
  const [notes, setNotes] = useState("");
  const [userName, setUserName] = useState("");
  const [homework, setLectureTopic] = useState("");
  const [dueDates, setStudentID] = useState("");
  const [kahootCode, setKahootCode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleEnterKahoot = () => {
    if (kahootCode.trim()) {
      setIsConnected(true);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting Notes:", { userName, homework, dueDates, notes });
    navigate("/submitted_notes"); 
    alert("Notes submitted successfully!");
    
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  useEffect(() => {
    if (currentImageIndex < initialImages.length - 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }, 9000);
      return () => clearInterval(interval);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentImageIndex);
    }
  }, [currentImageIndex]);

  return (
    <div className="cornell-container">
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
        <div className="cornell-left-column">
          {!isConnected ? (
            <div className="kahoot-container">
              <h3>Enter Connection Code</h3>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="text"
                  className="kahoot-input"
                  placeholder="Enter code here..."
                  value={kahootCode}
                  onChange={(e) => setKahootCode(e.target.value)}
                />
                <button className="enter-button" onClick={handleEnterKahoot} disabled={!kahootCode.trim()}>
                  Enter
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3>Noteworthy AI Images</h3>
              <Slider ref={sliderRef} {...settings}>
                {initialImages.map((img, index) => (
                  <div key={index} className="carousel-slide">
                    <img src={img} alt={`Generated Image ${index + 1}`} className="carousel-image" />
                  </div>
                ))}
              </Slider>
            </>
          )}

          <div className="cornell-footer">
            <h3>Summary</h3>
            <textarea className="cornell-summary" placeholder="Write summary here" />
          </div>
        </div>

        <div className="cornell-right-column">
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>

          <h3>Notes</h3>
          <div
            className="cornell-input"
            contentEditable
            suppressContentEditableWarning={true}
            placeholder="Write your detailed notes here"
            onInput={(e) => setNotes(e.target.innerHTML)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
