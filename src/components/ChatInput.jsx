// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, TextField, Button } from '@mui/material';
// import { sendMessage } from '../redux/chatSlice';

// const ChatInput = () => {
//   const [input, setInput] = useState('');
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.chat.currentUser);

//   const handleSend = () => {
//     if (input.trim()) {
//       const messageData = {
//         user: currentUser.username, // Send the username of the current user
//         text: input.trim(),
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       dispatch(sendMessage(messageData)); // Dispatch the message
//       setInput(''); // Clear input after sending
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
//       <TextField
//         fullWidth
//         variant="outlined"
//         label="Type a message"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyPress={(e) => {
//           if (e.key === 'Enter') handleSend(); // Send message on Enter key press
//         }}
//       />
//       <Button variant="contained" color="primary" onClick={handleSend}>
//         Send
//       </Button>
//     </Box>
//   );
// };

// export default ChatInput;



















import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button } from '@mui/material';
import { sendMessage, userTyping, userStopTyping } from '../redux/chatSlice';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.chat.currentUser);

  // Handle input change and trigger typing event
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      dispatch(userTyping()); // Notify that user is typing
    }
  };

  // Handle input blur and stop typing event
  const handleInputBlur = () => {
    dispatch(userStopTyping()); // Notify that user stopped typing
  };

  // Handle send message action
  const handleSend = () => {
    if (input.trim()) {
      const messageData = {
        user: currentUser.username, // Send the username of the current user
        text: input.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };
      dispatch(sendMessage(messageData)); // Dispatch the message
      setInput(''); // Clear input after sending
      dispatch(userStopTyping()); // Stop typing once message is sent
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Type a message"
        value={input}
        onChange={handleInputChange} // Call typing handler on change
        onBlur={handleInputBlur} // Call stop typing on blur (unfocus)
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSend(); // Send message on Enter key press
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
