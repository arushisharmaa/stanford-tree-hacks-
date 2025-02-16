import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import one from './assets/generated_images/generated_one.png';
// import two from './assets/generated_images/generated_two.png';
import three from './assets/generated_images/generated_three.png';
// import four from './assets/generated_images/generated_four.png';
import "./StudentView.css";

const initialImages = [
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

  // This function will handle pasting an image
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
  
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        
        reader.onloadend = () => {
          const imageDataUrl = reader.result;
  
          // Get the current selection and insert the image
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
  
          const img = document.createElement('img');
          img.src = imageDataUrl;
          img.alt = "Pasted Image";
          img.style.maxWidth = "100%"; // Optional: Scale the image to fit within the container
  
          range.deleteContents(); // Remove the selected content (if any)
          range.insertNode(img); // Insert the image at the current position
        };
  
        reader.readAsDataURL(blob);
      }
    }
  };
  
  

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

  {/* Notes Section */}
  <div className="cornell-right-column">
    <h3>Notes</h3>
    <div
      className="cornell-input"
      contentEditable
      suppressContentEditableWarning={true}
      placeholder="Write your detailed notes here"
      onInput={(e) => setNotes(e.target.innerHTML)} // Set content in the state
      onPaste={handlePaste} // Handle image pasting
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        minHeight: "150px",
        width: "100%",
        borderRadius: "5px",
        overflowY: "auto",
        whiteSpace: "pre-wrap", // Preserve white space and formatting
      }}
    ></div>
  </div> {/* This is the closing tag for the "cornell-body" div */}
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
