import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Avatar, 
    CircularProgress,
    Divider,
    Chip,
    useTheme
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/MenuBook';
import EventIcon from '@mui/icons-material/Event';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);
    const theme = useTheme();

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress size={60} thickness={4} />
                </Box>
            ) : (
                <Paper elevation={3} sx={{ 
                    p: 4, 
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper
                }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                        <Avatar 
                            sx={{ 
                                width: 120, 
                                height: 120, 
                                mb: 3,
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.common.white,
                                fontSize: '3rem'
                            }}
                        >
                            {teacherDetails?.name?.charAt(0) || <PersonIcon fontSize="large" />}
                        </Avatar>
                        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                            {teacherDetails?.name}
                        </Typography>
                        <Chip 
                            label="Teacher" 
                            color="primary" 
                            size="medium"
                            sx={{ mb: 2, px: 2, py: 1, fontSize: '0.9rem' }}
                        />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ 
                            mb: 2, 
                            display: 'flex', 
                            alignItems: 'center',
                            color: theme.palette.text.secondary
                        }}>
                            <ClassIcon color="primary" sx={{ mr: 1 }} />
                            Class Information
                        </Typography>
                        <Box sx={{ 
                            pl: 3,
                            borderLeft: `2px solid ${theme.palette.divider}`
                        }}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Class:</strong> {teacherDetails?.teachSclass?.sclassName || 'Not assigned'}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ 
                            mb: 2, 
                            display: 'flex', 
                            alignItems: 'center',
                            color: theme.palette.text.secondary
                        }}>
                            <SubjectIcon color="primary" sx={{ mr: 1 }} />
                            Subject Information
                        </Typography>
                        {isSubjectNamePresent ? (
                            <Box sx={{ 
                                pl: 3,
                                borderLeft: `2px solid ${theme.palette.divider}`
                            }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Subject:</strong> {teacherDetails?.teachSubject?.subName}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Sessions:</strong> {teacherDetails?.teachSubject?.sessions}
                                </Typography>
                            </Box>
                        ) : (
                            <Box textAlign="center" mt={2}>
                                <Button 
                                    variant="contained" 
                                    onClick={handleAddSubject}
                                    startIcon={<SubjectIcon />}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        boxShadow: theme.shadows[2],
                                        '&:hover': {
                                            boxShadow: theme.shadows[4]
                                        }
                                    }}
                                >
                                    Assign Subject
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box display="flex" justifyContent="flex-end" mt={4}>
                        <Button 
                            variant="outlined" 
                            onClick={() => navigate(-1)}
                            sx={{
                                mr: 2,
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                textTransform: 'none'
                            }}
                        >
                            Back to Teachers
                        </Button>
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default TeacherDetails;