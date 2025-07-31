import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', { text });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setPrediction('Backend not reachable');
    }
  };

  return (
    <div>
      <h2>MindGarden 🌱</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today?"
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Predict Mood</button>
      </form>
      <h3>Predicted Mood: {prediction}</h3>
    </div>
  );
}

export default Home;

