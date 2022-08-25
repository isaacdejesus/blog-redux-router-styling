import { useSelector } from 'react-redux'
import {Stack, Typography} from '@mui/material';
const GoodNotif = () => {
    const message = useSelector(state => state.notifs)
    if(message === null)
        return null
    return (
        <Stack 
            height="10%"
            color="white"
            align="center"
            sx={{
                backgroundColor: "#277BC0"
            }}
            
        >
            <Typography
                variant="h5"
            >    
                {message} 
            </Typography>
        </Stack>
    )
}
export default GoodNotif
