import { Container, Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import { styled } from '@mui/material/styles';
import Students from "../../assets/img1.png";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Student Count Card */}
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Box sx={{ 
                                width: 100, 
                                height: 100,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img 
                                    src={Students} 
                                    alt="Students" 
                                    style={{ width: '100%', height: 'auto' }} 
                                />
                            </Box>
                            <Box>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Class Students
                                </Typography>
                                <Typography variant="h3" color="primary" fontWeight="bold">
                                    <CountUp 
                                        start={0} 
                                        end={numberOfStudents} 
                                        duration={2.5} 
                                    />
                                </Typography>
                            </Box>
                        </Box>
                    </StyledPaper>
                </Grid>

                {/* Additional Feature: Upcoming Classes */}
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Next Class
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                            {subjectDetails?.subName || "Your Subject"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Tomorrow, 10:00 AM
                        </Typography>
                    </StyledPaper>
                </Grid>

                {/* Additional Feature: Recent Activity */}
                <Grid item xs={12} md={6} lg={4}>
                    <StyledPaper elevation={3}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Recent Activity
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Last attendance taken: 2 days ago
                        </Typography>
                        <Typography variant="body1">
                            5 assignments graded
                        </Typography>
                    </StyledPaper>
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 3, 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            School Notices
                        </Typography>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius * 2,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
    }
}));

export default TeacherHomePage;