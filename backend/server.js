// express server

// import required modules
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const cors =  require('cors');

// create express app + http server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// set up middleware to parse json bodies from incoming requests
app.use(cors());
app.use(bodyParser.json());

// route to handle incoming webhook events from zoom
app.post('/webhook', (req, res) => {
  const transcriptionData = req.body;
  // process transcription data
  console.log(transcriptionData);

  // send  transcription data to react frontend using websocket
  io.emit('transcriptionData', transcriptionData);

  res.sendStatus(200);
});

// start the server
const PORT = process.env.PORT || 9002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});