import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import csv from 'csv-parser';

interface JobDetailsProps {
  year: number;
}

interface JobData {
  job_title: string;
  count: number;
}

const JobDetailsTable: React.FC<JobDetailsProps> = ({ year }) => {
  const [data, setData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/salaries-${year}.csv`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const csvData = await response.text();
        const jsonData: { job_title: string }[] = [];
        csvData
          .trim()
          .split('\n')
          .forEach((line) => {
            const [job_title] = line.split(',');
            jsonData.push({ job_title });
          });
        const aggregatedData = jsonData.reduce((acc: Record<string, number>, job) => {
          acc[job.job_title] = (acc[job.job_title] || 0) + 1;
          return acc;
        }, {});
        setData(
          Object.keys(aggregatedData).map((key) => ({
            job_title: key,
            count: aggregatedData[key],
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  const columns = [
    { title: 'Job Title', dataIndex: 'job_title', key: 'job_title' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
  ];

  return <Table dataSource={data} columns={columns} loading={loading} />;
};

export default JobDetailsTable;
