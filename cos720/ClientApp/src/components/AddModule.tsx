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
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!moduleName) newErrors.moduleName = 'Module name is required';
    if (!moduleCode) newErrors.moduleCode = 'Module code is required';
    if (!moduleDescription) newErrors.moduleDescription = 'Module description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage or wherever it's stored
      if (!token) {
        // Handle case when token is not available
        console.error('Token not found');
        toast.error('Authentication token is missing');
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

      await axios.post('https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/Module/AddModule', moduleData, config);
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
        error={!!errors.moduleName}
        helperText={errors.moduleName}
      />
      <TextField
        label="Module Code"
        variant="outlined"
        value={moduleCode}
        onChange={(e) => setModuleCode(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.moduleCode}
        helperText={errors.moduleCode}
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
        error={!!errors.moduleDescription}
        helperText={errors.moduleDescription}
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
