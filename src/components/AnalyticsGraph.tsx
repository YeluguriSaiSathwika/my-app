import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticsGraph: React.FC<{ data: any[] }> = ({ data }) => (
  <LineChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="total_jobs" stroke="#8884d8" />
    <Line type="monotone" dataKey="average_salary" stroke="#82ca9d" />
  </LineChart>
);

export default AnalyticsGraph;
