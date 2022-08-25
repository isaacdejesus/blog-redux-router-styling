import { useState } from 'react'
import blogService from '../services/blogs.js'
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {setNotif, clearNotif} from '../reducers/notifReducer.js'
import {setPosts} from '../reducers/postReducer.js'
import {useEffect} from 'react';
import {setUser} from '../reducers/userReducer.js'
import {updateLikes, initializePosts, sortLikes, deletePost, deleteAPost, addComment} from '../reducers/postReducer.js';
import {TextField, Button, Box, Typography, Stack} from '@mui/material';
import {setComment, clearComment} from '../reducers/commentReducer.js'
const Blog = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedBlogappUser')
        if(loggedUserJSON){ const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
        dispatch(initializePosts())
    }, [])
    useEffect(() =>{
        dispatch(initializePosts());
        console.log("ini posts")
    },[dispatch])

    const id = useParams().id;
    console.log(id)
    const blogs = useSelector(state => state.posts);
    const blog = blogs.find(blog => blog.id === (id));
    
    const UpdateLikes = (blog) => {
        dispatch(updateLikes(blog));
        dispatch(sortLikes())
        //dispatch(initializePosts())
    }

    const handleDel = id => {
        const maybe = window.confirm("do you really want to delete?")
        if(!maybe)
            return
        dispatch(deletePost(id));
        dispatch(sortLikes());
        dispatch(setNotif("successcully deleted post"))
        setTimeout(()=> {
            dispatch(clearNotif())
            navigate('/')
        },2000)
    }
    const comment = useSelector(state => state.comment);
    const handleComment = () => {
        console.log("value of comment is: ", comment)
        console.log("value of post id is: ", blog.id)
        dispatch(addComment({comment: comment, postId: blog.id }))

        dispatch(setNotif("added a comment"))
        setTimeout(()=> {
            dispatch(clearNotif())
        },3000)
    }
    return(
        <Box>
            <Stack
                margin="auto"
                width="60%"
                height="100vh"
                p="5%"
                //alignItems="center"
                sx={{backgroundColor: "#EFEFEF"}}
            >
                <Typography> {blog.title}</Typography>
            <a href="{blog.url}" target="_blank" rel="noopener noreferrer">{blog.url} </a>
            <p> {blog.likes} Likes<span> </span> 
           <Link to= {`/blogs/${blog.id}`}> <button onClick={()=>UpdateLikes(blog)}>Like </button></Link>
            </p>
            <span> added by {blog.author} </span>
                <Box textAlign="center">
                    <Button onClick={()=>handleDel(blog.id)} variant="contained">delete </Button>
                </Box>
            <h2>add a comment </h2>
            <TextField 
                value={comment} 
                onChange={(e) => dispatch(setComment(e.target.value))} 
                placeholder="Enter your comment"
                type="text"
            />
                <Box textAlign="center">
            <Button onClick={handleComment} variant="contained">Submit </Button>
                </Box>
        {blog.comments.map(comment => (
            <p key={comment.id}>{comment.comment}</p>
        ))}
            </Stack>
        </Box>  
)}

export default Blog
