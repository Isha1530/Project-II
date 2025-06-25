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
  Chip,
  TextField,
  Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
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
import { updateUser } from '../../redux/userRelated/userHandle';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
    dob: currentUser.dob || '',
    gender: currentUser.gender || '',
    address: currentUser.address || '',
    emergencyContact: currentUser.emergencyContact || '',
  });
  const [saving, setSaving] = React.useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await dispatch(updateUser(form, currentUser._id, 'Student'));
    setSaving(false);
    setEditMode(false);
  };

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
            {editMode ? (
              <TextField
                name="name"
                value={form.name}
                onChange={handleChange}
                size="small"
                variant="standard"
                sx={{ fontSize: '2rem' }}
              />
            ) : (
              form.name
            )}
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
          {!editMode && (
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleEdit}>Edit</Button>
          )}
        </Box>
      </ProfileCard>

      {/* Personal Information Section */}
      <InfoCard sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {editMode ? (
            <form onSubmit={handleSave}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    value={form.dob}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="gender"
                    label="Gender"
                    value={form.gender}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="address"
                    label="Address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="emergencyContact"
                    label="Emergency Contact"
                    value={form.emergencyContact}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
              </Box>
            </form>
          ) : (
            <Grid container spacing={3}>
              <DetailItem 
                icon={<DobIcon color="primary" />}
                label="Date of Birth"
                value={currentUser.dob || 'N/A'}
              />
              <DetailItem 
                icon={<GenderIcon color="primary" />}
                label="Gender"
                value={currentUser.gender || 'N/A'}
              />
              <DetailItem 
                icon={<EmailIcon color="primary" />}
                label="Email"
                value={form.email}
              />
              <DetailItem 
                icon={<PhoneIcon color="primary" />}
                label="Phone"
                value={form.phone}
              />
              <DetailItem 
                icon={<HomeIcon color="primary" />}
                label="Address"
                value={currentUser.address || 'N/A'}
                fullWidth
              />
              <DetailItem 
                icon={<EmergencyIcon color="primary" />}
                label="Emergency Contact"
                value={currentUser.emergencyContact || 'N/A'}
                fullWidth
              />
            </Grid>
          )}
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