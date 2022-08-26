import {Box, Stack, Button, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {initializeUsers} from '../reducers/usersReducer.js'
import {useEffect} from 'react'
const User = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeUsers());
    },[])
    const id = useParams().id;
    const users = useSelector(state => state.users);
    const user = users.find(user => user.id === id)
    if(!user)
        return null
    return(
        <Box>
            <Stack
                margin="auto"
                width="60%"
                p="5%"
                //alignItems="center"
                sx={{backgroundColor: "#EFEFEF"}}
        >
            <Typography variant="h4" color="#363062">Posts by {user.name} </Typography>
                {user.posts.map(post => 
                    <Typography 
                        key={post.id}
                        variant="h6"
                        border= " .5px #827397 double" 
                        borderRadius="3px"
                        m=".5px"
                        p=".5px"
                        pl="1rem"
                        color="#143F6B"
                    >
                        {post.title}
                    </Typography>
                )}
            </Stack>
        </Box>
    )
}
export default User;
