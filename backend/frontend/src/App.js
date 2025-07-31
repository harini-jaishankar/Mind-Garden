import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', { text });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setPrediction("Backend not reachable");
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>MindGarden 🌱</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="40"
          placeholder="How are you feeling today?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Predict Mood</button>
      </form>
      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <strong>Predicted Mood:</strong> {prediction}
        </div>
      )}
    </div>
  );
}

export default App;

