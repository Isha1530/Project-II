import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Box, Typography, Paper, Fade, Button, useTheme,
  AppBar, Toolbar, IconButton, Menu, MenuItem, Divider, TextField, Avatar
} from '@mui/material';
import { keyframes, styled, alpha } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Facebook, Twitter, LinkedIn, Instagram, ArrowUpward } from '@mui/icons-material';
import Students from '../assets/students.svg';
import School from '../assets/123.jpg';
import Team from '../assets/mainpg.png';
import { LightPurpleButton } from '../components/buttonStyles';
import backgImg from '../assets/backg.jpg';

// Animations
const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #6C5CE7 }
`;

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
  100% { transform: translateY(0px) }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px) }
  to { opacity: 1; transform: translateY(0) }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Styled Components
const TypingText = styled('span')({
  display: 'inline-block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  borderRight: '3px solid #6C5CE7',
  animation: `${typing} 3.5s steps(40, end), ${blinkCaret} 0.75s step-end infinite`,
});

const FloatingImage = styled(Box)({
  animation: `${float} 6s ease-in-out infinite`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    animationPlayState: 'paused',
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 15px 30px rgba(108, 92, 231, 0.3)',
  }
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette?.primary?.main || '#6C5CE7'}, ${theme.palette?.secondary?.main || '#A569BD'})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50%',
    height: 3,
    background: `linear-gradient(90deg, ${theme.palette?.primary?.main || '#6C5CE7'}, ${theme.palette?.secondary?.main || '#A569BD'})`,
    borderRadius: 3,
  }
}));

const AnimatedSection = styled(Box)({
  opacity: 0,
  animation: `${fadeIn} 0.8s ease forwards`,
});

const GlassFooter = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${alpha(theme.palette?.primary?.main || '#6C5CE7', 0.9)}, ${alpha(theme.palette?.secondary?.main || '#A569BD', 0.9)})`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    background: `radial-gradient(circle, ${alpha('#fff', 0.1)} 0%, transparent 70%)`,
    borderRadius: '50%',
  }
}));

const FooterButton = styled(Button)(({ theme }) => ({
  color: 'white',
  justifyContent: 'flex-start',
  transition: 'all 0.3s ease',
  padding: theme.spacing(1, 0),
  '&:hover': {
    transform: 'translateX(5px)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  }
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  animation: `${float} 4s ease-in-out infinite`,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: 'scale(1.1)',
  },
  '&:nth-of-type(1)': { animationDelay: '0.1s' },
  '&:nth-of-type(2)': { animationDelay: '0.2s' },
  '&:nth-of-type(3)': { animationDelay: '0.3s' },
  '&:nth-of-type(4)': { animationDelay: '0.4s' },
}));

const ScrollToTopButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: 32,
  right: 32,
  backgroundColor: theme.palette?.primary?.main || '#6C5CE7',
  color: 'white',
  boxShadow: theme.shadows?.[4] || '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  transition: 'all 0.3s ease',
  animation: `${pulse} 2s infinite`,
  '&:hover': {
    backgroundColor: theme.palette?.primary?.dark || '#5C4BD4',
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows?.[6] || '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  }
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape?.borderRadius || 4,
  background: `linear-gradient(145deg, ${alpha(theme.palette?.primary?.light || '#9D8AFF', 0.1)}, ${alpha(theme.palette?.secondary?.light || '#C39BD3', 0.1)})`,
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows?.[6] || '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  }
}));

const Homepage = () => {
  const theme = useTheme();
  const [typingComplete, setTypingComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    handleMenuClose();
  };

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    const typingTimer = setTimeout(() => setTypingComplete(true), 3500);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="sticky" sx={{ 
        background: alpha(theme.palette?.background?.paper || '#fff', 0.9),
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        color: theme.palette?.text?.primary || '#000',
        borderBottom: `1px solid ${theme.palette?.divider || '#e0e0e0'}`
      }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Avatar sx={{ 
                width: 40, 
                height: 40, 
                mr: 2,
                bgcolor: theme.palette?.primary?.main || '#6C5CE7'
              }} />
              <Typography variant="h6" component="div" sx={{ 
                fontWeight: 700,
                background: `linear-gradient(90deg, ${theme.palette?.primary?.main || '#6C5CE7'}, ${theme.palette?.secondary?.main || '#A569BD'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                EduSync
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button 
                color="inherit" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{ fontWeight: 600 }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                onClick={() => scrollTo(aboutRef)}
                sx={{ fontWeight: 600 }}
              >
                About Us
              </Button>
              <Button 
                color="inherit" 
                onClick={() => scrollTo(contactRef)}
                sx={{ fontWeight: 600 }}
              >
                Contact Us
              </Button>
              <Link to="/choose" style={{ textDecoration: 'none' }}>
                <LightPurpleButton variant="contained" sx={{ ml: 2 }}>
                  Get Started
                </LightPurpleButton>
              </Link>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleMenuOpen}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ display: { md: 'none' } }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  boxShadow: theme.shadows?.[3] || '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
                  border: `1px solid ${theme.palette?.divider || '#e0e0e0'}`,
                }
              }}
            >
              <MenuItem onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleMenuClose(); }}>
                Home
              </MenuItem>
              <MenuItem onClick={() => { scrollTo(aboutRef); handleMenuClose(); }}>
                About Us
              </MenuItem>
              <MenuItem onClick={() => { scrollTo(contactRef); handleMenuClose(); }}>
                Contact Us
              </MenuItem>
              <Divider />
              <MenuItem>
                <Link to="/choose" style={{ textDecoration: 'none', width: '100%' }}>
                  <LightPurpleButton variant="contained" fullWidth>
                    Get Started
                  </LightPurpleButton>
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: '100vh',
          minHeight: 600,
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(theme.palette?.primary?.dark || '#5C4BD4', 0.8)}, ${alpha(theme.palette?.secondary?.dark || '#8E44AD', 0.8)})`,
            zIndex: 1,
          }
        }}
      >
        <Box
          component="div"
          sx={{
            position: 'absolute',
            width: '120%',
            height: '120%',
            backgroundImage: `url(${backgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: `${gradientBackground} 15s ease infinite`,
            zIndex: 0,
          }}
        />

        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" sx={{ 
                fontWeight: 'bold', 
                mb: 3,
                lineHeight: 1.2,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                Empowering Education with&nbsp;
                <TypingText>Smart Technology</TypingText>
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: 4,
                opacity: 0.9,
                maxWidth: 600
              }}>
                EduSync makes managing schools easier, smarter, and more efficient with our all-in-one platform.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link to="/choose" style={{ textDecoration: 'none' }}>
                  <LightPurpleButton variant="contained" size="large">
                    Get Started
                  </LightPurpleButton>
                </Link>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large"
                  onClick={() => scrollTo(aboutRef)}
                  sx={{
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <FloatingImage>
                <Box
                  component="img"
                  src={Students}
                  alt="students"
                  sx={{
                    width: '100%',
                    maxHeight: 500,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
                  }}
                />
              </FloatingImage>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Us Section */}
<Box ref={aboutRef} sx={{ 
  py: 10, 
  background: `linear-gradient(to bottom, ${theme.palette?.background?.default || '#f9f9ff'}, ${theme.palette?.background?.paper || '#fff'})`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha(theme.palette?.primary?.light || '#9D8AFF', 0.1)}, transparent 70%)`,
  }
}}>
  <Container maxWidth="xl">
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <SectionTitle variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        About Our Platform
      </SectionTitle>
      <Typography variant="subtitle1" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
        Discover how EduSync is transforming education management with innovative technology
      </Typography>
    </Box>
    
    <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
      {/* ... existing content ... */}
    </Grid>

    {/* Improved Meet Our Team Section */}
    <Box sx={{ 
      textAlign: 'center',
      background: theme.palette?.background?.paper || '#fff',
      borderRadius: theme.shape?.borderRadius || 4,
      p: 6,
      boxShadow: theme.shadows?.[3] || '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
      border: `1px solid ${theme.palette?.divider || '#e0e0e0'}`,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        background: `linear-gradient(90deg, ${theme.palette?.primary?.main || '#6C5CE7'}, ${theme.palette?.secondary?.main || '#A569BD'})`,
      }
    }}>
      <AnimatedSection style={{ animationDelay: '0.6s' }}>
        <SectionTitle variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Meet Our Team
        </SectionTitle>
        
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Avatar sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  bgcolor: theme.palette?.primary?.light || '#9D8AFF',
                  color: theme.palette?.primary?.contrastText || '#fff',
                  fontSize: '2.5rem',
                  fontWeight: 'bold'
                }}>
                  {item}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item === 1
                    ? 'Team Member: Rishi'
                    : item === 2
                    ? 'Team Member: Parth'
                    : item === 3
                    ? 'Team Member: Isha'
                    : 'Team Member: Priya'}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  {item === 1
                    ? 'Backend'
                    : item === 2
                    ? 'Backend'
                    : item === 3
                    ? 'Frontend'
                    : 'Database'}
                </Typography>

              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component="img"
          src={Team}
          alt="team"
          sx={{
            width: '100%',
            maxWidth: 800,
            objectFit: 'contain',
            borderRadius: theme.shape?.borderRadius || 4,
            boxShadow: theme.shadows?.[4] || '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            mb: 4,
          }}
        />
        
        <Typography variant="body1" sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          color: 'text.secondary',
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          Our diverse team of educators, developers, and designers work tirelessly to create 
          the best school management experience. We're passionate about education and technology, 
          and we're here to support your school's journey.
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
            <IconButton
              key={social}
              sx={{
                color: theme.palette?.primary?.main || '#6C5CE7',
                backgroundColor: alpha(theme.palette?.primary?.main || '#6C5CE7', 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette?.primary?.main || '#6C5CE7', 0.2)
                }
              }}
            >
              {social === 'Facebook' && <Facebook />}
              {social === 'Twitter' && <Twitter />}
              {social === 'LinkedIn' && <LinkedIn />}
              {social === 'Instagram' && <Instagram />}
            </IconButton>
          ))}
        </Box>
      </AnimatedSection>
    </Box>
  </Container>
</Box>

      {/* Contact Us Section */}
      <Box ref={contactRef} sx={{ 
        py: 10, 
        background: `linear-gradient(to bottom, ${theme.palette?.background?.paper || '#fff'}, ${alpha(theme.palette?.primary?.light || '#9D8AFF', 0.05)})`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette?.secondary?.light || '#C39BD3', 0.1)}, transparent 70%)`,
        }
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <SectionTitle variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Get In Touch
            </SectionTitle>
            <Typography variant="subtitle1" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              We'd love to hear from you. Reach out for inquiries, support, or partnership opportunities.
            </Typography>
          </Box>
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <AnimatedSection style={{ animationDelay: '0.2s' }}>
                <Paper elevation={0} sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: theme.shape?.borderRadius || 4,
                  background: `linear-gradient(145deg, ${alpha(theme.palette?.background?.paper || '#fff', 0.8)}, ${alpha(theme.palette?.background?.default || '#f9f9ff', 0.8)})`,
                  backdropFilter: 'blur(5px)',
                  border: `1px solid ${theme.palette?.divider || '#e0e0e0'}`,
                  boxShadow: theme.shadows?.[2] || '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <EmailIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                      <Typography>23ce132@charusat.edu.in</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PhoneIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                      <Typography>+77777777777</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <LocationOnIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">Address</Typography>
                      <Typography>123 Education St, Tech City, TC 10001</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Business Hours
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 120 }}>Monday - Friday:</Typography>
                      <Typography>9:00 AM - 6:00 PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 120 }}>Saturday:</Typography>
                      <Typography>10:00 AM - 4:00 PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="body2" sx={{ minWidth: 120 }}>Sunday:</Typography>
                      <Typography>Closed</Typography>
                    </Box>
                  </Box>
                </Paper>
              </AnimatedSection>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <AnimatedSection style={{ animationDelay: '0.4s' }}>
                <Paper elevation={4} sx={{ 
                  p: 4, 
                  borderRadius: theme.shape?.borderRadius || 4,
                  background: theme.palette?.background?.paper || '#fff',
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Send Us a Message
                  </Typography>
                  <form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          variant="outlined"
                          InputProps={{
                            sx: {
                              borderRadius: theme.shape?.borderRadius || 4,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          variant="outlined"
                          InputProps={{
                            sx: {
                              borderRadius: theme.shape?.borderRadius || 4,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          variant="outlined"
                          InputProps={{
                            sx: {
                              borderRadius: theme.shape?.borderRadius || 4,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          variant="outlined"
                          multiline
                          rows={4}
                          InputProps={{
                            sx: {
                              borderRadius: theme.shape?.borderRadius || 4,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                          sx={{ 
                            py: 1.5,
                            borderRadius: theme.shape?.borderRadius || 4,
                            fontWeight: 600,
                            fontSize: '1rem'
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </AnimatedSection>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Footer */}
      <GlassFooter sx={{ py: 8, color: 'white', position: 'relative' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Brand Column */}
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2,
                position: 'relative',
                zIndex: 1
              }}>
                <Avatar sx={{ 
                  width: 48, 
                  height: 48, 
                  mr: 2,
                  bgcolor: 'white',
                  color: theme.palette?.primary?.main || '#6C5CE7',
                  fontWeight: 'bold'
                }} />
                <Typography variant="h5" fontWeight="bold">
                  EduSync
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ 
                opacity: 0.8, 
                mb: 2,
                position: 'relative',
                zIndex: 1
              }}>
                The complete school management solution for modern educational institutions.
              </Typography>
              <Typography variant="body2" sx={{ 
                opacity: 0.6,
                position: 'relative',
                zIndex: 1
              }}>
                Transforming education through innovative technology.
              </Typography>
            </Grid>

            {/* Quick Links Column */}
            <Grid item xs={12} md={4} sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FooterButton 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  sx={{ color: 'white' }}
                >
                  Home
                </FooterButton>
                <FooterButton onClick={() => scrollTo(aboutRef)}>
                  About Us
                </FooterButton>
                <FooterButton onClick={() => scrollTo(contactRef)}>
                  Contact Us
                </FooterButton>
                <Link to="/choose" style={{ textDecoration: 'none' }}>
                  <FooterButton>
                    Get Started
                  </FooterButton>
                </Link>
              </Box>
            </Grid>

            {/* Social Links Column */}
            <Grid item xs={12} md={4} sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <SocialIcon aria-label="Facebook">
                  <Facebook fontSize="medium" />
                </SocialIcon>
                <SocialIcon aria-label="Twitter">
                  <Twitter fontSize="medium" />
                </SocialIcon>
                <SocialIcon aria-label="LinkedIn">
                  <LinkedIn fontSize="medium" />
                </SocialIcon>
                <SocialIcon aria-label="Instagram">
                  <Instagram fontSize="medium" />
                </SocialIcon>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                Subscribe to our newsletter for updates
              </Typography>
              <Box component="form" sx={{ display: 'flex' }}>
                <TextField
                  variant="outlined"
                  placeholder="Your email"
                  size="small"
                  fullWidth
                  InputProps={{
                    sx: {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: '4px 0 0 4px',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.15)'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.2)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.3)'
                      }
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette?.primary?.main || '#6C5CE7',
                    borderRadius: '0 4px 4px 0',
                    minWidth: 100,
                    '&:hover': {
                      bgcolor: '#f5f5f5'
                    }
                  }}
                >
                  Join
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ 
            my: 4, 
            bgcolor: 'rgba(255,255,255,0.2)',
            height: '1px',
            position: 'relative',
            zIndex: 1
          }} />

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            position: 'relative',
            zIndex: 1
          }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} EduSync. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Cookie Policy
              </Typography>
            </Box>
          </Box>
        </Container>
      </GlassFooter>

      <ScrollToTopButton 
        aria-label="scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpward />
      </ScrollToTopButton>
    </>
  );
};

export default Homepage;