import { useState } from 'react'
import {Button, Box, Stack} from '@mui/material';
const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div>
            <div style={hideWhenVisible}>
                <Box textAlign="center">
                    <Button variant="contained" sx={{mt:".5rem", mb: "1rem"}}onClick={toggleVisibility}>{props.buttonLabel}</Button>
                </Box>
            </div>
            <div style={showWhenVisible}>
                <Stack justifyContent="center">
                    {props.children}
                </Stack>
                <Box textAlign="center">
                <Button variant="contained" sx={{mt:".5rem"}} color="error" onClick={toggleVisibility}>cancel</Button>
                </Box>
            </div>
        </div>
    )
}

export default Togglable
