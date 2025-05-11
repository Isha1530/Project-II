import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Paper, Table, TableBody, TableContainer,
    TableHead, TablePagination, Button, Box,
    IconButton, CircularProgress, Typography, Container,
    Tooltip, Avatar, useTheme
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);
    const theme = useTheme();

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => ({
        name: teacher.name,
        teachSubject: teacher.teachSubject?.subName || null,
        teachSclass: teacher.teachSclass.sclassName,
        teachSclassID: teacher.teachSclass._id,
        id: teacher._id,
    }));

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={0} sx={{ 
                padding: 3, 
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f8fafc',
                boxShadow: theme.shadows[3]
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" fontWeight={700} color="textPrimary">
                        Teachers Management
                    </Typography>
                    <GreenButton 
                        variant="contained" 
                        onClick={() => navigate("/Admin/teachers/chooseclass")}
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontSize: '1rem',
                            boxShadow: '0 2px 12px rgba(0,150,136,0.2)'
                        }}
                    >
                        + Add Teacher
                    </GreenButton>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <CircularProgress size={60} thickness={4} />
                    </Box>
                ) : (
                    <>
                        <TableContainer sx={{ 
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            mb: 2,
                            maxHeight: 'calc(100vh - 300px)'
                        }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <StyledTableRow>
                                        {columns.map((column) => (
                                            <StyledTableCell 
                                                key={column.id} 
                                                sx={{
                                                    fontWeight: 700,
                                                    backgroundColor: theme.palette.mode === 'dark' 
                                                        ? theme.palette.background.default 
                                                        : theme.palette.primary.light,
                                                    color: theme.palette.mode === 'dark' 
                                                        ? theme.palette.common.white 
                                                        : theme.palette.primary.dark,
                                                }}
                                            >
                                                {column.label}
                                            </StyledTableCell>
                                        ))}
                                        <StyledTableCell 
                                            align="center" 
                                            sx={{
                                                fontWeight: 700,
                                                backgroundColor: theme.palette.mode === 'dark' 
                                                    ? theme.palette.background.default 
                                                    : theme.palette.primary.light,
                                                color: theme.palette.mode === 'dark' 
                                                    ? theme.palette.common.white 
                                                    : theme.palette.primary.dark,
                                            }}
                                        >
                                            Actions
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                        <StyledTableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{ 
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                transition: 'background-color 0.2s',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.action.hover
                                                }
                                            }}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={column.id}>
                                                        {column.id === 'name' ? (
                                                            <Box display="flex" alignItems="center">
                                                                <Avatar 
                                                                    sx={{ 
                                                                        width: 36, 
                                                                        height: 36, 
                                                                        mr: 2,
                                                                        backgroundColor: theme.palette.primary.main,
                                                                        color: theme.palette.common.white
                                                                    }}
                                                                >
                                                                    {row.name.charAt(0)}
                                                                </Avatar>
                                                                <Typography variant="body1" fontWeight={500}>
                                                                    {value}
                                                                </Typography>
                                                            </Box>
                                                        ) : column.id === 'teachSubject' && !value ? (
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
                                                                sx={{
                                                                    borderRadius: 1,
                                                                    textTransform: 'none',
                                                                    borderWidth: 2,
                                                                    '&:hover': {
                                                                        borderWidth: 2
                                                                    }
                                                                }}
                                                            >
                                                                Assign Subject
                                                            </Button>
                                                        ) : (
                                                            <Typography variant="body1">
                                                                {value}
                                                            </Typography>
                                                        )}
                                                    </StyledTableCell>
                                                );
                                            })}
                                            <StyledTableCell align="center">
                                                <Box display="flex" justifyContent="center" alignItems="center">
                                                    <Tooltip title="Remove Teacher">
                                                        <IconButton 
                                                            onClick={() => deleteHandler(row.id, "Teacher")}
                                                            sx={{
                                                                '&:hover': {
                                                                    backgroundColor: theme.palette.error.light
                                                                }
                                                            }}
                                                        >
                                                            <PersonRemoveIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="View Details">
                                                        <BlueButton
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                                                            sx={{ 
                                                                ml: 1,
                                                                borderRadius: 1,
                                                                px: 2,
                                                                textTransform: 'none',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1
                                                            }}
                                                        >
                                                            <VisibilityIcon fontSize="small" />
                                                            View
                                                        </BlueButton>
                                                    </Tooltip>
                                                </Box>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                            sx={{
                                borderTop: `1px solid ${theme.palette.divider}`,
                                pt: 2
                            }}
                        />
                    </>
                )}

                <SpeedDialTemplate actions={actions} />
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Paper>
        </Container>
    );
};

export default ShowTeachers;