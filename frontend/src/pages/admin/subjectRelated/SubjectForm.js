import React, { useEffect, useRef, useState } from "react";
import {
  Button, TextField, Grid, Box, Typography, CircularProgress, Paper, Collapse, Divider, Alert
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
import styled from "styled-components";

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
  const lastInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { status, currentUser, response, error } = useSelector(state => state.user);

  const sclassName = params.id;
  const adminID = currentUser._id;
  const address = "Subject";

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [warning, setWarning] = useState("");

  const handleFieldChange = (index, field) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = event.target.value;
    setSubjects(newSubjects);
    setWarning("");
  };

  const handleAddSubject = () => {
    setSubjects(prev => {
      const updated = [...prev, { subName: "", subCode: "", sessions: "" }];
      setTimeout(() => {
        if (lastInputRef.current) lastInputRef.current.focus();
      }, 100);
      return updated;
    });
  };

  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const fields = {
    sclassName,
    subjects: subjects.map(({ subName, subCode, sessions }) => ({
      subName, subCode, sessions
    })),
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (subjects.every(sub => !sub.subName.trim() && !sub.subCode.trim())) {
      setWarning("Please provide at least one valid subject entry.");
      return;
    }
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate("/Admin/subjects");
      dispatch(underControl());
      setLoader(false);
    } else if (status === 'failed' || status === 'error') {
      setMessage(status === 'failed' ? response : "Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" fontWeight={600} gutterBottom>Add Subjects</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Assign subjects to this class. You can add multiple at once.
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="primary" onClick={handleAddSubject}>+ Add</Button>
          </Grid>
          {subjects.map((subject, index) => (
            <Collapse key={index} in={true} timeout={400}>
              <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Typography variant="subtitle2" color="primary">
                      Subject {index + 1}: {subject.subName || "New Entry"}
                    </Typography>
                  </Divider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    label="Subject Name"
                    variant="outlined"
                    value={subject.subName}
                    onChange={handleFieldChange(index, 'subName')}
                    inputRef={index === subjects.length - 1 ? lastInputRef : null}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <StyledTextField
                    fullWidth
                    label="Subject Code"
                    variant="outlined"
                    value={subject.subCode}
                    onChange={handleFieldChange(index, 'subCode')}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <StyledTextField
                    fullWidth
                    label="Sessions"
                    variant="outlined"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={subject.sessions}
                    onChange={handleFieldChange(index, 'sessions')}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  {subjects.length > 1 && (
                    <Button variant="outlined" color="error" onClick={handleRemoveSubject(index)} sx={{ ml: 1 }}>Remove</Button>
                  )}
                </Grid>
              </Grid>
            </Collapse>
          ))}
          {warning && (
            <Grid item xs={12}>
              <Alert severity="warning">{warning}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                sx={{ px: 4, borderRadius: '8px' }}
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </form>
    </FormContainer>
  );
};

export default SubjectForm;

const FormContainer = styled(Paper)`
  padding: 2.5rem;
  border-radius: 18px;
  background: #fff;
  max-width: 1080px;
  margin: 2rem auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`;

const StyledTextField = styled(TextField)`
  & label {
    font-size: 0.95rem;
    color: #666;
  }
  & .MuiOutlinedInput-root {
    border-radius: 10px;
  }
`;
