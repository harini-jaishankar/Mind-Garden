import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const moodMap = {
  happy: 5,
  content: 4,
  neutral: 3,
  sad: 2,
  angry: 1,
};

const colorMap = {
  happy: '#4caf50',
  content: '#2196f3',
  neutral: '#9e9e9e',
  sad: '#ff9800',
  angry: '#f44336',
};

const Analytics = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [moodCount, setMoodCount] = useState({});
  const [averageMood, setAverageMood] = useState(0);
  const [filterRange, setFilterRange] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/history')
      .then(res => {
        const formatted = res.data.map(entry => ({
          date: new Date(entry.timestamp),
          mood: entry.mood.toLowerCase(),
          moodValue: moodMap[entry.mood.toLowerCase()] || 0,
        }));
        setData(formatted.reverse());
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let filteredData = data;

    if (filterRange !== 'all') {
      const now = new Date();
      const cutoff = new Date(
        filterRange === 'week' ? now.setDate(now.getDate() - 7) :
        filterRange === 'month' ? now.setMonth(now.getMonth() - 1) :
        now
      );
      filteredData = data.filter(item => item.date >= cutoff);
    }

    // Mood count
    const count = {};
    let sum = 0;

    filteredData.forEach(item => {
      count[item.mood] = (count[item.mood] || 0) + 1;
      sum += item.moodValue;
    });

    setMoodCount(count);
    setFiltered(filteredData.map(entry => ({
      ...entry,
      displayDate: entry.date.toLocaleDateString(),
    })));
    setAverageMood(
      filteredData.length > 0 ? (sum / filteredData.length).toFixed(2) : 0
    );
  }, [data, filterRange]);

  const pieData = Object.entries(moodCount).map(([mood, count]) => ({
    name: mood,
    value: count,
  }));

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Mood Analytics</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-4">
        {['all', 'week', 'month'].map(range => (
          <button
            key={range}
            onClick={() => setFilterRange(range)}
            className={`py-1 px-3 rounded ${
              filterRange === range ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            {range === 'all' ? 'All Time' : range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Average Mood */}
      <p className="text-lg mb-6 font-medium">
        🌟 <strong>Average Mood Score:</strong> {averageMood} / 5
      </p>

      {/* Line Chart */}
      <h3 className="text-xl font-semibold mb-2">Mood Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filtered}>
          <Line type="monotone" dataKey="moodValue" stroke="#4CAF50" strokeWidth={2} />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="displayDate" />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <h3 className="text-xl font-semibold mt-10 mb-2">Mood Frequency (Bar)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={pieData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={index} fill={colorMap[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <h3 className="text-xl font-semibold mt-10 mb-2">Mood Distribution (Pie)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={colorMap[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
