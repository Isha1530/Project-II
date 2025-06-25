import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
  Box, InputLabel, MenuItem, Select,
  Typography, Stack, TextField, CircularProgress,
  FormControl, Paper, Grow
} from '@mui/material';

const StudentExamMarks = ({ situation }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { currentUser, userDetails, loading } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);
  const { response, error, statestatus } = useSelector((state) => state.student);

  const [studentID, setStudentID] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [chosenSubName, setChosenSubName] = useState('');
  const [marksObtained, setMarksObtained] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === 'Student') {
      const stdID = params.id;
      setStudentID(stdID);
      dispatch(getUserDetails(stdID, 'Student'));
    } else if (situation === 'Subject') {
      const { studentID, subjectID } = params;
      setStudentID(studentID);
      setChosenSubName(subjectID);
      dispatch(getUserDetails(studentID, 'Student'));
    }
  }, [params.id, situation]);

  useEffect(() => {
    if (userDetails?.sclassName && situation === 'Student') {
      dispatch(getSubjectList(userDetails.sclassName._id, 'ClassSubjects'));
    }
  }, [userDetails, dispatch]);

  const changeHandler = (event) => {
    const selected = subjectsList.find(sub => sub.subName === event.target.value);
    setSubjectName(selected?.subName || '');
    setChosenSubName(selected?._id || '');
  };

  const fields = { subName: chosenSubName, marksObtained };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStudentFields(studentID, fields, 'UpdateExamResult'));
  };

  useEffect(() => {
    if (response) {
      setLoader(false);
      setMessage(response);
      setShowPopup(true);
    } else if (error) {
      setLoader(false);
      setMessage('Error occurred');
      setShowPopup(true);
    } else if (statestatus === 'added') {
      setLoader(false);
      setMessage('Marks submitted successfully!');
      setShowPopup(true);
    }
  }, [response, statestatus, error]);

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grow in timeout={600}>
          <Paper
            elevation={6}
            sx={{
              maxWidth: 600,
              margin: '3rem auto',
              padding: 4,
              borderRadius: 3,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Submit Exam Marks
            </Typography>

            <Typography variant="h6" gutterBottom>
              Student: <strong>{userDetails.name}</strong>
            </Typography>

            {currentUser?.teachSubject && (
              <Typography variant="h6" gutterBottom>
                Subject: <strong>{currentUser.teachSubject.subName}</strong>
              </Typography>
            )}

            <form onSubmit={submitHandler}>
              <Stack spacing={3} mt={3}>
                {situation === 'Student' && (
                  <FormControl fullWidth>
                    <InputLabel>Select Subject</InputLabel>
                    <Select
                      value={subjectName}
                      label="Select Subject"
                      onChange={changeHandler}
                      required
                    >
                      {subjectsList?.length > 0 ? (
                        subjectsList.map((subject) => (
                          <MenuItem key={subject._id} value={subject.subName}>
                            {subject.subName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No subjects available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  label="Marks Obtained"
                  type="number"
                  value={marksObtained}
                  onChange={(e) => setMarksObtained(e.target.value)}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />

                <BlueButton
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  variant="contained"
                  disabled={loader}
                >
                  {loader ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </BlueButton>
              </Stack>
            </form>
          </Paper>
        </Grow>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default StudentExamMarks;
