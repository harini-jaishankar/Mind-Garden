import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/register', {
        username,
        password
      }, { withCredentials: true });
      setMsg(res.data.message);
    } catch (error) {
      setMsg(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>{msg}</p>
    </div>
  );
}

export default RegisterForm;
