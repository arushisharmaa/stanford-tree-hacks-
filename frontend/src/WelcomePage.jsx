import React from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  const cards = [
    { 
      title: "CS314: DATA STRUCTURES", 
      description: "This course covers the fundamental data structures and their implementation, focusing on arrays, stacks, queues, linked lists, and trees.",
      professor: "Dr. John Smith",
      time: "MWF 10:00 AM - 11:00 AM",
      location: "Room 101, CS Building"
    },
    { 
      title: "CS36M: MACHINE LEARNING ONE", 
      description: "Introduction to machine learning algorithms and techniques, focusing on supervised and unsupervised learning.",
      professor: "Dr. Alice Johnson",
      time: "TTh 2:00 PM - 3:30 PM",
      location: "Room 202, AI Lab"
    },
    { 
      title: "M341K: INTRODUCTION TO NUMBER THEORY", 
      description: "An exploration of number theory concepts such as prime numbers, divisibility, and modular arithmetic.",
      professor: "Dr. Robert Brown",
      time: "MWF 1:00 PM - 2:00 PM",
      location: "Room 303, Math Building"
    },
    { 
      title: "HIS306: EUROPEAN HISTORY", 
      description: "This course provides an overview of European history from the Middle Ages to the modern era, exploring political, social, and economic transformations.",
      professor: "Dr. Emily Davis",
      time: "TTh 9:00 AM - 10:30 AM",
      location: "Room 110, History Hall"
    },
    { 
      title: "HIS312: HISTORY OF SCIENCE", 
      description: "A survey of the history of scientific thought, focusing on key figures, ideas, and developments from ancient to modern science.",
      professor: "Dr. William Thompson",
      time: "MW 3:00 PM - 4:30 PM",
      location: "Room 215, Science Center"
    },
    { 
      title: "MATH340: LINEAR ALGEBRA", 
      description: "Covers vector spaces, matrices, determinants, eigenvalues, and eigenvectors, with applications in solving linear systems.",
      professor: "Dr. Laura Martinez",
      time: "TTh 11:00 AM - 12:30 PM",
      location: "Room 410, Math Building"
    }
  ];

  return (
    <div className="welcome-page">
      <h1>Welcome to Noteworthy!</h1>
      <h2>Where We Help You Visualize, Capture, Remember</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.title}</h3>
            {/* <p>{card.description}</p> */}
            <p><strong>Professor:</strong> {card.professor}</p>
            <p><strong>Time:</strong> {card.time}</p>
            <p><strong>Location:</strong> {card.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
