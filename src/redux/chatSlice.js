import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client'; // Import socket.io-client

let socket; // Declare socket variable (it will be initialized later)

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    currentUser: null,
    users: [],
    typingUsers:[],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload); // Safely add new message
    },
    setUsers: (state, action) => {
      state.users = action.payload; // Update active users list
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload; // Set current user after joining
    },
    resetChat: (state) => {
      state.messages = [];
      state.users = [];
      state.currentUser = null; // Clear chat data on reset
      state.typingUsers = [];   // Clear typing users when chat is reset
    },

    setTypingUser: (state, action) => {
     // Prevent duplicates in typingUsers array
     if (!state.typingUsers.includes(action.payload)) {
      state.typingUsers.push(action.payload);
    }
    },
    removeTypingUser: (state, action) => {
      state.typingUsers = state.typingUsers.filter((user) => user !== action.payload);
    },
  },
});

// Action creators
export const { setMessages, setUsers, setCurrentUser, resetChat,setSocketCurrentUser,setTypingUser, removeTypingUser  } = chatSlice.actions;

// Async thunk for joining the chat and initializing socket listeners
export const joinChat = (username) => (dispatch) => {
  if (!socket) {
    socket = io('http://localhost:5000'); // Initialize socket connection
    
  }

  socket.emit('joinChat', username); // Emit 'joinChat' event to server

  // Listen for events after joining
  socket.on('joined', (user) => {
    // dispatch(setCurrentUser(user)); // Update current user
    dispatch(setCurrentUser(user.username)); // Update current user with user name
  });

  socket.on('activeUsers', (users) => {
    dispatch(setUsers(users)); // Update active users list
  });

  socket.on('receiveMessage', (messageData) => {
    dispatch(setMessages(messageData)); // Add new message to the state
  });

  socket.on('userLeft', (user) => {
    console.log(`${user.username} left the chat`);
  });



   // Handle typing events
   socket.on('typing', (username) => {
    dispatch(setTypingUser(username)); // Add user to typing list
  });

  socket.on('stopTyping', (username) => {
    dispatch(removeTypingUser(username)); // Remove user from typing list
  });
};




export const sendMessage = (messageData) => (dispatch, getState) => {
  const { chat: { currentUser } } = getState(); // Get the current user from the state

  if (socket) {
    const fullMessage = {
      user: currentUser,  // Attach the current user's name to the message
      text: messageData.text,  // Actual message text
      timestamp: new Date().toLocaleTimeString(),  // Timestamp for when the message is sent
    };
    socket.emit('sendMessage', fullMessage); // Send full message object to the server
  }
};




export const userTyping = () => (dispatch, getState) => {
  const { chat: { currentUser } } = getState();

  if (socket) {
    console.log('user is typing',currentUser);
    socket.emit('userTyping', currentUser); // Emit that the current user is typing
  }
};

export const userStopTyping = () => (dispatch, getState) => {
  const { chat: { currentUser } } = getState();

  if (socket) {
    console.log('user stop  typing',currentUser);

    socket.emit('userStopTyping', currentUser); // Emit that the current user stopped typing
  }
};





// Disconnect socket and clean up listeners
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect(); // Disconnect the socket
    socket = null; // Reset socket reference
  }
};

export default chatSlice.reducer;
