import { Container, Grid, Paper, Grow } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Grow in timeout={700}>
                        <StyledCard>
                            <img src={Students} alt="Students" height={50} />
                            <CardTitle>Total Students</CardTitle>
                            <CardData start={0} end={numberOfStudents} duration={2.5} />
                        </StyledCard>
                    </Grow>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grow in timeout={900}>
                        <StyledCard>
                            <img src={Classes} alt="Classes" height={50} />
                            <CardTitle>Total Classes</CardTitle>
                            <CardData start={0} end={numberOfClasses} duration={2.5} />
                        </StyledCard>
                    </Grow>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grow in timeout={1100}>
                        <StyledCard>
                            <img src={Teachers} alt="Teachers" height={50} />
                            <CardTitle>Total Teachers</CardTitle>
                            <CardData start={0} end={numberOfTeachers} duration={2.5} />
                        </StyledCard>
                    </Grow>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                            background: '#ffffff',
                        }}
                    >
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

const StyledCard = styled(Paper)`
  padding: 20px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
`;

const CardTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 12px 0 4px;
`;

const CardData = styled(CountUp)`
  font-size: 2rem;
  font-weight: bold;
  color: #10B981;
`;

export default AdminHomePage;
