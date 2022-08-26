import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Togglable from './Togglable.js';
import LoginForm from './LoginForm.js';
import CreateAccountForm from './CreateAccountForm.js';
import {useEffect} from 'react';
import blogService from '../services/blogs.js';
import {setUser} from '../reducers/userReducer.js';
import {Box, Stack, Typography} from '@mui/material';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    useEffect(() =>{
        if(user)
         navigate("/blogs") 
    })
    return(
        <Stack
            alignItems="center"
            sx={{
                width: "70%",
                backgroundColor: 'rgba(0, 0, 0, .9)',
                pt: '5%'
            }}
                m="auto"
        >
            <Stack>
                <Typography
                    variant="h4"
                    color="#fff"
                    align="center"
                    pb="5%"   
                >
                    Please log in to access Blog
                </Typography>
                <Togglable buttonLabel='login'>
                    <LoginForm/>
                </Togglable> 
                <Togglable buttonLabel='Sign up'>
                    <CreateAccountForm/>
                </Togglable> 
            </Stack>
        </Stack>
    )
};

export default Login;
