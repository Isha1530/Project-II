import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
  Box, InputLabel, MenuItem, Select, Typography, Stack, TextField,
  CircularProgress, FormControl, Paper, Grow
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const StudentAttendance = ({ situation }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { currentUser, userDetails, loading } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);
  const { response, error, statestatus } = useSelector((state) => state.student);

  const [studentID, setStudentID] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [chosenSubName, setChosenSubName] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
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

  const fields = { subName: chosenSubName, status, date };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStudentFields(studentID, fields, 'StudentAttendance'));
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
      setMessage('Attendance submitted successfully!');
      setShowPopup(true);
      setTimeout(() => {
        navigate('/Teacher/dashboard');
      }, 1200);
    }
  }, [response, statestatus, error, navigate]);

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
              Record Attendance
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

                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <MenuItem value="Present">Present</MenuItem>
                    <MenuItem value="Absent">Absent</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />

                <PurpleButton
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={loader}
                >
                  {loader ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </PurpleButton>
              </Stack>
            </form>
          </Paper>
        </Grow>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default StudentAttendance;
