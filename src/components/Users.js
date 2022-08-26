import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {initializeUsers} from '../reducers/usersReducer.js';
import {Box, Stack, Button, Typography} from '@mui/material';
import User from './User.js';
import {Link, useNavigate} from 'react-router-dom';
import {setUser} from '../reducers/userReducer.js';
import blogService from '../services/blogs.js';
const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeUsers())
    },[])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedBlogappUser')
        if(loggedUserJSON){ const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    return(
        <Box>
            <Stack
                margin="auto"
                width="60%"
                p="5%"
                //alignItems="center"
                sx={{backgroundColor: "#EFEFEF"}}
        >
            <Typography
                variant="h4"
                align="center"
                pb="1rem"
            >
                USERS 
            </Typography>
                { user === null ? navigate("/") :
                    users.map(user => 
                    <Typography 
                        key = {user.id}
                        variant="h6"
                        border= " .5px #827397 double" 
                        borderRadius="3px"
                        m=".5px"
                        p=".5px"
                        color="#143F6B"
                        pl="1rem"
                    >
                        <Link to={`/users/${user.id}`} style={{textDecoration:"none", color: "#000"}}>{user.name}</Link>
                    </Typography>
                )}
        </Stack>
        </Box>
    
    )
}
export default Users;
