import React from 'react';
import styles from './Table.module.css';

interface TableProps {
  data: {
    id: number;
    name: string;
    status: string;
    [key: string]: any; // in case there are other columns
  }[];
}

export default function Table({ data }: TableProps) {
  if (!data.length) {
    return <p>No data available</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Status</th>
          {/* Add other headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className={styles.tr}>
            <td className={styles.td}>{item.id}</td>
            <td className={styles.td}>{item.name}</td>
            <td className={styles.td}>{item.status}</td>
            {/* Add other cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
