import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Button, 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Checkbox, 
  FormControlLabel, 
  TextField, 
  CssBaseline, 
  IconButton, 
  InputAdornment, 
  CircularProgress, 
  Backdrop,
  Fade,
  Grow,
  Slide,
  Zoom
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, ArrowForward } from '@mui/icons-material';
import bgpic from "../assets/designlogin.png";
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#6c5ce7',
    },
    secondary: {
      main: '#a29bfe',
    },
    background: {
      default: '#f9f9f9',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6c5ce7;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
    color: #5649c0;
    transform: translateY(-1px);
  }
`;

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc";

        if (role === "Admin") {
            const email = "yogendra@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        } else if (role === "Student") {
            const rollNum = "1";
            const studentName = "Dipesh Awasthi";
            const fields = { rollNum, studentName, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        } else if (role === "Teacher") {
            const email = "tony@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            } else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ 
                height: '100vh',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(108,92,231,.5)',
                    borderRadius: '20px',
                }
            }}>
                <CssBaseline />
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={5} 
                    component={Paper} 
                    elevation={scrolled ? 12 : 6} 
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Slide direction="down" in timeout={800}>
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Typography variant="h4" sx={{ 
                                    mb: 1, 
                                    color: "#2c2143", 
                                    fontWeight: 700,
                                    background: 'linear-gradient(90deg, #6c5ce7, #2c2143)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'inline-block'
                                }}>
                                    {role} Portal
                                </Typography>
                                <Zoom in timeout={1000}>
                                    <Typography variant="subtitle1" sx={{ 
                                        color: 'text.secondary',
                                        mt: 1
                                    }}>
                                        Welcome back! Please sign in to continue
                                    </Typography>
                                </Zoom>
                            </Box>
                        </Slide>

                        <Grow in timeout={1200}>
                            <Box 
                                component="form" 
                                noValidate 
                                onSubmit={handleSubmit} 
                                sx={{ 
                                    mt: 2,
                                    width: '100%',
                                    maxWidth: '400px',
                                    '& .MuiTextField-root': {
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        }
                                    }
                                }}
                            >
                                {role === "Student" ? (
                                    <>
                                        <Fade in timeout={1400}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="rollNumber"
                                                label="Roll Number"
                                                name="rollNumber"
                                                autoComplete="off"
                                                type="number"
                                                autoFocus
                                                error={rollNumberError}
                                                helperText={rollNumberError && 'Roll Number is required'}
                                                onChange={handleInputChange}
                                                sx={{ mb: 2 }}
                                                variant="outlined"
                                            />
                                        </Fade>
                                        <Fade in timeout={1600}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="studentName"
                                                label="Full Name"
                                                name="studentName"
                                                autoComplete="name"
                                                error={studentNameError}
                                                helperText={studentNameError && 'Name is required'}
                                                onChange={handleInputChange}
                                                sx={{ mb: 2 }}
                                                variant="outlined"
                                            />
                                        </Fade>
                                    </>
                                ) : (
                                    <Fade in timeout={1400}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            error={emailError}
                                            helperText={emailError && 'Email is required'}
                                            onChange={handleInputChange}
                                            sx={{ mb: 2 }}
                                            variant="outlined"
                                        />
                                    </Fade>
                                )}
                                <Fade in timeout={role === "Student" ? 1800 : 1600}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={toggle ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        error={passwordError}
                                        helperText={passwordError && 'Password is required'}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2 }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton 
                                                        onClick={() => setToggle(!toggle)}
                                                        edge="end"
                                                        sx={{
                                                            transition: 'transform 0.3s ease',
                                                            '&:hover': {
                                                                transform: 'scale(1.1)',
                                                                color: '#6c5ce7'
                                                            }
                                                        }}
                                                    >
                                                        {toggle ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Fade>
                                <Fade in timeout={2000}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                    value="remember" 
                                                    color="primary" 
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            transition: 'all 0.2s ease',
                                                        },
                                                        '&:hover .MuiSvgIcon-root': {
                                                            transform: 'scale(1.2)',
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Remember me"
                                            sx={{ color: 'text.secondary' }}
                                        />
                                        <StyledLink href="#">
                                            Forgot password?
                                        </StyledLink>
                                    </Box>
                                </Fade>
                                <Fade in timeout={2200}>
                                    <LightPurpleButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ 
                                            mt: 2,
                                            mb: 3,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            boxShadow: '0 4px 14px rgba(108, 92, 231, 0.3)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                boxShadow: '0 6px 20px rgba(108, 92, 231, 0.4)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                        endIcon={!loader && <ArrowForward sx={{
                                            transition: 'transform 0.3s ease',
                                            '.MuiButton-root:hover &': {
                                                transform: 'translateX(2px)'
                                            }
                                        }} />}
                                        disabled={loader}
                                    >
                                        {loader ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            "Sign In"
                                        )}
                                    </LightPurpleButton>
                                </Fade>
                            </Box>
                        </Grow>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        transition: 'all 0.5s ease',
                        transform: scrolled ? 'scale(1.02)' : 'scale(1)',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 40,
                            left: 40,
                            color: 'white',
                            maxWidth: '500px',
                            transition: 'all 0.5s ease',
                            transform: scrolled ? 'translateY(-20px)' : 'translateY(0)',
                        }}
                    >
                        <Typography variant="h4" sx={{ 
                            fontWeight: 700, 
                            mb: 2,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            EduPortal Learning Management System
                        </Typography>
                        <Typography variant="body1" sx={{
                            textShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>
                            Access your courses, track progress, and connect with your educational community
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ 
                    color: '#fff', 
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(4px)',
                    transition: 'opacity 0.3s ease'
                }}
                open={guestLoader || loader}
            >
                <Box textAlign="center">
                    <CircularProgress 
                        color="inherit" 
                        size={60} 
                        thickness={4} 
                        sx={{
                            animationDuration: '1.5s',
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            }
                        }}
                    />
                    <Typography variant="h6" sx={{ mt: 3, fontWeight: 500 }}>
                        Authenticating your credentials...
                    </Typography>
                </Box>
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage;