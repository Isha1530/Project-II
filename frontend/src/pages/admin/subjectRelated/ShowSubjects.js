import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box, IconButton, Paper, Typography, CircularProgress, Tooltip, Divider
} from '@mui/material';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const ShowSubjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getSubjectList(currentUser._id, "AllSubjects"));
  }, [currentUser._id, dispatch]);

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
      });
  };

  const subjectColumns = [
    { id: 'subName', label: 'Subject Name', minWidth: 170 },
    { id: 'sessions', label: 'Sessions', minWidth: 170 },
    { id: 'sclassName', label: 'Class Name', minWidth: 170 },
  ];

  const subjectRows = subjectsList.map((subject) => ({
    subName: subject.subName,
    sessions: subject.sessions,
    sclassName: subject.sclassName.sclassName,
    sclassID: subject.sclassName._id,
    id: subject._id,
  }));

  const SubjectsButtonHaver = ({ row }) => (
    <ButtonGroup>
      <Tooltip title="Delete Subject">
        <IconButton onClick={() => deleteHandler(row.id, "Subject")} color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="View Subject Details">
        <StyledViewButton
          variant="contained"
          onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
        >
          View
        </StyledViewButton>
      </Tooltip>
    </ButtonGroup>
  );

  const actions = [
    {
      icon: <PostAddIcon color="primary" />,
      name: 'Add New Subject',
      action: () => navigate("/Admin/subjects/chooseclass")
    },
    {
      icon: <DeleteIcon color="error" />,
      name: 'Delete All Subjects',
      action: () => deleteHandler(currentUser._id, "Subjects")
    }
  ];

  return (
    <>
      <Container>
        <HeaderSection>
          <Typography variant="h5" fontWeight={600}>Manage Subjects</Typography>
          <Typography variant="body2" color="text.secondary">Browse or manage subjects associated with your classes.</Typography>
        </HeaderSection>

        {loading ? (
          <LoadingBox>
            <CircularProgress />
            <Typography mt={2} variant="body2">Loading subjects...</Typography>
          </LoadingBox>
        ) : (
          <>
            {response ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")}>
                  Add Subjects
                </GreenButton>
              </Box>
            ) : (
              <StyledPaper>
                <Divider sx={{ mb: 3 }} />
                {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                  <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                ) : (
                  <EmptyState>
                    <Typography variant="h6" gutterBottom>No subjects found</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start by adding subjects to your classes.
                    </Typography>
                  </EmptyState>
                )}
                <SpeedDialTemplate actions={actions} />
              </StyledPaper>
            )}
          </>
        )}
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </Container>
    </>
  );
};

export default ShowSubjects;

const Container = styled(Box)`
  background: linear-gradient(to right, #f4f7ff, #eef3fd);
  min-height: 100vh;
  padding: 2rem;
`;

const HeaderSection = styled(Box)`
  margin-bottom: 2rem;
  text-align: left;
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.08);
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledViewButton = styled(BlueButton)`
  font-weight: 600;
  text-transform: capitalize;
  border-radius: 10px;
`;

const LoadingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
`;
