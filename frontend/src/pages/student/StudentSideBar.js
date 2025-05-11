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

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();
    const theme = useTheme();
    
    return (
        <>
            <React.Fragment>
                <GlassListItemButton 
                    component={Link} 
                    to="/"
                    selected={location.pathname === ("/" || "/Student/dashboard")}
                >
                    <ListItemIcon>
                        <HomeIcon 
                            sx={{
                                color: location.pathname === ("/" || "/Student/dashboard") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Home" 
                        primaryTypographyProps={{
                            fontWeight: location.pathname === ("/" || "/Student/dashboard") ? '600' : '400'
                        }}
                    />
                </GlassListItemButton>
                
                <GlassListItemButton 
                    component={Link} 
                    to="/Student/subjects"
                    selected={location.pathname.startsWith("/Student/subjects")}
                >
                    <ListItemIcon>
                        <AssignmentIcon 
                            sx={{
                                color: location.pathname.startsWith("/Student/subjects") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Subjects" 
                        primaryTypographyProps={{
                            fontWeight: location.pathname.startsWith("/Student/subjects") ? '600' : '400'
                        }}
                    />
                </GlassListItemButton>
                
                <GlassListItemButton 
                    component={Link} 
                    to="/Student/attendance"
                    selected={location.pathname.startsWith("/Student/attendance")}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon 
                            sx={{
                                color: location.pathname.startsWith("/Student/attendance") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Attendance" 
                        primaryTypographyProps={{
                            fontWeight: location.pathname.startsWith("/Student/attendance") ? '600' : '400'
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
                    to="/Student/profile"
                    selected={location.pathname.startsWith("/Student/profile")}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon 
                            sx={{
                                color: location.pathname.startsWith("/Student/profile") 
                                    ? theme.palette.primary.main 
                                    : theme.palette.text.secondary
                            }} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Profile" 
                        primaryTypographyProps={{
                            fontWeight: location.pathname.startsWith("/Student/profile") ? '600' : '400'
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
    )
}

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

export default StudentSideBar;