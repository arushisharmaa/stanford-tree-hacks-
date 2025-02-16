import React from 'react';
import './NotesPage.css';
import logo2 from './assets/logo2.png'; 

const NotesPage = () => {
    const notes = [
        { date: "02/14/25", topic: "Linked Lists", image: logo2, content: "Inserting, deleting, and traversing through nodes in a singly linked list." },
        { date: "02/14/25", topic: "Machine Learning", image: "image2.jpg", content: "Supervised learning vs unsupervised and common algorithms." },
        { date: "02/14/25", topic: "Big O Notation", image: "image3.jpg", content: "Understanding algorithm complexity and how to analyze time and space complexity." },
        { date: "02/04/25", topic: "Graph Theory", image: "image4.jpg", content: "Types of graphs, traversal algorithms (BFS, DFS), and graph representations." },
        { date: "02/05/25", topic: "Dynamic Programming", image: "image5.jpg", content: "Breaking problems into smaller subproblems and storing intermediate results." },
        { date: "02/06/25", topic: "Sorting Algorithms", image: "image6.jpg", content: "Quick sort, merge sort, and insertion sort with their time complexities." },
        { date: "02/07/25", topic: "Binary Search", image: "image7.jpg", content: "Efficient searching method in a sorted array or list." },
        { date: "02/08/25", topic: "Tree Data Structures", image: "image8.jpg", content: "Binary trees, AVL trees, and tree traversals (in-order, pre-order, post-order)." },
        { date: "02/09/25", topic: "Hashing", image: "image9.jpg", content: "Hash functions, hash tables, and handling collisions." },
        { date: "02/10/25", topic: "Recursion", image: "image10.jpg", content: "Understanding recursion and its applications in algorithms." },
        { date: "02/11/25", topic: "Network Protocols", image: "image11.jpg", content: "TCP/IP, HTTP, DNS, and understanding how data flows in the network." },
        { date: "02/12/25", topic: "Operating Systems", image: "image12.jpg", content: "Processes, memory management, and scheduling algorithms." },
        { date: "02/13/25", topic: "Concurrency", image: "image13.jpg", content: "Threads, synchronization, and race conditions." },
        { date: "02/14/25", topic: "Artificial Intelligence", image: "image14.jpg", content: "AI problem-solving techniques, search algorithms, and knowledge representation." },
        { date: "02/15/25", topic: "Database Systems", image: "image15.jpg", content: "SQL, normalization, and relational database design." },
        { date: "02/16/25", topic: "Software Engineering", image: "image16.jpg", content: "Software development lifecycle, testing, and agile methodology." },
        { date: "02/17/25", topic: "Compilers", image: "image17.jpg", content: "Lexical analysis, syntax analysis, and code generation in the compilation process." },
        { date: "02/18/25", topic: "Cloud Computing", image: "image18.jpg", content: "Virtualization, cloud services (IaaS, PaaS, SaaS), and deployment models." },
        { date: "02/19/25", topic: "Cryptography", image: "image19.jpg", content: "Encryption algorithms, digital signatures, and public-key infrastructure." },
        { date: "02/20/25", topic: "Cybersecurity", image: "image20.jpg", content: "Threats, attacks, and security protocols to protect information systems." },
    ];

      

  return (
    <div className="notes-page">
      <h1 className="notes-title">Semester Spring 2025 Notes</h1>

      <div className="note-cards">
        {notes.map((note, index) => (
          <div key={index} className="note-card">
            <img src={note.image} alt={note.topic} className="note-image" />
            <h3>{note.topic}</h3>
            <p className="note-date">{note.date}</p> 
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
