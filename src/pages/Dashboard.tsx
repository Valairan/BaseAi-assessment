import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import mockData from '../services/mockData.json';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [data] = useState(mockData);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </header>
        <main className={styles.main}>
          <Table data={data} />
        </main>
      </div>
    </div>
  );
}
