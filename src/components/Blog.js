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
    if(!blog)
        return null
    return(
            <Stack
                margin="auto"
                width="60%"
                p="5%"
                //alignItems="center"
                sx={{backgroundColor: "#EFEFEF"}}
            >
                <Stack
                    sx={{backgroundColor: "rgba(113,90, 163, .1)", borderRadius: "6px"}}
                    p="2%"
                >
                <Typography variant="h5" color="#1B2430"> {blog.title}</Typography>
                <Typography variant="subtitle1" color="#816797">Written by {blog.author}</Typography>
                <Typography 
                    variant="subtitle1"
                > 
                    <a href="{blog.url}" target="_blank" rel="noopener noreferrer" > Link to blog: {blog.url} </a>
                </Typography>
                <Typography
                    variant="p"
                    color="green"
                    pt=".3rem"
                > {blog.likes} Likes<span> </span> 
                    <Link to= {`/blogs/${blog.id}`}> 
                        <Button variant="contained" color="success" size="small" sx={{ml:"2%"}} onClick={()=>UpdateLikes(blog)}>Like </Button>
                    </Link>
                </Typography>
                </Stack>
                <Box mt="2%" mb="3%">
                    <Button onClick={()=>handleDel(blog.id)} variant="contained" color="error" size="small">delete </Button>
                </Box>
            <Typography p="2px">Leave a comment! </Typography>
            <TextField 
                value={comment} 
                onChange={(e) => dispatch(setComment(e.target.value))} 
                placeholder="Enter your comment"
                type="text"
            />
                <Box textAlign="center">
            <Button onClick={handleComment} variant="contained" sx={{m:"2%"}}>Submit </Button>
                </Box>
        {blog.comments.map(comment => (
            <Typography key={comment.id} p=".5%" color="#4C3A51">{comment.comment}</Typography>
        ))}
            </Stack>
)}

export default Blog
