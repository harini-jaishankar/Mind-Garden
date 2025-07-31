import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import MoodHistory from './components/MoodHistory';
import Analytics from './components/Analytics';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#38e9e0ff' }}>
        <h1>MindGarden 🌱</h1>

        {/* Navigation Bar */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>🏡 Home</Link>
          <Link to="/history" style={{ marginRight: '15px' }}>📚 Mood History</Link>
          <Link to="/analytics" style={{ marginRight: '15px' }}>📊 Analytics</Link>
          <Link to="/register" style={{ marginRight: '15px' }}>📝 Register</Link>
          <Link to="/login">🔐 Login</Link>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<MoodHistory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
