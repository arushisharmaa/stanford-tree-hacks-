import React from 'react';
import { Link } from 'react-router-dom';
import './NotesPage.css';
import logo2 from './assets/pdf_lecture.png'; 

const NotesPage = () => {
    const notes = [
        { date: "02/15/25", topic: "Linked Lists", image: logo2, content: "Inserting, deleting, and traversing through nodes in a singly linked list." },
        { date: "02/14/25", topic: "Machine Learning", image: logo2, content: "Supervised learning vs unsupervised and common algorithms." },
        { date: "02/14/25", topic: "Big O Notation", image: logo2, content: "Understanding algorithm complexity and analyzing time and space complexity." },
        { date: "02/04/25", topic: "Graph Theory", image: logo2, content: "Types of graphs, traversal algorithms, and graph representations." },
        { date: "02/05/25", topic: "Dynamic Programming", image: logo2, content: "Breaking problems into smaller subproblems and storing results." },
        { date: "02/06/25", topic: "Sorting Algorithms", image: logo2, content: "Quick sort, merge sort, and insertion sort" },
        { date: "02/07/25", topic: "Binary Search", image: logo2, content: "Efficient searching method in a sorted array or list." },
        { date: "02/08/25", topic: "Tree Data Structures", image: logo2, content: "Binary trees, AVL trees, and tree traversals." },
        { date: "02/09/25", topic: "Hashing", image: logo2, content: "Hash functions, hash tables, and handling collisions." },
        { date: "02/10/25", topic: "Recursion", image: logo2, content: "Understanding recursion and its applications in algorithms." },
        { date: "02/11/25", topic: "Network Protocols", image:logo2, content: "TCP/IP, HTTP, DNS for how data flows in the network." },
        { date: "02/12/25", topic: "Operating Systems", image: logo2, content: "Processes, memory management, and scheduling algorithms." },
        { date: "02/13/25", topic: "Concurrency", image: logo2, content: "Threads, synchronization, and race conditions." },
        { date: "02/14/25", topic: "Artificial Intelligence", image: logo2, content: "AI problem-solving techniques, search algorithms, and knowledge representation." },
        { date: "02/15/25", topic: "Database Systems", image: logo2, content: "SQL, normalization, and relational database design." },
        { date: "02/16/25", topic: "Software Engineering", image: logo2, content: "Software development lifecycle, testing, and agile methodology." },
        { date: "02/17/25", topic: "Compilers", image: logo2, content: "Lexical analysis, syntax analysis, and code generation in the compilation process." },
        { date: "02/18/25", topic: "Cloud Computing", image: logo2, content: "Virtualization, cloud services , and deployment models." },
        { date: "02/19/25", topic: "Cryptography", image: logo2, content: "Encryption algorithms, digital signatures, and public-key infrastructure." },
        { date: "02/20/25", topic: "Cybersecurity", image: logo2, content: "Threats, attacks, and security protocols to protect information systems." },
    ];



    
        return (
          <div className="notes-page">
              <h1 className="notes-title">Semester Spring 2025 Notes</h1>
  
              <div className="note-cards">
                  {notes.map((note) => (
                      <Link to="/submitted_notes" key={note.id} className="note-link">
                          <div className="note-card"> 
                              <img src={note.image} alt={note.topic} className="note-image" />
                              <h3>{note.topic}</h3>
                              <p className="note-date">{note.date}</p>
                              <p>{note.content}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      );
  };
  
  export default NotesPage;
  