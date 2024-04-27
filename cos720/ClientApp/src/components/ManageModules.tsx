import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TableContainer } from '@mui/material';
import AddModule from './AddModule'; // Import the AddModule component
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon from MUI
import { config } from 'process';

interface Module {
  id: number;
  name: string;
  code: string;
  description: string;
  // Add more properties as needed
}

interface UserModuleData {
  moduleId: number; // Adjust the type accordingly if the ID is of a different type
  // Add other properties if needed
}

interface ManageModulesProps {
  onHideManageModules: () => void;
  isAdmin: boolean;
}

const ManageModules: React.FC<ManageModulesProps> = ({ isAdmin }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [searchCode, setSearchCode] = useState<string>('');
  const [openAddModuleDialog, setOpenAddModuleDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [userRegisteredModules, setUserRegisteredModules] = useState<number[]>([]);
  const userId = localStorage.getItem('Id') || 'U';

  // Function to fetch modules from backend
  const fetchModules = async () => {
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
      const response = await axios.get(`https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/Module/SearchModule?name=${searchName}&code=${searchCode}`,config);
      setModules(response.data);

      // Fetch modules the current user is registered for
      const userModulesResponse = await axios.get<UserModuleData[]>(`https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/UserModule/UserModules/${userId}`,config);
      const userModuleIds = userModulesResponse.data.map((userModule: UserModuleData) => userModule.moduleId);
      setUserRegisteredModules(userModuleIds);
    } catch (error) {
      console.error('Failed to fetch modules', error);
      toast.error('Failed to fetch modules', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: 'fetch_modules_error',
      });
    }
  };

  useEffect(() => {
    fetchModules();
  }, [searchName, searchCode]);

  const handleDelete = async (moduleId: number) => {
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
  
      await axios.delete(`https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/Module/DeleteModule/${moduleId}`, config);
      toast.success('Module successfully deleted', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      fetchModules(); // Refresh modules list after deletion
    } catch (error) {
      console.error('Failed to delete module', error);
      toast.error('Failed to delete module', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: 'delete_module_error',
      });
    }
  };
  
  

  const handleRegister = async (moduleId: number, userId: string) => {
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
      await axios.post(`https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/UserModule/ModuleRegistration`, { userId, moduleId},config);
      toast.success('Successfully registered for the module', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      fetchModules(); // Refresh modules list after registration
    } catch (error) {
      console.error('Failed to register for the module', error);
      toast.error('Failed to register for the module', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: 'register_module_error',
      });
    }
  };

  const handleDeregister = async (moduleId: number, userId: string) => {
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
      await axios.post(`https://umz8jir766.execute-api.eu-north-1.amazonaws.com/dev/api/UserModule/ModuleDeregistration`, { userId, moduleId },config);
      toast.success('Successfully deregistered from the module', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      fetchModules(); // Refresh modules list after deregistration
    } catch (error) {
      console.error('Failed to deregister from the module', error);
      toast.error('Failed to deregister from the module', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: 'deregister_module_error',
      });
    }
  };

  const handleOpenAddModuleDialog = () => {
    setOpenAddModuleDialog(true);
  };

  const handleCloseAddModuleDialog = () => {
    setOpenAddModuleDialog(false);
  };

  const handleDescriptionClick = (description: string) => {
    setSelectedModule(description);
  };

  const handleCloseDescriptionDialog = () => {
    setSelectedModule(null);
  };

  // Sort the modules list so that registered modules appear at the top
  const sortedModules = modules.sort((a, b) => {
    const aIsRegistered = userRegisteredModules.includes(a.id);
    const bIsRegistered = userRegisteredModules.includes(b.id);

    // If both modules are registered or unregistered, maintain their original order
    if (aIsRegistered === bIsRegistered) {
      return 0;
    }

    // If module a is registered and module b is not, a should come before b
    if (aIsRegistered) {
      return -1;
    }

    // If module b is registered and module a is not, b should come before a
    return 1;
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by name"
          variant="outlined"
          size="small"
          style={{ marginRight: '10px' }}
        />
        <TextField
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="Search by code"
          variant="outlined"
          size="small"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={fetchModules} style={{ backgroundColor: 'rgb(0, 91, 171)', marginRight: '10px' }}>
          Search
        </Button>
        <Button variant="contained" onClick={() => { setSearchName(''); setSearchCode(''); fetchModules(); }} style={{ backgroundColor: 'rgb(0, 91, 171)' }}>
          Refresh
        </Button>
      </div>
      {isAdmin && (
        <Button variant="contained" onClick={handleOpenAddModuleDialog} style={{ marginBottom: '20px', backgroundColor: 'rgb(0, 91, 171)' }}>
          Add New Module
        </Button>
      )}
      <TableContainer style={{ maxHeight: '55vh', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ 'backgroundColor': '#f5f5f5', "height": '35px', "width": '100%' }}>
              <TableCell>Module Name</TableCell>
              <TableCell>Module Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedModules.map((module) => (
              <TableRow key={module.id}>
                <TableCell>{module.name}</TableCell>
                <TableCell>{module.code}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDescriptionClick(module.description)}>
                    <InfoIcon />
                  </IconButton>
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleDelete(module.id)}>
                      Delete
                    </Button>
                  </TableCell>
                )}
                {!isAdmin && (
                  <TableCell>
                    {userRegisteredModules.includes(module.id) ?
                      <Button variant="contained" onClick={() => handleDeregister(module.id, userId)} style={{ marginLeft: '10px', backgroundColor: 'rgb(0, 91, 171)' }}>
                        Deregister
                      </Button> :
                      <Button variant="outlined" onClick={() => handleRegister(module.id, userId)} style={{ marginLeft: '10px', color: 'rgb(0, 91, 171)' }}>
                        Register
                      </Button>
                    }
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Dialog for adding new module */}
      <Dialog open={openAddModuleDialog} onClose={handleCloseAddModuleDialog}>
        <DialogTitle>Add New Module</DialogTitle>
        <DialogContent>
          <AddModule onClose={handleCloseAddModuleDialog} />
        </DialogContent>
      </Dialog>
      {/* Dialog to show module description */}
      <Dialog open={selectedModule !== null} onClose={handleCloseDescriptionDialog}>
        <DialogTitle>Module Description</DialogTitle>
        <DialogContent>
          {selectedModule}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDescriptionDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageModules;
