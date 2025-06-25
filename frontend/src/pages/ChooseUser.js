import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  Typography,
  CircularProgress,
  Backdrop,
  Fade,
  useTheme,
  ButtonBase
} from '@mui/material';
import { AdminPanelSettings, School, Groups, Palette } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState('linear-gradient(135deg, #0f2027, #203a43, #2c5364)');
  const [themeColor, setThemeColor] = useState('#3a7bd5');

  const navigateHandler = (user) => {
    const loginFields = {
      Admin: { email: "yogendra@12", password },
      Student: { rollNum: "1", studentName: "Dipesh Awasthi", password },
      Teacher: { email: "tony@12", password }
    };

    if (visitor === "guest") {
      setLoader(true);
      dispatch(loginUser(loginFields[user], user));
    } else {
      navigate(`/${user}login`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setBgColor(scrolled
        ? 'linear-gradient(135deg, #1a2980, #26d0ce)'
        : 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
      );
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  const roles = [
    {
      label: "Admin",
      description: "Access the dashboard to manage app data and settings with administrative privileges.",
      icon: <AdminPanelSettings sx={{ fontSize: 60 }} />,
      color: '#ff7e5f'
    },
    {
      label: "Student",
      description: "Explore course materials, submit assignments, and track your academic progress.",
      icon: <School sx={{ fontSize: 60 }} />,
      color: '#4e54c8'
    },
    {
      label: "Teacher",
      description: "Create courses, manage classes, grade assignments, and monitor student performance.",
      icon: <Groups sx={{ fontSize: 60 }} />,
      color: '#38ef7d'
    },
  ];

  const handleThemeChange = () => {
    const colors = ['#3a7bd5', '#00d2ff', '#a8ff78', '#fd746c', '#904e95'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setThemeColor(randomColor);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: bgColor,
        transition: 'background 0.6s ease, color 0.6s ease',
        py: 6,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: themeColor,
          zIndex: 1,
          transition: 'background 0.6s ease'
        }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#fff', 
              fontWeight: 700,
              mb: 2,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            Welcome to EduSync
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Select your role to continue
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {roles.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={role.label}>
              <Fade in timeout={1000 + index * 300}>
                <ButtonBase 
                  component="div" 
                  sx={{ 
                    width: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                  onClick={() => navigateHandler(role.label)}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      color: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      width: '100%',
                      border: `1px solid rgba(255,255,255,0.2)`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        boxShadow: `0 10px 20px -5px ${role.color}44`
                      },
                    }}
                  >
                    <Box 
                      mb={3} 
                      sx={{
                        color: role.color,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {role.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {role.label}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {role.description}
                    </Typography>
                  </Paper>
                </ButtonBase>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* <Box sx={{ textAlign: 'center', mt: 6 }}>
          <ButtonBase
            onClick={handleThemeChange}
            sx={{
              p: 1.5,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <Palette fontSize="medium" />
          </ButtonBase>
        </Box> */}
      </Container>

      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0,0,0,0.7)'
        }}
        open={loader}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 500 }}>
            Loading your dashboard...
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            Please wait while we prepare your experience
          </Typography>
        </Box>
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default ChooseUser;