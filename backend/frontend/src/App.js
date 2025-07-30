import axios from 'axios';
import React, { useState } from 'react';

function MoodForm() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://127.0.0.1:5000/predict', { text: input });
    setResult(res.data.prediction);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Analyze</button>
      </form>
      <p>Prediction: {result}</p>
    </div>
  );
}

export default MoodForm;
