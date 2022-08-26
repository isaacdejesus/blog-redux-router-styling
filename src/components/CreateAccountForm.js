import { logIn } from '../reducers/userReducer.js'
import { useDispatch } from 'react-redux'
import {Button, Box, Typography, TextField, Stack} from '@mui/material';
import {setNotif, clearNotif} from '../reducers/notifReducer.js';
import userService from '../services/users.js';
import {useNavigate} from 'react-router-dom';
const CreateAccountForm = ({props}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        const credentials = {
            username: event.target.username.value,
            name: event.target.name.value,
            password: event.target.password.value
        }        
        userService.createUser(credentials)
        dispatch(setNotif("Create account"));
        setTimeout(()=> {
            dispatch(clearNotif())
        },3000)
        navigate("/blogs");
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
                        name="name"
                        placeholder="name"
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
                    <Button variant="contained" sx={{mt: ".5rem"}} type="submit">Create Account</Button>
                    </Box>
                </form>
            </Stack>
    )
}

export default CreateAccountForm;
