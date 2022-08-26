import { useState, useEffect } from 'react'
import Blog from './Blog'
import LoginForm from './LoginForm.js'
import PostForm from './PostForm.js'
import Togglable from './Togglable.js'
import GoodNotif from './GoodNotif.js'
import blogService from '../services/blogs'
import loginService from '../services/login.js'
import { useDispatch, useSelector } from 'react-redux'
import {setNotif, clearNotif} from '../reducers/notifReducer.js'
import {initializePosts} from '../reducers/postReducer.js'
import {initializeUsers} from '../reducers/usersReducer.js';
import {setUser, clearUser} from '../reducers/userReducer.js'
import {addPost, setPosts, addaPost} from '../reducers/postReducer.js'
import Users from './Users';
import {Box, Stack, Button, Typography} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
const Posts = () => {
    const [vblogs, setBlogs] = useState([])
    const [successMsg, setSuccessMsg] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const dispatch = useDispatch()
    const notif = useSelector(state => state.notifs)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedBlogappUser')
        if(loggedUserJSON){ const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
        dispatch(initializePosts)
    }, [])
  useEffect(() => {
      dispatch(initializePosts())
      dispatch(initializeUsers())
  }, [dispatch, ])
    const addPost = postObject => {
        dispatch(addaPost(postObject))
        dispatch(setNotif("Successsssss"))
        setTimeout(()=> {
            dispatch(clearNotif())
        },3000)
    }
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.posts)
    const handleLogOut = () => {
        window.localStorage.clear();
        dispatch(clearUser());
    }
    const navigate = useNavigate();
    return(
        <Box>
            <Stack
                margin="auto"
                width="60%"
                p="5%"
                //alignItems="center"
                sx={{backgroundColor: "#EFEFEF"}}
        >
        <Typography
            variant="h3"
            align="center"
        >
            Async Blog
        </Typography>
      {user === null ?
          navigate("/")
          :
       <div>
            <Stack
                alignItems="center"
                textAlign="center"
                p="2rem"
                width="60%"
                m="1rem auto 2rem"
            sx={{backgroundColor: "rgba(113,90, 163, .1)", borderRadius: "6px"}}
            >
            <Togglable buttonLabel="Add a new post">
                <PostForm createPost={addPost}/>
            </Togglable>
            </Stack>
                {blogs.map(blog =>
                    <Typography 
                        key = {blog.id}
                        variant="h6"
                        border= " .5px #827397 double" 
                        borderRadius="3px"
                        m=".5px"
                        p=".5px"
                        pl="1rem"
                        color="#143F6B"
                    >
                       <Link to={`/blogs/${blog.id}`} style={{textDecoration:"none", color: "#000"}}> 
                        { blog.title} <Typography variant="subtitle2" align="justify">written by {blog.author}</Typography>
                        </Link> 
                    </Typography>
                )}
        </div>
      }
        </Stack>
        </Box>
    )
}
export default Posts;
