import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import csv from 'csvtojson';

interface DataType {
  year: number;
  total_jobs: number;
  average_salary: number;
}

const MainTable: React.FC<{ onRowClick: (year: number) => void }> = ({ onRowClick }) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/salaries.csv`);
      const csvData = await response.text();
      const jsonData = await csv().fromString(csvData);
      setData(jsonData as DataType[]);
    };
    fetchData();
  }, []);

  const columns = [
    { title: 'Year', dataIndex: 'year', key: 'year', sorter: (a: DataType, b: DataType) => a.year - b.year },
    { title: 'Total Jobs', dataIndex: 'total_jobs', key: 'total_jobs', sorter: (a: DataType, b: DataType) => a.total_jobs - b.total_jobs },
    { title: 'Average Salary', dataIndex: 'average_salary', key: 'average_salary', sorter: (a: DataType, b: DataType) => a.average_salary - b.average_salary }
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      onRow={(record) => ({
        onClick: () => onRowClick(record.year),
      })}
    />
  );
};

export default MainTable;
