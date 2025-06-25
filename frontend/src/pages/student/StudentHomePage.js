import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, useTheme, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from '@emotion/styled';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ 
            mt: 4, 
            mb: 4,
            position: 'relative',
            zIndex: 1
        }}>
            <Grid container spacing={3}>
                {/* Subjects Card */}
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3} theme={theme}>
                        <IconContainer>
                            <img src={Subject} alt="Subjects" />
                        </IconContainer>
                        <Box sx={{ textAlign: 'center' }}>
                            <Title variant="h6" theme={theme}>
                                Total Subjects
                            </Title>
                            <Data 
                                start={0} 
                                end={numberOfSubjects} 
                                duration={2.5} 
                                theme={theme}
                            />
                            <Typography variant="body2" color="textSecondary" mt={1}>
                                Currently enrolled
                            </Typography>
                        </Box>
                    </StyledPaper>
                </Grid>

                {/* Attendance Chart */}
                <Grid item xs={12} md={6}>
                    <ChartContainer elevation={3} theme={theme}>
                        {
                            response ? (
                                <Typography variant="h6" color="textSecondary">
                                    No Attendance Found
                                </Typography>
                            ) : loading ? (
                                <Box display="flex" height="100%" alignItems="center" justifyContent="center">
                                    <Typography variant="h6" color="textSecondary">
                                        Loading Attendance...
                                    </Typography>
                                </Box>
                            ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                <>
                                    <Typography variant="h6" mb={2} color="textPrimary">
                                        Your Attendance Overview
                                    </Typography>
                                    <CustomPieChart data={chartData} />
                                    <LegendContainer>
                                        <LegendItem>
                                            <LegendColor style={{ backgroundColor: '#4CAF50' }} />
                                            <Typography variant="body2">Present: {overallAttendancePercentage.toFixed(1)}%</Typography>
                                        </LegendItem>
                                        <LegendItem>
                                            <LegendColor style={{ backgroundColor: '#F44336' }} />
                                            <Typography variant="body2">Absent: {overallAbsentPercentage.toFixed(1)}%</Typography>
                                        </LegendItem>
                                    </LegendContainer>
                                </>
                            ) : (
                                <Typography variant="h6" color="textSecondary">
                                    No Attendance Data Available
                                </Typography>
                            )
                        }
                    </ChartContainer>
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <StyledNoticePaper elevation={3} theme={theme}>
                        <Typography variant="h6" mb={2} color="textPrimary">
                            Latest Notices
                        </Typography>
                        <SeeNotice />
                    </StyledNoticePaper>
                </Grid>
            </Grid>
        </Container>
    )
}

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: '16px',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
    }
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

const StyledNoticePaper = styled(Paper)(({ theme }) => ({
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

const IconContainer = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    img {
        width: 100%;
        height: auto;
    }
`;

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: '8px',
    fontWeight: 600,
    color: theme.palette.text.primary
}));

const Data = styled(CountUp)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    lineHeight: 1.2
}));

const LegendContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 16px;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const LegendColor = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 4px;
`;

export default StudentHomePage;