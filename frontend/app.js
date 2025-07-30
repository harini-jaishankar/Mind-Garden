import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setMood(data.mood);
  };

  return (
    <div className="App">
      <h1>MindGarden 🌿</h1>
      <textarea
        rows="5"
        cols="40"
        placeholder="Type your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Analyze Mood</button>
      {mood && <p>Your Mood: <strong>{mood}</strong></p>}
    </div>
  );
}

export default App;
