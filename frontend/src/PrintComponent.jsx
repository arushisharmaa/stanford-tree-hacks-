import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './PrintComponent.css'; // Import your styles
import one from './assets/generated_images/generated_one.png';
import four from './assets/generated_images/generated_four.png';

const PrintableDocument = () => {
  // Create the ref
  const printRef = useRef(null);

  // Handle print function
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


  return (
    <div className="document-container">
         {/* Buttons aligned above the document */}
            <div className="button-container">
        <button className="action-button" onClick={handlePrint}>Print</button>
        <button className="action-button" onClick={handleEdit}>Edit</button>
        <button className="action-button" onClick={handleShare}>Share</button>
      </div>

      {/* The div to be printed */}
      <div ref={printRef} className="document-content">
        <h1>Linked Lists Lecture</h1>
        <h3>Lecture Summary (sponsored by Perplexity):</h3>
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

    </div>
  );
};

export default PrintableDocument;
