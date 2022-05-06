import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm.js'
import PostForm from './components/PostForm.js'
import Togglable from './components/Togglable.js'
import GoodNotif from './components/GoodNotif.js'
import BadNotif from './components/BadNotif.js'
import blogService from './services/blogs'
import loginService from './services/login.js'
import { useDispatch, useSelector } from 'react-redux'
import {setNotif, clearNotif} from './reducers/notifReducer.js'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMsg, setSuccessMsg] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => {return b.likes - a.likes}))
    )  
  }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setSuccessMsg("Logged in successfully")
            setTimeout(()=> {
                setSuccessMsg(null)
            },3000)
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            //setErrMsg('Wront credentials')
            dispatch(setNotif("wrong credentials"))
            setTimeout(() => {
                //setErrMsg(null)
                dispatch(clearNotif())
            },4000)
        }
    }
    const addPost = postObject => {
        blogService
            .create(postObject)
            .then(returnedPost => {
                setBlogs(blogs.concat(returnedPost))
            })
       setSuccessMsg("post added") 
        setTimeout(()=> {
            setSuccessMsg(null)
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
    }
  return (
    <div>
      <h2>blogs</h2>
      <GoodNotif />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
       <div>
            <p>{user.name} logged in</p>
            <button onClick={window.localStorage.clear() } >logout</button>
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

export default App
