import React, { useEffect, useState } from 'react';
import { 
  KeyboardArrowDown, 
  KeyboardArrowUp,
  InsertChart as InsertChartIcon,
  InsertChartOutlined as InsertChartOutlinedIcon,
  TableChart as TableChartIcon,
  TableChartOutlined as TableChartOutlinedIcon
} from '@mui/icons-material';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Box, 
  Button, 
  Collapse, 
  Paper, 
  Table, 
  TableBody, 
  TableHead, 
  Typography,
  CircularProgress,
  useTheme,
  styled
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { 
  calculateOverallAttendancePercentage, 
  calculateSubjectAttendancePercentage, 
  groupAttendanceBySubject 
} from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const ViewStdAttendance = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
    
    const [openStates, setOpenStates] = useState({});
    const [selectedSection, setSelectedSection] = useState('table');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
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

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const renderTableSection = () => {
        return (
            <GlassContainer>
                <SectionTitle variant="h4" gutterBottom>
                    Attendance Overview
                </SectionTitle>
                
                <OverallAttendanceBox>
                    <Typography variant="h6">Your Overall Attendance</Typography>
                    <AttendancePercentage>
                        {overallAttendancePercentage.toFixed(1)}%
                    </AttendancePercentage>
                </OverallAttendanceBox>

                <GlassTableContainer>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell align="center">Attended</StyledTableCell>
                                <StyledTableCell align="center">Total</StyledTableCell>
                                <StyledTableCell align="center">Percentage</StyledTableCell>
                                <StyledTableCell align="center">Details</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                            return (
                                <TableBody key={index}>
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
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </DetailsContainer>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            )
                        })}
                    </Table>
                </GlassTableContainer>
            </GlassContainer>
        );
    };

    const renderChartSection = () => {
        return (
            <GlassContainer>
                <SectionTitle variant="h4" gutterBottom>
                    Attendance Visualization
                </SectionTitle>
                <CustomBarChart 
                    chartData={subjectData} 
                    dataKey="attendancePercentage" 
                    barColor={theme.palette.primary.main}
                />
            </GlassContainer>
        );
    };

    const renderNoAttendance = () => {
        return (
            <GlassContainer>
                <Typography variant="h5" align="center" color="textSecondary">
                    Currently You Have No Attendance Records
                </Typography>
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
                    {subjectAttendance && subjectAttendance.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <GlassBottomNavigation 
                                value={selectedSection} 
                                onChange={handleSectionChange}
                                showLabels
                            >
                                <BottomNavigationAction
                                    label="Table View"
                                    value="table"
                                    icon={selectedSection === 'table' ? 
                                        <TableChartIcon fontSize="medium" /> : 
                                        <TableChartOutlinedIcon fontSize="medium" />}
                                    sx={{
                                        color: selectedSection === 'table' ? 
                                            theme.palette.primary.main : 
                                            theme.palette.text.secondary
                                    }}
                                />
                                <BottomNavigationAction
                                    label="Chart View"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? 
                                        <InsertChartIcon fontSize="medium" /> : 
                                        <InsertChartOutlinedIcon fontSize="medium" />}
                                    sx={{
                                        color: selectedSection === 'chart' ? 
                                            theme.palette.primary.main : 
                                            theme.palette.text.secondary
                                    }}
                                />
                            </GlassBottomNavigation>
                        </>
                    ) : renderNoAttendance()}
                </>
            )}
        </MainContainer>
    );
};

// Styled Components
const MainContainer = styled('div')({
    padding: '2rem',
    paddingBottom: '6rem',
    minHeight: '100vh',
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

const GlassTableContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: theme.palette.primary.main,
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: 0,
        width: '50px',
        height: '4px',
        background: theme.palette.primary.light,
        borderRadius: '2px',
    },
}));

const OverallAttendanceBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const AttendancePercentage = styled(Typography)(({ theme }) => ({
    fontSize: '1.8rem',
    fontWeight: '700',
    color: theme.palette.primary.main,
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

const GlassBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.8) !important',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    zIndex: theme.zIndex.appBar,
}));

const LoadingContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
});

export default ViewStdAttendance;