import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import MoodHistory from './components/MoodHistory';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#e0f2f1' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '20px' }}>🏡 Home</Link>
          <Link to="/history">📚 Mood History</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<MoodHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
