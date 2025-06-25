import * as React from 'react';
import { 
  Divider, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  ListSubheader,
  styled,
  useTheme
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

const TeacherSideBar = () => {
    const theme = useTheme();
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;

    return (
        <>
            <React.Fragment>
                <GlassListItemButton 
                    component={Link} 
                    to="/"
                    selected={location.pathname === ("/" || "/Teacher/dashboard")}
                >
                    <ListItemIcon>
                        <HomeIcon 
                            sx={{
                                color: location.pathname === ("/" || "/Teacher/dashboard") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Home" 
                        primaryTypographyProps={{
                            fontWeight: location.pathname === ("/" || "/Teacher/dashboard") ? '600' : '400'
                        }}
                    />
                </GlassListItemButton>
                
                <GlassListItemButton 
                    component={Link} 
                    to="/Teacher/class"
                    selected={location.pathname.startsWith("/Teacher/class")}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon 
                            sx={{
                                color: location.pathname.startsWith("/Teacher/class") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary={`Class ${sclassName.sclassName}`} 
                        primaryTypographyProps={{
                            fontWeight: location.pathname.startsWith("/Teacher/class") ? '600' : '400'
                        }}
                    />
                </GlassListItemButton>
            </React.Fragment>
            
            <GlassDivider sx={{ my: 1 }} />
            
            <React.Fragment>
                <GlassListSubheader component="div" inset>
                    User
                </GlassListSubheader>
                
                <GlassListItemButton 
                    component={Link} 
                    to="/Teacher/profile"
                    selected={location.pathname.startsWith("/Teacher/profile")}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon 
                            sx={{
                                color: location.pathname.startsWith("/Teacher/profile") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Profile" 
                        primaryTypographyProps={{
                            fontWeight: location.pathname.startsWith("/Teacher/profile") ? '600' : '400'
                        }}
                    />
                </GlassListItemButton>
                
                <GlassListItemButton 
                    component={Link} 
                    to="/logout"
                    selected={location.pathname.startsWith("/logout")}
                >
                    <ListItemIcon>
                        <ExitToAppIcon 
                            sx={{
                                color: location.pathname.startsWith("/logout") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Logout" 
                        primaryTypographyProps={{
                            fontWeight: location.pathname.startsWith("/logout") ? '600' : '400'
                        }}
                    />
                </GlassListItemButton>
            </React.Fragment>
        </>
    );
};

// Styled Components
const GlassListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: '12px',
  margin: '0 8px 4px 8px',
  padding: '8px 12px',
  transition: 'all 0.3s ease',
  background: selected 
    ? 'rgba(66, 165, 245, 0.1)' 
    : 'transparent',
  backdropFilter: 'blur(5px)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
  },
  '&.Mui-selected': {
    background: 'rgba(66, 165, 245, 0.15)',
    '&:hover': {
      background: 'rgba(66, 165, 245, 0.2)',
    },
  },
}));

const GlassDivider = styled(Divider)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  margin: '8px 16px',
}));

const GlassListSubheader = styled(ListSubheader)(({ theme }) => ({
  background: 'transparent',
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  fontWeight: '600',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  paddingLeft: '24px',
  lineHeight: '2.5',
}));

export default TeacherSideBar;