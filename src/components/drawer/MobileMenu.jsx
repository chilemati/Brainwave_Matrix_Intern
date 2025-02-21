import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { MenuItem } from '@mui/material';

export default function MobileMenu({state,setState,menu}) {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(prev => !prev);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className='' >
      <MenuItem className="flexCol menuList   w-full p-3 gap-3 "> {menu}</MenuItem>
      </List>
    </Box>
  );

  return (
    <div>
    
        <React.Fragment key={'top'}>
          <SwipeableDrawer
            anchor={'top'}
            open={state}
            onClose={toggleDrawer()}
            onOpen={toggleDrawer()}
          >
            {list('top')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
