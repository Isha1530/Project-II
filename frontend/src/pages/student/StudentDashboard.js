import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <CssBaseline />
            <AppBar 
                position="fixed"
                open={open}
                sx={{
                    background: 'linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                    zIndex: theme.zIndex.drawer + 1,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar sx={{ 
                    pr: '24px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: 3,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon sx={{ fontSize: '1.8rem' }} />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            noWrap
                            sx={{ 
                                fontWeight: 700,
                                letterSpacing: 0.5,
                                color: theme.palette.common.white
                            }}
                        >
                            Student Portal
                        </Typography>
                    </Box>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Drawer 
                variant="permanent" 
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        width: 240,
                        borderRight: 'none',
                        background: theme.palette.background.default,
                        boxShadow: '4px 0 20px -5px rgba(0,0,0,0.1)',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                        ...(!open && {
                            width: theme.spacing(7),
                            [theme.breakpoints.up('sm')]: {
                                width: theme.spacing(9),
                            },
                        }),
                    },
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                    py: 2,
                    minHeight: '64px !important'
                }}>
                    <IconButton onClick={toggleDrawer} sx={{ color: theme.palette.text.secondary }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider sx={{ my: 0 }} />
                <List component="nav" sx={{ p: 1 }}>
                    <StudentSideBar />
                </List>
            </Drawer>
            <Box 
                component="main" 
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    backgroundColor: theme.palette.mode === 'light' 
                        ? '#f5f7fa' 
                        : theme.palette.background.default,
                    p: 3,
                    pt: '64px',
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />
                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default StudentDashboard;