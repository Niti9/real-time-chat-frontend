




















// import React, { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { Box, Typography } from '@mui/material';

// const ChatMessages = () => {
//   const messages = useSelector((state) => state.chat.messages);
//   const currentUser = useSelector((state) => state.chat.currentUser);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <Box
//       sx={{
//         height: '400px',
//         overflowY: 'auto',
//         p: 2,
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       {messages.map((message, index) => (
//         <Box
//           key={index}
//           sx={{
//             mb: 1,
//             display: 'flex',
//             justifyContent: message.user === currentUser ? 'flex-end' : 'flex-start',  // Right for current user, left for others
//           }}
//         >
//           <Box
//             sx={{
//               maxWidth: '60%',
//               borderRadius: '8px',
//               padding: '8px',
//               bgcolor: message.user === currentUser ? '#cce5ff' : '#fff',  // Different background color for sent vs received
//               boxShadow: 1,
//             }}
//           >
            
//             <Typography variant="body1">{message.text}</Typography>
//             <Typography variant="subtitle2" color="textSecondary">
//                {message.timestamp}
//             </Typography>
//           <Typography variant="body2"> {message.user} </Typography>
//           </Box>
//         </Box>
//       ))}
//       <div ref={chatEndRef} />
//     </Box>
//   );
// };

// export default ChatMessages;
























// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography } from '@mui/material';
// import { userTyping, userStopTyping } from '../redux/chatSlice'; // Import the typing actions


// // Debouncing function to limit how often typing events are fired
// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(null, args), delay);
//   };
// };


// const ChatMessages = () => {
//   const messages = useSelector((state) => state.chat.messages || []); // Ensure messages is always an array
//   const currentUser = useSelector((state) => state.chat.currentUser);
//   const typingUsers = useSelector((state) => state.chat.typingUsers);
//   const chatEndRef = useRef(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Debounced typing handler (so it doesn't fire too often)
//   const handleTyping = debounce(() => {
//     dispatch(userTyping(currentUser)); // Dispatch the userTyping action when user types
//     setTimeout(() => {
//       dispatch(userStopTyping(currentUser)); // Stop typing after 2 seconds of inactivity
//     }, 2000); // Adjust time as needed
//   }, 500); // Fire the typing event at most every 500ms

//   return (
//     <Box
//       sx={{
//         height: '400px',
//         overflowY: 'auto',
//         p: 2,
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       {/* Display each message */}
//       {messages.map((message, index) => (
//         <Box
//           key={index}
//           sx={{
//             mb: 1,
//             display: 'flex',
//             justifyContent: message.user === currentUser ? 'flex-end' : 'flex-start',
//           }}
//         >
//           <Box
//             sx={{
//               maxWidth: '60%',
//               borderRadius: '8px',
//               padding: '8px',
//               bgcolor: message.user === currentUser ? '#cce5ff' : '#fff',
//               boxShadow: 1,
//             }}
//           >
//             <Typography variant="subtitle2" color="textSecondary">
//               {message.user} - {message.timestamp}
//             </Typography>
//             <Typography variant="body1">{message.text}</Typography>
//           </Box>
//         </Box>
//       ))}

//       {/* Display typing indicators */}
//       {typingUsers.map((user, index) => (
//         <Typography key={index} variant="body2" color="textSecondary">
//           {user} is typing...
//         </Typography>
//       ))}

//       <div ref={chatEndRef} />
//     </Box>
//   );
// };

// export default ChatMessages;

























import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { userTyping, userStopTyping } from '../redux/chatSlice'; // Import the typing actions

const ChatMessages = () => {
  const messages = useSelector((state) => state.chat.messages || []); // Ensure messages is always an array
  const currentUser = useSelector((state) => state.chat.currentUser);
  const typingUsers = useSelector((state) => state.chat.typingUsers); // Get typing users from Redux
  const chatEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate user typing
  const handleTyping = () => {
    dispatch(userTyping()); // Dispatch the userTyping action when user types
    setTimeout(() => {
      dispatch(userStopTyping()); // Dispatch stop typing after 2 seconds of inactivity
    }, 2000); // Adjust this timing as needed
  };

  return (
    <Box
      sx={{
        height: '400px',
        overflowY: 'auto',
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
      }}
      onKeyDown={handleTyping} // Trigger typing when user types
    >
      {/* Display each message */}
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            mb: 1,
            display: 'flex',
            justifyContent: message.user === currentUser ? 'flex-end' : 'flex-start',
          }}
        >
          <Box
            sx={{
              maxWidth: '60%',
              borderRadius: '8px',
              padding: '8px',
              bgcolor: message.user === currentUser ? '#cce5ff' : '#fff',
              boxShadow: 1,
            }}
          >
            <Typography variant="body1">{message.text}</Typography>
            {/* <Typography variant="subtitle2" color="textSecondary">
              {message.user} - {message.timestamp}
            </Typography> */}
            <Typography variant="subtitle2" color="textSecondary">
              {message.timestamp}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Display typing indicators */}
      {typingUsers.length > 0 && (
        <Typography variant="body2" color="textSecondary">
          {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
        </Typography>
      )}

      <div ref={chatEndRef} />
    </Box>
  );
};

export default ChatMessages;

