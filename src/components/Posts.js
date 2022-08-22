
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
import {setUser, clearUser} from '../reducers/userReducer.js'
import {addPost, setPosts, addaPost} from '../reducers/postReducer.js'
import Users from './Users';
import {Routes, Route} from 'react-router-dom';
const Posts = () => {
    const [vblogs, setBlogs] = useState([])
    const [successMsg, setSuccessMsg] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const dispatch = useDispatch()
    const notif = useSelector(state => state.notifs)

  useEffect(() => {
      dispatch(initializePosts())
  }, [dispatch, ])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])
    const addPost = postObject => {
        dispatch(addaPost(postObject))
        dispatch(setNotif("Successsssss"))
        setTimeout(()=> {
            dispatch(clearNotif())
        },3000)
    }
    const updateLikes = (blog) => {
        const updatedBlog = {
            user: blog.user.id,
            author: blog.author,
            title: blog.title,
            url: blog.url,
            likes: blog.likes
        }
        const updatedBlogId = blog.id
        blogService
            .update(blog.id, updatedBlog)
            .then(returnedPost => {
                setBlogs(blogs.map(blog => blog.id !== updatedBlogId ? blog : returnedPost))   
            })
        setBlogs(blogs.sort((a,b) => {return b.likes - a.likes}))
    }

    const handleDel = id => {
        const maybe = window.confirm("do you really want to delete?")
        if(!maybe)
            return
        const toDel = blogs.find(blog => blog.id === id)
        blogService
            .del(id)
            .then(persontoDel => {
                setBlogs(blogs.filter(blog => blog.id !== toDel.id))
            }) 
        
        setBlogs(blogs.sort((a,b) => {return b.likes - a.likes}))
        console.log(" I am hereee")
        dispatch(setNotif("successcully deleted POst"))
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
    return(
        <div>
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm/>
        </Togglable> :
       <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut } >logout</button>
            <Togglable buttonLabel="new post">
                <PostForm createPost={addPost}/>
            </Togglable>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={()=> updateLikes(blog)} handleDel={()=> handleDel(blog.id)} />)}
        </div>
      }
        </div>
    )
}
export default Posts;
