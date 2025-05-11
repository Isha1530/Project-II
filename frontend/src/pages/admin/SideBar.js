import * as React from 'react';
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    styled,
    Tooltip,
    Zoom
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const navItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Classes", path: "/Admin/classes", icon: <ClassOutlinedIcon /> },
    { text: "Subjects", path: "/Admin/subjects", icon: <AssignmentIcon /> },
    { text: "Teachers", path: "/Admin/teachers", icon: <SupervisorAccountOutlinedIcon /> },
    { text: "Students", path: "/Admin/students", icon: <PersonOutlineIcon /> },
    { text: "Notices", path: "/Admin/notices", icon: <AnnouncementOutlinedIcon /> },
    // { text: "Complains", path: "/Admin/complains", icon: <ReportIcon /> },
];

const userItems = [
    { text: "Profile", path: "/Admin/profile", icon: <AccountCircleOutlinedIcon /> },
    { text: "Logout", path: "/logout", icon: <ExitToAppIcon /> },
];

const SideBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <>
            {navItems.map(({ text, path, icon }) => (
                <Zoom in key={path} timeout={400}>
                    <StyledButton
                        component={Link}
                        to={path}
                        selected={isActive(path)}
                    >
                        <ListItemIcon sx={{ color: isActive(path) ? '#4B0082' : '#CBD5E1' }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </StyledButton>
                </Zoom>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
                User
            </ListSubheader>
            {userItems.map(({ text, path, icon }) => (
                <Zoom in key={path} timeout={500}>
                    <StyledButton
                        component={Link}
                        to={path}
                        selected={isActive(path)}
                    >
                        <ListItemIcon sx={{ color: isActive(path) ? '#4B0082' : '#CBD5E1' }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </StyledButton>
                </Zoom>
            ))}
        </>
    );
};

export default SideBar;

const StyledButton = styled(ListItemButton)(({ selected }) => ({
    margin: '4px 8px',
    borderRadius: '12px',
    transition: 'background-color 0.3s ease',
    backgroundColor: selected ? '#E0E7FF' : 'transparent',
    '&:hover': {
        backgroundColor: '#F0F4FF',
    },
}));
