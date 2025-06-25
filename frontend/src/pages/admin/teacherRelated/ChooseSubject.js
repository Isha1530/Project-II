import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Box, 
    Table, 
    TableBody, 
    TableContainer, 
    TableHead, 
    Typography, 
    Paper,
    CircularProgress,
    Fade,
    Grow,
    Button,
    styled
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id;
            dispatch(getTeacherFreeClassSubjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation]);

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject));
        navigate("/Admin/teachers");
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '300px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '16px'
            }}>
                <CircularProgress 
                    size={60} 
                    thickness={4} 
                    sx={{ color: '#4caf50' }} 
                />
            </Box>
        );
    } else if (response) {
        return (
            <Fade in timeout={500}>
                <Box sx={{ 
                    textAlign: 'center', 
                    p: 4, 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#3C1E78', fontWeight: 600 }}>
                        All Subjects Have Teachers Assigned
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                        Would you like to add more subjects to this class?
                    </Typography>
                    <PurpleButton 
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                        sx={{
                            padding: '10px 24px',
                            fontSize: '1rem',
                            boxShadow: '0 4px 14px rgba(108, 92, 231, 0.3)',
                            '&:hover': {
                                boxShadow: '0 6px 20px rgba(108, 92, 231, 0.4)'
                            }
                        }}
                    >
                        Add New Subjects
                    </PurpleButton>
                </Box>
            </Fade>
        );
    } else if (error) {
        console.log(error);
        return (
            <Box sx={{ 
                textAlign: 'center', 
                p: 4, 
                backgroundColor: 'rgba(255, 235, 238, 0.8)',
                borderRadius: '16px'
            }}>
                <Typography variant="h6" color="error">
                    An error occurred while loading subjects
                </Typography>
            </Box>
        );
    }

    return (
        <Grow in timeout={800}>
            <Paper sx={{ 
                width: '100%', 
                overflow: 'hidden',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                p: 3
            }}>
                <Typography variant="h5" sx={{ 
                    mb: 3, 
                    fontWeight: 700,
                    color: '#3C1E78',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    Available Subjects
                    <Box component="span" sx={{ 
                        ml: 1.5,
                        fontSize: '0.8rem',
                        color: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '12px'
                    }}>
                        {situation === "Teacher" ? "For Teacher Assignment" : "For Teacher Selection"}
                    </Box>
                </Typography>
                
                <TableContainer sx={{ borderRadius: '12px' }}>
                    <Table aria-label="subjects table" stickyHeader>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell sx={{ 
                                    fontWeight: 700,
                                    backgroundColor: '#f5f5f5'
                                }}>#</StyledTableCell>
                                <StyledTableCell align="center" sx={{ 
                                    fontWeight: 700,
                                    backgroundColor: '#f5f5f5'
                                }}>Subject Name</StyledTableCell>
                                <StyledTableCell align="center" sx={{ 
                                    fontWeight: 700,
                                    backgroundColor: '#f5f5f5'
                                }}>Subject Code</StyledTableCell>
                                <StyledTableCell align="center" sx={{ 
                                    fontWeight: 700,
                                    backgroundColor: '#f5f5f5'
                                }}>Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                                subjectsList.map((subject, index) => (
                                    <Fade in timeout={(index + 1) * 200} key={subject._id}>
                                        <StyledTableRow hover sx={{ 
                                            '&:hover': {
                                                backgroundColor: 'rgba(76, 175, 80, 0.05)'
                                            }
                                        }}>
                                            <StyledTableCell component="th" scope="row">
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" sx={{ fontWeight: 500 }}>
                                                {subject.subName}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {subject.subCode}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {situation === "Norm" ? (
                                                    <GreenButton 
                                                        variant="contained"
                                                        onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                                        sx={{
                                                            boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
                                                            '&:hover': {
                                                                boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                                                                transform: 'translateY(-2px)'
                                                            },
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        Choose
                                                    </GreenButton>
                                                ) : (
                                                    <GreenButton 
                                                        variant="contained" 
                                                        disabled={loader}
                                                        onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                                        sx={{
                                                            boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
                                                            '&:hover': {
                                                                boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                                                                transform: !loader ? 'translateY(-2px)' : 'none'
                                                            },
                                                            transition: 'all 0.3s ease',
                                                            minWidth: '120px'
                                                        }}
                                                    >
                                                        {loader ? (
                                                            <CircularProgress size={24} sx={{ color: 'white' }} />
                                                        ) : (
                                                            'Assign Subject'
                                                        )}
                                                    </GreenButton>
                                                )}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </Fade>
                                ))
                            ) : (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                                            No available subjects found
                                        </Typography>
                                        <PurpleButton 
                                            variant="contained"
                                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                                        >
                                            Add Subjects
                                        </PurpleButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grow>
    );
};

export default ChooseSubject;