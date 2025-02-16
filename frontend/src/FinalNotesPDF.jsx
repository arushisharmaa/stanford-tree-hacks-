import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./FinalNotesPDF.css"; // Import CSS file

const Notes = () => {
    const notesRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => notesRef.current,
        documentTitle: "LinkedListNotes",
    });

    return (
        <div className="notes-container">
            <div ref={notesRef} className="notes-content">
                <h2>Linked List Notes</h2>
                <ul>
                    <li><b>Linked List:</b> Linear data structure using pointers (not contiguous like arrays).</li>
                    <li><b>Limitations of Arrays:</b> Fixed size, pre-allocated memory.</li>
                    <li><b>Doubly Linked List:</b> Each node has <code>prev</code> & <code>next</code> pointers.</li>
                    <li><b>Singly Linked List:</b> One-directional (<code>next</code> only).</li>
                    <li><b>Appending to Tail:</b> <code>D.next → E</code>, <code>E.next → NULL</code>.</li>
                </ul>
            </div>

            <button onClick={handlePrint} className="print-button">
                Export as PDF
            </button>
        </div>
    );
};

export default Notes;
