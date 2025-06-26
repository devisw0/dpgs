import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setGreeting(`Hello ${name}!`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Name App</h1>
        <form onSubmit={handleSubmit} className="name-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="name-input"
          />
          <button type="submit" className="submit-button">
            Greet Me!
          </button>
        </form>
        {greeting && (
          <div className="greeting">
            <h2>{greeting}</h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App; 