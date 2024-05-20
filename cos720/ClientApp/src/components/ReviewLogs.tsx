import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

interface Log {
  id: number;
  timestamp: string;
  message: string;
  exception: string;
  action: string;
  userId: string;
}

interface ReviewLogsProps {
  onHideReviewLogs: () => void;
}

const LogPage: React.FC<ReviewLogsProps> = ({ onHideReviewLogs }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [action, setAction] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    fetchLogs();
  }, [action, userId]);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const response = await axios.get(`https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/Logging/SearchLogs?action=${action}&userId=${userId}`,config);
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs', error);
      // Handle error
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <input type="text" value={action} onChange={(e) => setAction(e.target.value)} placeholder="Search by action" style={{ marginRight: '10px', marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Search by userId" style={{ marginRight: '10px', marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button onClick={fetchLogs} style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: 'rgb(0, 91, 171)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Search</button>
        <button onClick={() => { setAction(''); setUserId(''); fetchLogs(); }} style={{ backgroundColor: 'rgb(0, 91, 171)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Refresh</button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '10%' }}>Id</TableCell>
            <TableCell style={{ width: '20%' }}>Timestamp</TableCell>
            <TableCell style={{ width: '20%' }}>Message</TableCell>
            <TableCell style={{ width: '20%' }}>Exception</TableCell>
            <TableCell style={{ width: '15%' }}>Action</TableCell>
            <TableCell style={{ width: '15%' }}>UserId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.id}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>{log.exception}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button onClick={onHideReviewLogs} style={{ marginTop: '20px', backgroundColor: 'rgb(0, 91, 171)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Return to Welcome Page</button>
    </div>
  );
};

export default LogPage;
