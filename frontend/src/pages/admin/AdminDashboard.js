import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                open={open}
                sx={{
                    backgroundColor: '#4B0082',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                <Toolbar sx={{ pr: 3 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            mr: 3,
                            ...(open && { display: 'none' }),
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                backgroundColor: '#6D28D9',
                            },
                            borderRadius: 2,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1, fontWeight: 600, color: '#F0F9FF' }}
                    >
                        Admin Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: open ? 240 : 60,
                        backgroundColor: '#1E1B4B',
                        color: '#F9FAFB',
                        transition: 'width 0.3s ease-in-out',
                        boxShadow: '2px 0 15px rgba(0,0,0,0.1)',
                        overflowX: 'hidden',
                        '& .MuiListItemIcon-root': {
                            color: '#A5B4FC',
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#3730A3',
                        },
                    }
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>
                    <SideBar />
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    backgroundColor: '#F3F4F6',
                    p: 3,
                    transition: 'margin 0.3s ease-in-out',
                }}
            >
                <Toolbar />
                <Slide direction="up" in mountOnEnter unmountOnExit>
                    <Box>
                        <Routes>
                            <Route path="/" element={<AdminHomePage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                            <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                            <Route path="/Admin/profile" element={<AdminProfile />} />
                            <Route path="/Admin/complains" element={<SeeComplains />} />

                            {/* Notice */}
                            <Route path="/Admin/addnotice" element={<AddNotice />} />
                            <Route path="/Admin/notices" element={<ShowNotices />} />

                            {/* Subject */}
                            <Route path="/Admin/subjects" element={<ShowSubjects />} />
                            <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                            <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                            <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                            <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                            <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                            <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                            {/* Class */}
                            <Route path="/Admin/addclass" element={<AddClass />} />
                            <Route path="/Admin/classes" element={<ShowClasses />} />
                            <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                            <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                            {/* Student */}
                            <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                            <Route path="/Admin/students" element={<ShowStudents />} />
                            <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                            <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                            <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                            {/* Teacher */}
                            <Route path="/Admin/teachers" element={<ShowTeachers />} />
                            <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                            <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                            <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                            <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                            <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Box>
                </Slide>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
