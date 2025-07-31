import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        text: text,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('❌ Error connecting to backend:', error.message);
      setPrediction('⚠️ Backend not reachable. Please ensure Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'sans-serif',
      backgroundColor: '#f4f8f9',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#2e7d32' }}>🌱 MindGarden</h1>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <textarea
          rows="5"
          placeholder="How are you feeling today?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <br />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Predicting...' : 'Predict Mood'}
        </button>
      </form>

      {prediction && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
          <strong>Predicted Mood:</strong> {prediction}
        </div>
      )}
    </div>
  );
}

export default Home;
