import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, CircularProgress, Fade, Grow, Paper } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID);
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID);
        }
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    });

    const SclassButtonHaver = ({ row }) => {
        return (
            <PurpleButton 
                variant="contained"
                onClick={() => navigateHandler(row.id)}
                sx={{
                    boxShadow: '0 4px 14px rgba(108, 92, 231, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(108, 92, 231, 0.4)',
                        transform: 'translateY(-2px)'
                    }
                }}
            >
                Choose
            </PurpleButton>
        );
    };

    return (
        <StyledContainer>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                    <CircularProgress size={60} thickness={4} sx={{ color: '#6C5CE7' }} />
                </Box>
            ) : (
                <>
                    {getresponse ? (
                        <Fade in timeout={500}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'flex-end', 
                                marginBottom: '24px',
                                animation: 'fadeIn 0.5s ease-in-out'
                            }}>
                                <Button 
                                    variant="contained" 
                                    onClick={() => navigate("/Admin/addclass")}
                                    sx={{
                                        backgroundColor: '#6C5CE7',
                                        '&:hover': {
                                            backgroundColor: '#5649c0'
                                        },
                                        padding: '10px 24px',
                                        fontSize: '1rem',
                                        textTransform: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 14px rgba(108, 92, 231, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Add New Class
                                </Button>
                            </Box>
                        </Fade>
                    ) : (
                        <Grow in timeout={800}>
                            <Paper elevation={3} sx={{ 
                                padding: '24px', 
                                borderRadius: '16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <Typography 
                                    variant="h5" 
                                    gutterBottom 
                                    sx={{ 
                                        fontWeight: 700,
                                        marginBottom: '24px',
                                        color: '#3C1E78',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    Choose a Class
                                    <Box component="span" sx={{ 
                                        marginLeft: '12px',
                                        fontSize: '0.8rem',
                                        color: '#6C5CE7',
                                        backgroundColor: 'rgba(108, 92, 231, 0.1)',
                                        padding: '4px 8px',
                                        borderRadius: '12px'
                                    }}>
                                        {situation === "Teacher" ? "For Teacher Assignment" : "For Subject Addition"}
                                    </Box>
                                </Typography>
                                {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
                                    <TableTemplate 
                                        buttonHaver={SclassButtonHaver} 
                                        columns={sclassColumns} 
                                        rows={sclassRows} 
                                    />
                                ) : (
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        padding: '40px 0',
                                        textAlign: 'center'
                                    }}>
                                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                                            No classes found
                                        </Typography>
                                        <Button 
                                            variant="contained" 
                                            onClick={() => navigate("/Admin/addclass")}
                                            sx={{
                                                backgroundColor: '#6C5CE7',
                                                '&:hover': {
                                                    backgroundColor: '#5649c0'
                                                },
                                                padding: '10px 24px',
                                                fontSize: '1rem',
                                                textTransform: 'none',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 14px rgba(108, 92, 231, 0.3)'
                                            }}
                                        >
                                            Create Your First Class
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        </Grow>
                    )}
                </>
            )}
        </StyledContainer>
    );
};

export default ChooseClass;

const StyledContainer = styled(Box)`
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  min-height: calc(100vh - 48px);
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;