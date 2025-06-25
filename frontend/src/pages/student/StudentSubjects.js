import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableHead, 
  Typography,
  Box,
  CircularProgress,
  useTheme
} from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import { styled } from '@mui/material/styles';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks === []) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <GlassContainer>
                <SectionTitle variant="h4" gutterBottom>
                    Subject Marks
                </SectionTitle>
                <GlassTableContainer>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell align="right">Marks Obtained</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <MarksBadge>
                                                {result.marksObtained}
                                            </MarksBadge>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </GlassTableContainer>
            </GlassContainer>
        );
    };

    const renderChartSection = () => {
        return (
            <GlassContainer>
                <SectionTitle variant="h4" gutterBottom>
                    Performance Overview
                </SectionTitle>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </GlassContainer>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <GlassContainer>
                <SectionTitle variant="h4" gutterBottom>
                    Class Details
                </SectionTitle>
                <ClassInfoBox>
                    <Typography variant="h6" color="text.secondary">
                        You are currently enrolled in
                    </Typography>
                    <ClassTitle variant="h4" color="primary">
                        Class {sclassDetails && sclassDetails.sclassName}
                    </ClassTitle>
                </ClassInfoBox>

                <SectionSubtitle variant="h5" gutterBottom>
                    Subjects
                </SectionSubtitle>
                
                <SubjectsGrid>
                    {subjectsList &&
                        subjectsList.map((subject, index) => (
                            <SubjectCard key={index}>
                                <SubjectName>{subject.subName}</SubjectName>
                                <SubjectCode>{subject.subCode}</SubjectCode>
                            </SubjectCard>
                        ))}
                </SubjectsGrid>
            </GlassContainer>
        );
    };

    return (
        <MainContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={60} thickness={4} />
                </LoadingContainer>
            ) : (
                <>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ? (
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
                                            minWidth: 'auto',
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
                                            minWidth: 'auto',
                                            color: selectedSection === 'chart' ? 
                                                theme.palette.primary.main : 
                                                theme.palette.text.secondary
                                        }}
                                    />
                                </GlassBottomNavigation>
                            </>
                        )
                        : renderClassDetailsSection()
                    }
                </>
            )}
        </MainContainer>
    );
};

// Styled Components
const MainContainer = styled(Container)({
    paddingTop: '2rem',
    paddingBottom: '6rem',
    minHeight: '100vh',
});

const GlassContainer = styled(Box)(({ theme }) => ({
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

const SectionSubtitle = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    margin: '1.5rem 0',
    color: theme.palette.text.secondary,
}));

const ClassInfoBox = styled(Box)({
    textAlign: 'center',
    marginBottom: '2rem',
    padding: '1rem',
});

const ClassTitle = styled(Typography)({
    fontWeight: '700',
    marginTop: '0.5rem',
});

const SubjectsGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
});

const SubjectCard = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
}));

const SubjectName = styled(Typography)({
    fontWeight: '600',
    fontSize: '1.1rem',
});

const SubjectCode = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
}));

const MarksBadge = styled(Box)(({ theme }) => ({
    display: 'inline-block',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: '12px',
    padding: '4px 12px',
    fontWeight: '600',
}));

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

export default StudentSubjects;