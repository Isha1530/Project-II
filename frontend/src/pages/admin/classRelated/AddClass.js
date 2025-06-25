import React, { useEffect, useState } from "react";
import {
  Box, Button, CircularProgress, Stack, TextField, Typography
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
  const [sclassName, setSclassName] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, tempDetails } = useSelector(state => state.user);

  const adminID = currentUser._id;
  const address = "Sclass";
  const fields = { sclassName, adminID };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added' && tempDetails) {
      console.log('Navigating to /Admin/classes after class creation');
      navigate("/Admin/classes");
      dispatch(underControl());
      setLoader(false);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch, tempDetails]);

  return (
    <>
      <StyledContainer>
        <StyledBox>
          <Stack spacing={2} alignItems="center">
            <img src={Classroom} alt="classroom" className="class-img" />
            <Typography variant="h4" fontWeight={600}>Create a New Class</Typography>
            <Typography variant="body2" color="text.secondary">Organize your students with a class group</Typography>
          </Stack>
          <form onSubmit={submitHandler}>
            <Stack spacing={3} mt={4}>
              <TextField
                fullWidth
                label="Class Name"
                variant="outlined"
                value={sclassName}
                onChange={(e) => setSclassName(e.target.value)}
                required
              />
              <StyledButton
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Create Class"}
              </StyledButton>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(-1)}
                sx={{
                  borderRadius: "10px",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  '&:hover': { backgroundColor: "#f5f5f5" }
                }}
              >
                ← Go Back
              </Button>
            </Stack>
          </form>
        </StyledBox>
      </StyledContainer>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddClass;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4f8 0%, #e6efff 100%);
  min-height: 100vh;
  padding: 2rem;
`;

const StyledBox = styled(Box)`
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  padding: 3rem 2rem;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
  transition: all 0.3s ease;

  .class-img {
    width: 75%;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  }
`;

const StyledButton = styled(BlueButton)`
  border-radius: 10px;
  text-transform: capitalize;
  font-weight: 600;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2563eb;
  }
`;
