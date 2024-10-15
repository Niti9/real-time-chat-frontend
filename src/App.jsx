
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid2 } from '@mui/material'; // Import Grid2
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import UserLogin from './components/UserLogin';
import ActiveUsers from './components/ActiveUsers';
import { joinChat, sendMessage, disconnectSocket } from './redux/chatSlice';

const App = () => {
  const currentUser = useSelector((state) => state.chat.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(disconnectSocket()); // Cleanup socket connection on unmount
    };
  }, [dispatch]);

  const handleUserJoin = (username) => {
    dispatch(joinChat(username)); // User joins the chat
  };

  const handleSendMessage = (message) => {
    dispatch(sendMessage(message)); // Send message action
  };

  return (
    <Container maxWidth="lg"> {/* Changed maxWidth to "lg" for better layout */}
      {!currentUser ? (
        <UserLogin onJoin={handleUserJoin} />
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Chat Application
          </Typography>
          <Grid2 container spacing={2}> {/* Use Grid2 container for layout */}
            <Grid2  size={{ xs: 12,sm:6, md: 8 }} > {/* ChatMessages will take 8 columns on medium screens and up */}
              <ChatMessages />
            </Grid2>
            <Grid2  size="grow"> {/* ActiveUsers will take 4 columns on medium screens and up */}
              <ActiveUsers />
            </Grid2>
          </Grid2>
          <ChatInput onSend={handleSendMessage} />
        </>
      )}
    </Container>
  );
};

export default App;
