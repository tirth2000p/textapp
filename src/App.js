import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendToFlask = async () => {
      if (!userInput.trim()) return;

      const newChat = { sender: 'You', message: userInput };
      setChat([...chat, newChat]);

      try {
          const response = await axios.post('http://127.0.0.1:5000/chat', { message: userInput });
          setChat([...chat, newChat, { sender: 'Bot', message: response.data.response }]);
      } catch (error) {
          console.error('Error sending message to Flask:', error);
          setChat([...chat, newChat, { sender: 'Bot', message: 'Error communicating with the server.' }]);
      }
      setUserInput('');
  };

  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
          sendToFlask();
      }
  };

  return (
      <div className="App container py-5">
          <h1 className="text-center mb-4">Chat with Flask</h1>
          <div className="chat-box bg-light p-3 mb-3" style={{ height: '300px', overflowY: 'auto' }}>
              {chat.map((entry, index) => (
                  <div key={index}>
                      <strong>{entry.sender}:</strong> {entry.message}
                  </div>
              ))}
          </div>
          <div className="input-group">
              <input
                  type="text"
                  className="form-control"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
              />
              <button className="btn btn-primary" onClick={sendToFlask}>Send</button>
          </div>
      </div>
  );
}


export default App;
