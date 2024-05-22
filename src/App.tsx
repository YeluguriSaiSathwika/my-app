import React, { useState } from 'react';
import MainTable from './components/MainTable';
import AnalyticsGraph from './components/AnalyticsGraph';
import JobDetailsTable from './components/JobDetailsTable';
import './App.css';

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleRowClick = (year: number) => {
    setSelectedYear(year);
  };

  const data = [
    // Replace with actual data fetching logic
    { year: 2020, total_jobs: 4000, average_salary: 70000 },
    { year: 2021, total_jobs: 4500, average_salary: 75000 },
    // ...
  ];

  return (
    <div className="App">
      <h1>ML Engineer Salaries</h1>
      <MainTable onRowClick={handleRowClick} />
      <h2>Analytics</h2>
      <AnalyticsGraph data={data} />
      {selectedYear && (
        <>
          <h2>Job Details for {selectedYear}</h2>
          <JobDetailsTable year={selectedYear} />
        </>
      )}
    </div>
  );
};

export default App;
