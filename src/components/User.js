import {Box, Stack, Button, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
const User = () => {
    const id = useParams().id;
    const users = useSelector(state => state.users);
    const user = users.find(user => user.id === id)
    if(!user)
        return null
    console.log(user.posts)
    return(
        <Box>
            <Typography
                margin="auto"
                width="60%"
                p="5%"
                //alignItems="center"
                sx={{backgroundColor: "#EFEFEF"}}
        >
            <Typography variant="h4" color="#363062">Posts by {user.name} </Typography>
                {user.posts.map(post => 
                    <Typography 
                        key={user.id}
                        variant="h6"
                        border= " .5px #827397 double" 
                        borderRadius="3px"
                        m=".5px"
                        p=".5px"
                        color="#143F6B"
                    >
                        {post.title}
                    </Typography>
                )}
            </Typography>
        </Box>
    )
}
export default User;
