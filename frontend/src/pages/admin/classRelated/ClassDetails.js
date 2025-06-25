import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Fade,
    Typography,
    Paper,
    Grow,
    Zoom
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import { LightPurpleButton } from "../../../components/buttonStyles";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, tempDetails } = useSelector(state => state.user);
    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [hovered, setHovered] = useState(false);

    const fields = { sclassName, adminID };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes");
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <>
            <StyledContainer>
                <Grow in timeout={800}>
                    <GlassBox elevation={8}>
                        <Stack alignItems="center" mb={4}>
                            <Zoom in timeout={1000}>
                                <ImageContainer 
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <ClassroomImage 
                                        src={Classroom} 
                                        alt="classroom" 
                                        hovered={hovered}
                                    />
                                </ImageContainer>
                            </Zoom>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    mt: 3, 
                                    fontWeight: 700,
                                    background: 'linear-gradient(90deg, #3C1E78, #6C5CE7)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textAlign: 'center'
                                }}
                            >
                                Create New Class
                            </Typography>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    color: 'text.secondary',
                                    textAlign: 'center',
                                    maxWidth: '80%'
                                }}
                            >
                                Enter class details to create a new learning environment
                            </Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <Fade in timeout={1200}>
                                    <TextField
                                        label="Class Name"
                                        variant="outlined"
                                        value={sclassName}
                                        onChange={(e) => setSclassName(e.target.value)}
                                        required
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#fff',
                                            borderRadius: 2,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#6C5CE7',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#6C5CE7',
                                                    boxShadow: '0 0 0 2px rgba(108, 92, 231, 0.2)'
                                                },
                                            },
                                            input: { 
                                                padding: '14px',
                                                fontSize: '1rem'
                                            }
                                        }}
                                    />
                                </Fade>
                                <Fade in timeout={1400}>
                                    <LightPurpleButton
                                        fullWidth
                                        size="large"
                                        sx={{ 
                                            mt: 2,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            boxShadow: '0 4px 14px rgba(108, 92, 231, 0.3)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 6px 20px rgba(108, 92, 231, 0.4)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                        variant="contained"
                                        type="submit"
                                        disabled={loader}
                                    >
                                        {loader ? <CircularProgress size={24} color="inherit" /> : "Create Class"}
                                    </LightPurpleButton>
                                </Fade>
                                <Fade in timeout={1600}>
                                    <Button 
                                        variant="outlined" 
                                        onClick={() => navigate(-1)} 
                                        sx={{ 
                                            mt: 1,
                                            py: 1.5,
                                            color: '#6C5CE7',
                                            borderColor: '#6C5CE7',
                                            '&:hover': {
                                                backgroundColor: 'rgba(108, 92, 231, 0.04)',
                                                borderColor: '#6C5CE7',
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Go Back
                                    </Button>
                                </Fade>
                            </Stack>
                        </form>
                    </GlassBox>
                </Grow>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddClass;

const StyledContainer = styled(Box)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 2rem;
`;

const GlassBox = styled(Paper)`
  max-width: 500px;
  width: 100%;
  padding: 40px;
  border-radius: 24px;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
`;

const ClassroomImage = styled.img`
  width: 80%;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.hovered ? 'scale(1.02)' : 'scale(1)'};
  filter: ${props => props.hovered ? 'brightness(1.05)' : 'brightness(1)'};
`;