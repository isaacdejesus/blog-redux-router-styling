import { logIn } from '../reducers/userReducer.js'
import { useDispatch } from 'react-redux'
import {Button, Box, Typography, TextField, Stack} from '@mui/material';
const LoginForm = ({props}) => {
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault()
        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        }        
        dispatch(logIn(credentials)) 
    }
    const styles = {
        textfieldStyles: {
            input: {
                border: 'none',
                borderRadius: '4px'
            },
            width: "100%",
            mt: "0.5rem",
            mb: "0.5rem",
        }
    }
    return (
        <Stack
            sx={{borderRadius: "4px",  }}
        >
            <form   className="form" onSubmit={handleSubmit}>
                <div>
                    <TextField
                        name="username"
                        placeholder="username"
                        sx={styles.textfieldStyles}
                    />
                </div>
                <div>
                    <TextField
                        name="password"
                        type="password"
                        placeholder="password"
                        sx={styles.textfieldStyles}
                    />
                </div>
                    <Box textAlign="center">
                    <Button variant="contained" sx={{mt: ".5rem"}} type="submit">login</Button>
                    </Box>
                </form>
            </Stack>
    )
}

export default LoginForm
