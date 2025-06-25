import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grow,
  Paper
} from '@mui/material';

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { status, currentUser, response, error } = useSelector((state) => state.user);
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');

  const adminID = currentUser._id;
  const role = 'Student';
  const attendance = [];

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === 'Class') {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, 'Sclass'));
  }, [adminID, dispatch]);

  const changeHandler = (event) => {
    const selectedValue = event.target.value;
    setClassName(selectedValue);

    const selectedClass = sclassesList.find((cls) => cls.sclassName === selectedValue);
    if (selectedClass) setSclassName(selectedClass._id);
  };

  const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === '') {
      setMessage('Please select a class');
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate(-1);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <Grow in timeout={600}>
        <Paper elevation={4} sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Student
          </Typography>
          <Box component="form" onSubmit={submitHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />

            {situation === 'Student' && (
              <FormControl fullWidth required>
                <InputLabel>Class</InputLabel>
                <Select value={className} label="Class" onChange={changeHandler}>
                  <MenuItem value="Select Class" disabled>Select Class</MenuItem>
                  {sclassesList.map((cls) => (
                    <MenuItem key={cls._id} value={cls.sclassName}>
                      {cls.sclassName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Roll Number"
              type="number"
              value={rollNum}
              onChange={(e) => setRollNum(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loader}
              sx={{ mt: 2, bgcolor: 'primary.main', color: 'white' }}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student'}
            </Button>
          </Box>
        </Paper>
      </Grow>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddStudent;
