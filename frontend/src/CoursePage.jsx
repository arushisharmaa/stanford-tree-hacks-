import React from 'react';
import './CoursePage.css';
import { Link } from 'react-router-dom'; 

const CoursePage = () => {
  const cards = [
    { 
      title: "CS314: DATA STRUCTURES", 
      description: "This course covers fundamental data structures and their implementation, focusing on arrays, stacks, queues, linked lists, and trees.",
      professor: "Dr. John Smith",
      time: "MWF 10:00 AM - 11:00 AM",
      location: "Room 101, CS Building", 
      link: "/cs314-details" 
    },
    { 
      title: "CS36M: MACHINE LEARNING", 
      description: "Introduction to machine learning algorithms and techniques, focusing on supervised and unsupervised learning.",
      professor: "Dr. Alice Johnson",
      time: "TTh 2:00 PM - 3:30 PM",
      location: "Room 202, AI Lab", 
      link: "/cs314-details" 
    },
    { 
      title: "M341K: NUMBER THEORY", 
      description: "An exploration of number theory concepts such as prime numbers, divisibility, and modular arithmetic.",
      professor: "Dr. Robert Brown",
      time: "MWF 1:00 PM - 2:00 PM",
      location: "Room 303, Math Building", 
      link: "/cs314-details" 
    },
    { 
      title: "HIS306: EUROPEAN HISTORY", 
      description: "This course provides an overview of European history from the Middle Ages to the modern era, exploring political, social, and economic transformations.",
      professor: "Dr. Emily Davis",
      time: "TTh 9:00 AM - 10:30 AM",
      location: "Room 110, History Hall", 
      link: "/cs314-details" 
    },
    { 
      title: "HIS312: HISTORY OF SCIENCE", 
      description: "A survey of the history of scientific thought, focusing on key figures, ideas, and developments from ancient to modern science.",
      professor: "Dr. William Thompson",
      time: "MW 3:00 PM - 4:30 PM",
      location: "Room 215, Science Center", 
      link: "/cs314-details" 
    },
    { 
      title: "MATH340: LINEAR ALGEBRA", 
      description: "Covers vector spaces, matrices, determinants, eigenvalues, and eigenvectors, with applications in solving linear systems.",
      professor: "Dr. Laura Martinez",
      time: "TTh 11:00 AM - 12:30 PM",
      location: "Room 410, Math Building", 
      link: "/cs314-details" 
    }
  ];

  return (
    <div className="course-dashboard">
      <h1 className="dashboard-title">Welcome to Your Course Dashboard 📚</h1>
      <h3 className="dashboard-subtitle">Stay on top of your classes, manage your schedule, and make learning a breeze!</h3>
      
      <div className="card-grid">
        {cards.map((card, index) => (
          <Link key={index} to={card.link} style={{ textDecoration: 'none' }}> {/* Wrap the card in a Link */}
            <div className="card">
              <h3>{card.title}</h3>
              <p className="course-description">{card.description}</p>
              <p><strong>Professor:</strong> {card.professor}</p>
              <p><strong>Time:</strong> {card.time}</p>
              <p><strong>Location:</strong> {card.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
