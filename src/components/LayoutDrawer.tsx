import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppStore } from '@/store/appStore';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Home, ListAlt, VerifiedUser } from '@mui/icons-material';

const drawerWidth = 240;

export default function LayoutDrawer() {
  const navigate = useNavigate();

  const showDrawer = useAppStore((state) => state.showDrawer);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      open={showDrawer}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem key='Dashboard' disablePadding onClick={() => navigate('/')}>
            <ListItemButton>
              <ListItemIcon>
                <Home></Home>
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key='Products' disablePadding onClick={() => navigate('/products')}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt></ListAlt>
              </ListItemIcon>
              <ListItemText primary='Products' />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key='Users' disablePadding onClick={() => navigate('/users')}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle></AccountCircle>
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key='Profile' disablePadding onClick={() => navigate('/profile')}>
            <ListItemButton>
              <ListItemIcon>
                <VerifiedUser></VerifiedUser>
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
}