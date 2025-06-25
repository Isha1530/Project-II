import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar,
  Container,
  Divider,
  useTheme
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  School as SchoolIcon,
  Class as ClassIcon,
  Book as SubjectIcon,
  Person as PersonIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const TeacherProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setName(currentUser.name);
    setEmail(currentUser.email);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/Teacher/${currentUser._id}`, { name, email });
      setSuccess("Profile updated successfully.");
      setEditMode(false);
      // Optionally, update Redux state here
      window.location.reload(); // quick way to refresh profile
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProfileCard elevation={3}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          textAlign: 'center'
        }}>
          <Avatar 
            sx={{ 
              width: 120, 
              height: 120, 
              fontSize: '3rem',
              mb: 3,
              bgcolor: theme.palette.primary.main
            }}
          >
            {currentUser.name.charAt(0)}
          </Avatar>
          {editMode ? (
            <>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                sx={{ mb: 2, maxWidth: 400 }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2, maxWidth: 400 }}
              />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={loading}>
                  Cancel
                </Button>
              </Box>
              {error && <Typography color="error">{error}</Typography>}
              {success && <Typography color="success.main">{success}</Typography>}
            </>
          ) : (
            <>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
                {currentUser.name}
              </Typography>
              <Divider sx={{ width: '100%', my: 2 }} />
              <ProfileCardContent>
                <DetailItem 
                  icon={<EmailIcon color="primary" />}
                  label="Email"
                  value={currentUser.email}
                />
                <DetailItem 
                  icon={<ClassIcon color="primary" />}
                  label="Class"
                  value={teachSclass.sclassName}
                />
                <DetailItem 
                  icon={<SubjectIcon color="primary" />}
                  label="Subject"
                  value={teachSubject.subName}
                />
                <DetailItem 
                  icon={<SchoolIcon color="primary" />}
                  label="School"
                  value={teachSchool.schoolName}
                />
              </ProfileCardContent>
              <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={handleEdit}>
                Edit
              </Button>
            </>
          )}
        </Box>
      </ProfileCard>
    </Container>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    mb: 2,
    width: '100%',
    maxWidth: 400
  }}>
    <Box sx={{ mr: 2, color: 'primary.main' }}>
      {icon}
    </Box>
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">
        {value}
      </Typography>
    </Box>
  </Box>
);

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const ProfileCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: 0
});

export default TeacherProfile;