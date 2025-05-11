import React from 'react';
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
import { useSelector } from 'react-redux';
import {
  School as SchoolIcon,
  Class as ClassIcon,
  Book as SubjectIcon,
  Person as PersonIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const TeacherProfile = () => {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

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