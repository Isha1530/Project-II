import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Fade, Avatar, Divider } from '@mui/material';
import styled from 'styled-components';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const initials = currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <Fade in timeout={800}>
            <ProfileWrapper>
                <Banner />
                <StyledCard elevation={3}>
                    <AvatarBox>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: '#4B0082', fontSize: '2rem' }}>
                            {initials}
                        </Avatar>
                        <Typography variant="h6" sx={{ mt: 1, fontWeight: 500 }}>
                            {currentUser.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            School Admin
                        </Typography>
                    </AvatarBox>
                    <Divider sx={{ my: 2 }} />
                    <DetailText><strong>Email:</strong> {currentUser.email}</DetailText>
                    <DetailText><strong>School:</strong> {currentUser.schoolName}</DetailText>
                    <DetailText><strong>Account Created:</strong> Jan 5, 2023</DetailText>
                </StyledCard>
            </ProfileWrapper>
        </Fade>
    );
};

export default AdminProfile;

const ProfileWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f3f4f6;
  min-height: 100vh;
`;

const Banner = styled.div`
  width: 100%;
  height: 120px;
  background: linear-gradient(90deg, #4B0082 0%, #6D28D9 100%);
  border-radius: 0 0 30px 30px;
  margin-bottom: -60px;
`;

const StyledCard = styled(Paper)`
  padding: 30px;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  z-index: 1;
`;

const AvatarBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailText = styled(Typography)`
  font-size: 1rem;
  margin: 8px 0;
  color: #333;
  text-align: left;
`;

