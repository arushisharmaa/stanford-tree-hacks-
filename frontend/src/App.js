// src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

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
    <div className="App">
      <h1>Real-Time Transcription</h1>
      <p>{transcription}</p>
    </div>
  );
}

export default App;