import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

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
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <TextField
          type="text"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="Search by action"
          variant="outlined"
          size="small"
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <TextField
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Search by userId"
          variant="outlined"
          size="small"
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          onClick={fetchLogs}
          style={{ backgroundColor: 'rgb(0, 91, 171)', marginRight: '10px', marginBottom: '10px' }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={() => { setAction(''); setUserId(''); fetchLogs(); }}
          style={{ backgroundColor: 'rgb(0, 91, 171)', marginBottom: '10px' }}
        >
          Refresh
        </Button>
      </div>
      <TableContainer style={{ maxWidth: '800px', margin: '0 auto' }}> {/* Set max width for the table container */}
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
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
      </TableContainer>
      <Button
        onClick={onHideReviewLogs}
        style={{ marginTop: '20px', backgroundColor: 'rgb(0, 91, 171)', color: 'white' }}
      >
        Return to Welcome Page
      </Button>
    </div>
  );
};

export default LogPage;
