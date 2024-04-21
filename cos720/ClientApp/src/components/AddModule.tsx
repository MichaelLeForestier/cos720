import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AddModuleProps {
  onClose: () => void;
}

const AddModule: React.FC<AddModuleProps> = ({ onClose }) => {
  const [moduleName, setModuleName] = useState<string>('');
  const [moduleCode, setModuleCode] = useState<string>('');
  const [moduleDescription, setModuleDescription] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage or wherever it's stored
      if (!token) {
        // Handle case when token is not available
        console.error('Token not found');
        return;
      }
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const moduleData = {
        name: moduleName,
        code: moduleCode,
        description: moduleDescription,
      };

      await axios.post('https://7dd17a8b0f0b9a.lhr.life/api/Module/AddModule', moduleData,config);
      toast.success('Module added successfully');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      
      toast.error('Failed to add module');
    }
  };

  const handleCancel = () => {
    onClose(); // Close the dialog when the user cancels
  };

  return (
    <div>
      <TextField
        label="Module Name"
        variant="outlined"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Module Code"
        variant="outlined"
        value={moduleCode}
        onChange={(e) => setModuleCode(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Module Description"
        variant="outlined"
        value={moduleDescription}
        onChange={(e) => setModuleDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" onClick={handleSubmit} style={{ marginRight: '10px' }}>
        Add
      </Button>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default AddModule;
