import { useState } from 'react';
import Table from '../components/Table';
import mockData from '../services/mockData.json';

export default function Dashboard() {
  const [data] = useState(mockData);

  return (
    <div>
      <h1>Dashboard</h1>
      <Table data={data} />
    </div>
  );
}
