import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const motivationalQuotes = [
  "Hard work beats talent when talent doesn't work hard.",
  "Every day is a chance to get better.",
  "Pain is temporary, glory is forever.",
  "Your only limit is you.",
  "Push yourself, because no one else is going to do it for you.",
  "Don't stop when you're tired, stop when you're done."
];

const initialBestTimes = {
  swim: 120,  // 100m in seconds
  run: 1500,  // 5km in seconds
  bike: 1800  // 20km in seconds
};

const initialLogs = [];

const initialStats = [
  { name: 'Week 1', swim: 2000, run: 5000, bike: 20000 },
  { name: 'Week 2', swim: 2500, run: 7000, bike: 25000 },
  { name: 'Week 3', swim: 3000, run: 8000, bike: 30000 }
];

export default function WorkoutPlanner() {
  const [quote, setQuote] = useState("");
  const [bestTimes, setBestTimes] = useState(initialBestTimes);
  const [logs, setLogs] = useState(initialLogs);
  const [stats, setStats] = useState(initialStats);
  const [newLog, setNewLog] = useState("");

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (newLog.trim() !== "") {
      setLogs([{ date: new Date().toLocaleDateString(), text: newLog }, ...logs]);
      setNewLog("");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center bg-gray-100 min-h-screen">
      {/* Motivational Quote */}
      <Card className="w-full max-w-md mb-4 shadow-lg rounded-2xl border-2 border-gray-300">
        <CardContent>
          <blockquote className="text-center text-green-600 font-semibold">"{quote}"</blockquote>
        </CardContent>
      </Card>

      {/* Best Times */}
      <Card className="w-full max-w-md mb-4 shadow-lg rounded-2xl border-2 border-gray-300">
        <CardContent>
          <h2 className="text-xl font-bold text-center text-blue-700">Best Times</h2>
          <ul className="mt-4">
            <li>🏊‍♂️ 100m Swim: {bestTimes.swim} seconds</li>
            <li>🏃‍♂️ 5km Run: {bestTimes.run} seconds</li>
            <li>🚴‍♂️ 20km Bike: {bestTimes.bike} seconds</li>
          </ul>
        </CardContent>
      </Card>

      {/* Logbook */}
      <Card className="w-full max-w-md mb-4 shadow-lg rounded-2xl border-2 border-gray-300">
        <CardContent>
          <h2 className="text-xl font-bold text-center text-blue-700">Logbook</h2>
          <form onSubmit={handleLogSubmit} className="mt-4">
            <textarea
              value={newLog}
              onChange={(e) => setNewLog(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Add a note about today's workout..."
            />
            <Button type="submit" className="bg-blue-700 text-white rounded-xl px-4 py-2 shadow-md hover:bg-blue-800">Add Note</Button>
          </form>
          <ul className="mt-4">
            {logs.map((log, index) => (
              <li key={index} className="mb-2 bg-white p-2 rounded shadow-md border-l-4 border-blue-700">
                <strong>{log.date}:</strong> {log.text}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Weekly Progress Chart */}
      <Card className="w-full max-w-md mb-4 shadow-lg rounded-2xl border-2 border-gray-300">
        <CardContent>
          <h2 className="text-xl font-bold text-center text-blue-700">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="swim" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="run" stroke="#82ca9d" />
              <Line type="monotone" dataKey="bike" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

