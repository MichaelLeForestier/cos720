import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TableContainer } from '@mui/material';
import AddModule from './AddModule';
import InfoIcon from '@mui/icons-material/Info';

interface Module {
  id: number;
  name: string;
  code: string;
  description: string;
}

interface UserModuleData {
  moduleId: number;
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

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const response = await axios.get(`https://localhost:7067/api/Module/SearchModule?name=${searchName}&code=${searchCode}`, config);
      setModules(response.data);

      const userModulesResponse = await axios.get<UserModuleData[]>(`https://localhost:7067/api/UserModule/UserModules/${userId}`, config);
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
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.delete(`https://localhost:7067/api/Module/DeleteModule/${moduleId}`, config);
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
      fetchModules();
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
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.post(`https://localhost:7067/api/UserModule/ModuleRegistration`, { userId, moduleId }, config);
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
      fetchModules();
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
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.post(`https://localhost:7067/api/UserModule/ModuleDeregistration`, { userId, moduleId }, config);
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
      fetchModules();
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

  const sortedModules = modules.sort((a, b) => {
    const aIsRegistered = userRegisteredModules.includes(a.id);
    const bIsRegistered = userRegisteredModules.includes(b.id);

    if (aIsRegistered === bIsRegistered) {
      return 0;
    }

    if (aIsRegistered) {
      return -1;
    }

    return 1;
  });

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <TextField
  type="text"
  value={searchName}
  onChange={(e) => setSearchName(e.target.value)}
  placeholder="Search by name"
  variant="outlined"
  size="small"
  style={{ marginRight: '10px', marginBottom: '10px' }} // Add marginBottom here
/>
<TextField
  type="text"
  value={searchCode}
  onChange={(e) => setSearchCode(e.target.value)}
  placeholder="Search by code"
  variant="outlined"
  size="small"
  style={{ marginRight: '10px', marginBottom: '10px' }} // Add marginBottom here
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
      <TableContainer style={{ maxHeight: '60vh', overflow: 'auto' }}>
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
