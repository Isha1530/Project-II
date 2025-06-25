import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Snackbar, Alert
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices, deleteNotice, clearResponse, clearError } from '../../../redux/noticeRelated/noticeSlice';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllNotices({ id: currentUser._id, address: "Notice" }));
    }, [currentUser._id, dispatch]);

    const handleDeleteNotice = (noticeId) => {
        if (window.confirm("Are you sure you want to delete this notice?")) {
            dispatch(deleteNotice(noticeId));
        }
    };

    const handleCloseSnackbar = () => {
        if (error) dispatch(clearError());
        if (response) dispatch(clearResponse());
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList?.map((notice) => ({
        title: notice.title,
        details: notice.details,
        date: new Date(notice.date).toISOString().substring(0, 10),
        id: notice._id,
    })) || [];

    const NoticeButtonHaver = ({ row }) => (
        <IconButton onClick={() => handleDeleteNotice(row.id)}>
            <DeleteIcon color="error" />
        </IconButton>
    );

    const actions = [{
        icon: <NoteAddIcon color="primary" />, 
        name: 'Add New Notice',
        action: () => navigate("/Admin/addnotice")
    }];

    return (
        <>
            {loading && <div>Loading...</div>}
            
            {!loading && (response ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <GreenButton 
                        variant="contained"
                        onClick={() => navigate("/Admin/addnotice")}
                    >
                        Add Notice
                    </GreenButton>
                </Box>
            ) : (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    {noticesList.length > 0 && (
                        <TableTemplate 
                            buttonHaver={NoticeButtonHaver} 
                            columns={noticeColumns} 
                            rows={noticeRows} 
                        />
                    )}
                    <SpeedDialTemplate actions={actions} />
                </Paper>
            ))}

            <Snackbar
                open={!!error || !!response}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={error ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {error || response}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShowNotices;