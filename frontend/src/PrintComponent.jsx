import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './PrintComponent.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import one from './assets/generated_images/generated_one.png';
import four from './assets/generated_images/generated_four.png';
import geminiLogo from './assets/gemini-color.png';
import sendLogo from './assets/send-image.jpg';
import SummaryDisplay from './SummaryDisplay';
import ResourcesDisplay from './Resources';
import QuizDisplay from './QuizDisplay';

const PrintableDocument = () => {
  const printRef = useRef(null);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Print Document',
    onAfterPrint: () => console.log('Printed Successfully!')
  });

  const handleEdit = () => {
    alert("Edit button clicked! (Add edit functionality here)");
  };

  const handleShare = () => {
    alert("Share button clicked! (Add sharing functionality here)");
  };

  const handleSend = async () => {
    if (!input) return;
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBNVvgIV0IElrS5VCEDrPZbJC9aOWJCXTM");
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(input);
      setResponse(result.response.text());
    } catch (error) {
      setResponse('Error fetching response');
    }
  };

  return (
    <div className="document-container">

    <div className="button-container">
            <button className="action-button" onClick={handlePrint}>Print</button>
            <button className="action-button" onClick={handleEdit}>Edit</button>
            <button className="action-button" onClick={handleShare}>Share</button>
          </div>

      {/* The document content */}
      <div className="document-content" ref={printRef}>
        <h1>Linked Lists Lecture</h1>
        <h3 className="summary-title">Lecture Summary (sponsored by Perplexity):</h3>
        <SummaryDisplay />
        <h3>My Class Notes:</h3>
        <ul>
          <li><strong>What is a Linked List?</strong> A linked list is a linear data structure where each element (node) points to the next node in the sequence.</li>
          <li><strong>Structure of Linked List:</strong> Each node has two parts:
            <ul>
              <li>Data: The actual value stored in the node.</li>
              <li>Next: A reference to the next node in the list.</li>
            </ul>
          </li>
          <li><strong>Types of Linked Lists:</strong>
            <ul>
              <li>Singular Linked List: Each node points to the next node.</li>
              <li>Doubly Linked List: Each node points to both the next and previous nodes.</li>
              <li>Circular Linked List: The last node points back to the first node.</li>
            </ul>
          </li>
        </ul>

        <h3>Linked List Visualization</h3>
        <img src={four} alt="Linked List Structure" />

        <h3>Linked List Operations</h3>
        <img src={one} alt="Types of Linked Lists" />
      </div>

      {/* Gemini Chatbox */}
      <div className="chatbox">
        <div className="chatbox-header">
          <h3>Ask Gemini</h3>
          <img src={geminiLogo} alt="Gemini Logo" className="gemini-logo" />
        </div>

        <div className="textarea-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What can I help you with today..."
            className="styled-textarea"
          />
          <button onClick={handleSend} className="textarea-logo">
            <img src={sendLogo} alt="Send" className="textarea-logo" />
          </button>
        </div>

        {response && <div className="chat-response">{response}</div>}
      </div>

      <div className="resources-container">
        <ResourcesDisplay />
      </div>

    <div className="quiz-container">
      <QuizDisplay />
    </div>
    </div>
  );
};

export default PrintableDocument;
