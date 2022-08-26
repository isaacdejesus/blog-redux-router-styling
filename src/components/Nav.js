import {Link} from 'react-router-dom';
import {setUser, clearUser} from '../reducers/userReducer.js';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import blogService from '../services/blogs.js'
import {Typography, Button, Box, Stack, } from '@mui/material';
const Nav = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJSON){ const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])
    const handleLogOut = () => {
        window.localStorage.clear();
        dispatch(clearUser());
    }
    const user = useSelector(state => state.user);
    return(
        <Stack
            width="70%"
            height="6vh"
            direction="row"
            alignItems="center"
            m="auto"
            justifyContent="space-around"
            color="white"
            sx={{backgroundColor:"#3D3C42"}}
            borderRadius="2%"
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{
                    spacing: "12",
                        direction: {
                            med: "column"
                        }
                }}
            >
            <Typography mr=".5rem" ml=".5rem" variant="h6" sx={{display: {xs: 'none', md: 'block'}}} ><Link to="/" style={{textDecoration: 'none', color: "#fff"}}>Home</Link></Typography>
            <Typography mr=".5rem" ml=".5rem" variant="h6"><Link to="/blogs" style={{textDecoration: 'none', color: "#fff"}}>Blogs</Link></Typography>
            <Typography mr=".5rem" ml=".5rem" variant="h6"><Link to="/users" style={{textDecoration: 'none', color: "#fff"}}>Users</Link></Typography>
            </Stack>
        <Stack direction="row" alignItems="center" >
        {user ? (<>
            <Typography
                variant="h6" 
                pt="1rem"
                pb="1rem"
                mr=".5rem"
                ml=".5rem"
                sx={{display: {xs: 'none', md: 'block'}}}
            >

                {user.name} logged in
             </Typography>
            <Button variant="contained" color="warning" onClick={handleLogOut } ml=".5rem" mr=".5rem"
                size="small" 
            >
            logout
            </Button></>)
            : ''
        }
        </Stack>
        </Stack>
    )
}

export default Nav;
