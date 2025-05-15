import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import mockData from '../services/mockData.json';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [data] = useState(mockData);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const statuses = useMemo(() => {
    const uniqueStatuses = Array.from(new Set(data.map(item => item.status)));
    return ['all', ...uniqueStatuses];
  }, [data]);

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return data;
    return data.filter(item => item.status === statusFilter);
  }, [data, statusFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortBy === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else {
        // Sort by name (string)
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
    });
    return sorted;
  }, [filteredData, sortBy, sortOrder]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </header>

        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label htmlFor="statusFilter" style={{ fontWeight: '600' }}>
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1.5px solid #cbd5e0',
              fontSize: '1rem',
              minWidth: '140px',
            }}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <label htmlFor="sortBy" style={{ fontWeight: '600' }}>
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'id' | 'name')}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1.5px solid #cbd5e0',
              fontSize: '1rem',
              minWidth: '140px',
            }}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>

          <label htmlFor="sortOrder" style={{ fontWeight: '600' }}>
            Order:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1.5px solid #cbd5e0',
              fontSize: '1rem',
              minWidth: '140px',
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <main className={styles.main}>
          <Table data={sortedData} />
        </main>
      </div>
    </div>
  );
}
