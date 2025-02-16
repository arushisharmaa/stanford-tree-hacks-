import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import StudentView from './StudentView';
import io from 'socket.io-client';
import './App.css';  // Import CSS for styling
import logo from './assets/logo.png';  // Import your logo
import CalendarPage from './CalendarPage'; 
import CoursePage from './CoursePage';
import NotesPage from './NotesPages';
import FinalNotesPDF from './FinalNotesPDF'; 


const socket = io('http://localhost:9002');

function App() {
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    socket.on('transcriptionData', (data) => {
      setTranscription(data.text);
    });

    return () => {
      socket.off('transcriptionData');
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
      <nav className="navbar">
  <div className="logo-container">
    <img src={logo} alt="App Logo" className="logo" />
    <span className="logo-text">Noteworthy - Visualize, Capture, Remember.</span>
  </div>
  <div className="nav-links-container">
    <ul className="nav-links">
      <li><Link to="/" className="nav-link">Home</Link></li>
      <li><Link to="/calender" className="nav-link">My Calendar</Link></li>
      <li><Link to="/courses" className="nav-link">My Courses</Link></li>
      <li><Link to="/student-view" className="nav-link">Start a New Note</Link></li>
    </ul>
  </div>
</nav>


        <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/student-view" element={<StudentView />} />
          <Route path="/calender" element={<CalendarPage/>} />
          <Route path="/courses" element={<CoursePage/>} />
          <Route path="/cs314-details" element={<NotesPage />} />
          <Route path="/submitted" element={<FinalNotesPDF/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
