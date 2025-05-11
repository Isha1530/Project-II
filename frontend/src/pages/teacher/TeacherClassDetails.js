import { useEffect } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { 
    Paper, 
    Box, 
    Typography, 
    ButtonGroup, 
    Button, 
    Popper, 
    Grow, 
    ClickAwayListener, 
    MenuList, 
    MenuItem,
    Container,
    CircularProgress,
    useTheme
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import TableTemplate from "../../components/TableTemplate";

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents?.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    })) || [];

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
            } else if (selectedIndex === 1) {
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
            }
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
            if (index === 0) {
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
            } else if (index === 1) {
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
            }
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current?.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/Teacher/class/student/" + row.id)}
                    sx={{ textTransform: 'none' }}
                >
                    View
                </Button>
                <ButtonGroup variant="contained" ref={anchorRef}>
                    <Button 
                        onClick={handleClick}
                        sx={{ textTransform: 'none' }}
                    >
                        {options[selectedIndex]}
                    </Button>
                    <Button
                        size="small"
                        onClick={handleToggle}
                        sx={{
                            minWidth: 32,
                            backgroundColor: theme.palette.grey[800],
                            '&:hover': {
                                backgroundColor: theme.palette.grey[700],
                            }
                        }}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    sx={{ zIndex: 1 }}
                >
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps}>
                            <Paper elevation={3}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                                sx={{ minWidth: 180 }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Box>
        );
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 4
            }}>
                Class Details
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress size={60} />
                </Box>
            ) : (
                <Paper elevation={3} sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    boxShadow: theme.shadows[3]
                }}>
                    {getresponse ? (
                        <Typography variant="h6" align="center" sx={{ p: 3 }}>
                            No Students Found in This Class
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="h5" gutterBottom sx={{ 
                                mb: 3,
                                fontWeight: 500,
                                color: theme.palette.text.primary
                            }}>
                                Students List
                            </Typography>

                            {studentRows.length > 0 ? (
                                <TableTemplate 
                                    buttonHaver={StudentsButtonHaver} 
                                    columns={studentColumns} 
                                    rows={studentRows} 
                                />
                            ) : (
                                <Typography variant="body1" align="center" sx={{ p: 2 }}>
                                    No students available
                                </Typography>
                            )}
                        </>
                    )}
                </Paper>
            )}
        </Container>
    );
};

export default TeacherClassDetails;