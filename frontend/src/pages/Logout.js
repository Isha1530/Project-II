import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <UserName>{currentUser.name}</UserName>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <ButtonGroup>
                <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
            </ButtonGroup>
        </LogoutContainer>
    );
};

export default Logout;

const LogoutContainer = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  border-radius: 12px;
  background-color: #f7f6fc;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const UserName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const LogoutMessage = styled.p`
  font-size: 18px;
  color: #555;
  margin: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const LogoutButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #d9534f;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #6c757d;
`;
