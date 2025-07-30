// src/MoodForm.js
import React, { useState } from 'react';

function MoodForm() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setResult(data.prediction);
  };

  return (
    <div>
      <h1>Mood Predictor 🌱</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today?"
        />
        <button type="submit">Predict</button>
      </form>
      {result && <p>Your mood: <strong>{result}</strong></p>}
    </div>
  );
}

export default MoodForm;
