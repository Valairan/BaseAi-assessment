import React from 'react';

type Props = {
  data: { id: number; name: string; status: string }[];
};

const Table = ({ data }: Props) => {
  return (
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Status</th></tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td><td>{row.name}</td><td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
