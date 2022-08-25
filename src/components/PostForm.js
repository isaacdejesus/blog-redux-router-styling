import { useState } from 'react'
import {Box, Typography, Stack, Button, TextField} from '@mui/material';
const PostForm = ({ createPost }) => {
    const styles = {
        fieldStyles: {
            input: {
                border: 'none',
                borderRadius: '4px'
            },
            width: "100%",
            mt: "0.5rem",
            mb: "0.5rem"
        }
    }
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [likes, setLikes] = useState(0)
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }
    const handleLikes = (event) => {
        setLikes(event.target.value)
    }
    const addPost = (event) => {
        event.preventDefault()
        createPost({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: likes
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setLikes('')
    }
    return (
        <div>
            <Typography variant="h5" pb="1rem"  >Create a new post: </Typography>
            <form onSubmit={addPost}>
                <div>
                    <TextField 
                        value={newTitle}
                        onChange={handleTitleChange} 
                        placeholder="title"
                        sx={styles.fieldStyles}
                    />
                </div>
                <div>
                    <TextField 
                        value={newAuthor}
                        onChange={handleAuthorChange} 
                        placeholder="author"
                        sx={styles.fieldStyles}
                    />
                </div>
                <div>
                    <TextField 
                        value={newUrl}
                        onChange={handleUrlChange} 
                        placeholder="url"
                        sx={styles.fieldStyles}
                    />
                </div>
                <div>
                    <TextField 
                        value={likes}
                        onChange={handleLikes} 
                        placeholder="likes"
                        sx={styles.fieldStyles}
                    />
                </div>
                    <Box textAlign="center" mt="1rem"> 
                    <Button type="submit" variant="contained" >post</Button>
                    </Box>
            </form>
        </div>
    )
}
export default PostForm
