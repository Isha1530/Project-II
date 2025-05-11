import React from 'react';
import { styled } from '@mui/material/styles'; // Changed import
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box, 
  Avatar, 
  Container, 
  Paper,
  Divider,
  Chip
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
  School as SchoolIcon,
  Badge as RollNumIcon,
  Class as ClassIcon,
  Cake as DobIcon,
  Male as GenderIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  ContactEmergency as EmergencyIcon
} from '@mui/icons-material';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  // Sample data - replace with actual data from your backend
  const studentData = {
    dob: 'January 1, 2000',
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main Street, City, Country',
    emergencyContact: '(987) 654-3210'
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Profile Header Section */}
      <ProfileCard elevation={3}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
          <Avatar 
            alt="Student Avatar" 
            sx={{ 
              width: 120, 
              height: 120, 
              fontSize: '3rem',
              mb: 3,
              bgcolor: 'primary.main'
            }}
          >
            {String(currentUser.name).charAt(0)}
          </Avatar>
          
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
            {currentUser.name}
          </Typography>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <InfoChip icon={<RollNumIcon />} label={`Roll No: ${currentUser.rollNum}`} />
            </Grid>
            <Grid item>
              <InfoChip icon={<ClassIcon />} label={`Class: ${sclassName.sclassName}`} />
            </Grid>
            <Grid item>
              <InfoChip icon={<SchoolIcon />} label={`School: ${studentSchool.schoolName}`} />
            </Grid>
          </Grid>
        </Box>
      </ProfileCard>

      {/* Personal Information Section */}
      <InfoCard sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <DetailItem 
              icon={<DobIcon color="primary" />}
              label="Date of Birth"
              value={studentData.dob}
            />
            <DetailItem 
              icon={<GenderIcon color="primary" />}
              label="Gender"
              value={studentData.gender}
            />
            <DetailItem 
              icon={<EmailIcon color="primary" />}
              label="Email"
              value={studentData.email}
            />
            <DetailItem 
              icon={<PhoneIcon color="primary" />}
              label="Phone"
              value={studentData.phone}
            />
            <DetailItem 
              icon={<HomeIcon color="primary" />}
              label="Address"
              value={studentData.address}
              fullWidth
            />
            <DetailItem 
              icon={<EmergencyIcon color="primary" />}
              label="Emergency Contact"
              value={studentData.emergencyContact}
              fullWidth
            />
          </Grid>
        </CardContent>
      </InfoCard>
    </Container>
  );
};

const DetailItem = ({ icon, label, value, fullWidth = false }) => (
  <Grid item xs={12} sm={fullWidth ? 12 : 6}>
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <Box sx={{ mr: 2, color: 'primary.main' }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">
          {value}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

// Fixed styled components using MUI's styled utility
const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden'
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.action.selected,
  '& .MuiChip-icon': {
    color: theme.palette.primary.main
  }
}));

export default StudentProfile;