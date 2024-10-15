import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography } from '@mui/material';
import { joinChat } from '../redux/chatSlice';

const UserLogin = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleJoinChat = () => {
    if (name.trim()) {
      dispatch(joinChat(name.trim())); // Just join the chat without connecting the socket here
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <Typography variant="h6" align="center">
        Join Chat
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleJoinChat}>
        Join Chat
      </Button>
    </Box>
  );
};

export default UserLogin;
