
const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  console.log('Server: Client Connected!');
  const numUsers = {users: wss.clients.size, type: 'updateUsers'};
  console.log('numUsers:', numUsers);
  broadcast(numUsers);
  ws.on('message', function incoming(message) {
    console.log('Server: Message Received!');
    const newMessage = JSON.parse(message);
    if (newMessage.type === 'postMessage') {
      newMessage.id = uuidV1();
      newMessage.type = 'incomingMessage';
      broadcast(newMessage);
    } else if (newMessage.type === 'postNotification') {
      newMessage.type = 'incomingNotificaton';
      newMessage.username = null;
      broadcast(newMessage);
    }
  });
  // Set up a callback for when a client closes the socket
  ws.on('close', () => console.log('Client disconnected'));
});

function broadcast(data) {
  const messageString = JSON.stringify(data);
  console.log('message:', messageString);
  wss.clients.forEach(function each(client) {
      client.send(messageString);
  });
  console.log('Server: Broadcast Complete!');
};


