import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Collapse, 
  Table, 
  TableBody, 
  TableHead, 
  Typography, 
  Paper,
  CircularProgress,
  Avatar,
  Container,
  useTheme,
  styled
} from '@mui/material';
import { 
  KeyboardArrowDown, 
  KeyboardArrowUp 
} from '@mui/icons-material';
import { 
  calculateOverallAttendancePercentage, 
  calculateSubjectAttendancePercentage, 
  groupAttendanceBySubject 
} from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const renderStudentInfo = () => {
        return (
            <GlassContainer>
                <StudentHeader>
                    <Avatar 
                        sx={{ 
                            width: 80, 
                            height: 80, 
                            fontSize: '2.5rem',
                            bgcolor: theme.palette.primary.main,
                            marginRight: '1.5rem'
                        }}
                    >
                        {userDetails.name.charAt(0)}
                    </Avatar>
                    <Box>
                        <StudentName variant="h4">{userDetails.name}</StudentName>
                        <StudentDetail variant="subtitle1">
                            Roll No: {userDetails.rollNum}
                        </StudentDetail>
                        <StudentDetail variant="subtitle1">
                            Class: {sclassName.sclassName}
                        </StudentDetail>
                        <StudentDetail variant="subtitle1">
                            School: {studentSchool.schoolName}
                        </StudentDetail>
                    </Box>
                </StudentHeader>
            </GlassContainer>
        );
    };

    const renderAttendanceSection = () => {
        if (!subjectAttendance || !Array.isArray(subjectAttendance)) {
            return null;
        }

        const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
        const subjectAttendanceData = Object.entries(attendanceBySubject).find(
            ([subName]) => subName === teachSubject
        );

        if (!subjectAttendanceData) {
            return (
                <GlassContainer>
                    <Typography variant="h6" color="textSecondary">
                        No attendance records found for {teachSubject}
                    </Typography>
                </GlassContainer>
            );
        }

        const [subName, { present, allData, subId, sessions }] = subjectAttendanceData;
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

        return (
            <GlassContainer>
                <SectionTitle variant="h5" gutterBottom>
                    {teachSubject} Attendance
                </SectionTitle>
                
                <GlassTableContainer>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell align="center">Present</StyledTableCell>
                                <StyledTableCell align="center">Total Sessions</StyledTableCell>
                                <StyledTableCell align="center">Percentage</StyledTableCell>
                                <StyledTableCell align="center">Details</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>{subName}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <PresentBadge>{present}</PresentBadge>
                                </StyledTableCell>
                                <StyledTableCell align="center">{sessions}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <PercentageBadge percentage={subjectAttendancePercentage}>
                                        {subjectAttendancePercentage}%
                                    </PercentageBadge>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <DetailButton 
                                        variant="outlined"
                                        onClick={() => handleOpen(subId)}
                                        endIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    >
                                        Details
                                    </DetailButton>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                        <DetailsContainer>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Detailed Attendance Records
                                            </Typography>
                                            <Table size="small">
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Date</StyledTableCell>
                                                        <StyledTableCell align="right">Status</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {allData.map((data, index) => {
                                                        const date = new Date(data.date);
                                                        const dateString = date.toString() !== "Invalid Date" 
                                                            ? date.toLocaleDateString() 
                                                            : "Invalid Date";
                                                        return (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell>{dateString}</StyledTableCell>
                                                                <StyledTableCell align="right">
                                                                    <StatusBadge status={data.status}>
                                                                        {data.status}
                                                                    </StatusBadge>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </DetailsContainer>
                                    </Collapse>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </GlassTableContainer>

                <OverallAttendanceContainer>
                    <Typography variant="h6">Overall Attendance</Typography>
                    <AttendancePercentage>
                        {overallAttendancePercentage.toFixed(1)}%
                    </AttendancePercentage>
                    <CustomPieChart data={chartData} />
                </OverallAttendanceContainer>

                <ButtonContainer>
                    <PurpleButton 
                        variant="contained"
                        onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                    >
                        Add Attendance
                    </PurpleButton>
                </ButtonContainer>
            </GlassContainer>
        );
    };

    const renderMarksSection = () => {
        if (!subjectMarks || !Array.isArray(subjectMarks)) {
            return null;
        }

        const subjectMark = subjectMarks.find(
            result => result.subName?.subName === teachSubject
        );

        if (!subjectMark) {
            return (
                <GlassContainer>
                    <Typography variant="h6" color="textSecondary">
                        No marks recorded for {teachSubject}
                    </Typography>
                </GlassContainer>
            );
        }

        return (
            <GlassContainer>
                <SectionTitle variant="h5" gutterBottom>
                    {teachSubject} Marks
                </SectionTitle>
                
                <GlassTableContainer>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell align="center">Marks Obtained</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>{subjectMark.subName.subName}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <MarksBadge>
                                        {subjectMark.marksObtained}
                                    </MarksBadge>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </GlassTableContainer>

                <ButtonContainer>
                    <PurpleButton 
                        variant="contained"
                        onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                    >
                        Add Marks
                    </PurpleButton>
                </ButtonContainer>
            </GlassContainer>
        );
    };

    return (
        <MainContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={60} />
                </LoadingContainer>
            ) : (
                <>
                    {renderStudentInfo()}
                    {renderAttendanceSection()}
                    {renderMarksSection()}
                </>
            )}
        </MainContainer>
    );
};

// Styled Components
const MainContainer = styled(Container)({
    padding: '2rem 0',
});

const GlassContainer = styled(Paper)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '2rem',
}));

const StudentHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
});

const StudentName = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: theme.palette.text.primary,
}));

const StudentDetail = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: '0.25rem',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: theme.palette.primary.main,
}));

const GlassTableContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    marginBottom: '1.5rem',
}));

const PresentBadge = styled('span')(({ theme }) => ({
    display: 'inline-block',
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
    borderRadius: '12px',
    padding: '4px 12px',
    fontWeight: '600',
}));

const PercentageBadge = styled('span')(({ percentage, theme }) => ({
    display: 'inline-block',
    backgroundColor: percentage >= 75 
        ? theme.palette.success.light 
        : percentage >= 50 
            ? theme.palette.warning.light 
            : theme.palette.error.light,
    color: theme.palette.getContrastText(
        percentage >= 75 
            ? theme.palette.success.light 
            : percentage >= 50 
                ? theme.palette.warning.light 
                : theme.palette.error.light
    ),
    borderRadius: '12px',
    padding: '4px 12px',
    fontWeight: '600',
}));

const StatusBadge = styled('span')(({ status, theme }) => ({
    display: 'inline-block',
    backgroundColor: status === 'Present' 
        ? theme.palette.success.light 
        : theme.palette.error.light,
    color: status === 'Present' 
        ? theme.palette.success.contrastText 
        : theme.palette.error.contrastText,
    borderRadius: '12px',
    padding: '4px 12px',
    fontWeight: '600',
}));

const MarksBadge = styled('span')(({ theme }) => ({
    display: 'inline-block',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: '12px',
    padding: '4px 12px',
    fontWeight: '600',
}));

const DetailButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: '12px',
    padding: '6px 16px',
    borderColor: theme.palette.divider,
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

const DetailsContainer = styled(Box)({
    margin: '1rem',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
});

const OverallAttendanceContainer = styled(Box)({
    textAlign: 'center',
    margin: '1.5rem 0',
});

const AttendancePercentage = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: '700',
    color: theme.palette.primary.main,
    margin: '0.5rem 0 1.5rem',
}));

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
});

const LoadingContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
});

export default TeacherViewStudent;