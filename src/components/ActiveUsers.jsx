// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Box, Typography } from '@mui/material';

// const ActiveUsers = () => {
//   const users = useSelector((state) => state.chat.users);

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h6">Active Users:</Typography>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.username} is online</li>
//         ))}
//       </ul>
//     </Box>
//   );
// };

// export default ActiveUsers;












import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider } from '@mui/material';
// import PersonIcon from '@mui/icons-material';
import { Person2 } from '@mui/icons-material';

const ActiveUsers = () => {
  const users = useSelector((state) => state.chat.users);

  return (

    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 2}}>
      <Typography variant="subtitle1" gutterBottom>
        Active Users
      </Typography>
      <Divider />
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Person2 />
              </Avatar>
            </ListItemIcon>
            <ListItemText 
              primary={user.username} 
              secondary="Online"
              primaryTypographyProps={{ fontWeight: 'bold' }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActiveUsers;
