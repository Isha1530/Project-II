import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNotice, clearResponse, clearError } from '../../../redux/noticeRelated/noticeSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';

const AddNotice = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const fields = { title, details, date, adminID: currentUser._id };
    const address = "Notice";

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(addNotice({ fields, address }));
    };

    useEffect(() => {
        if (response === "Notice added successfully") {
            navigate('/Admin/notices');
            dispatch(clearResponse());
        }
    }, [response, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            setMessage(error);
            setShowPopup(true);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    return (
        <>
            <div className="register">
                <form className="registerForm" onSubmit={submitHandler}>
                    <span className="registerTitle">Add Notice</span>
                    <label>Title</label>
                    <input className="registerInput" type="text" placeholder="Enter notice title..."
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required />

                    <label>Details</label>
                    <input className="registerInput" type="text" placeholder="Enter notice details..."
                        value={details}
                        onChange={(event) => setDetails(event.target.value)}
                        required />

                    <label>Date</label>
                    <input className="registerInput" type="date" placeholder="Enter notice date..."
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required />

                    <button className="registerButton" type="submit" disabled={loading}>
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Add'
                        )}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddNotice;