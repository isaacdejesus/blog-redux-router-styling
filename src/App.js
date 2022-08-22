import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm.js'
import PostForm from './components/PostForm.js'
import Togglable from './components/Togglable.js'
import GoodNotif from './components/GoodNotif.js'
import blogService from './services/blogs'
import loginService from './services/login.js'
import { useDispatch, useSelector } from 'react-redux'
import {setNotif, clearNotif} from './reducers/notifReducer.js'
import {initializePosts} from './reducers/postReducer.js'
import {setUser, clearUser} from './reducers/userReducer.js'
import {addPost, setPosts, addaPost} from './reducers/postReducer.js'
import Users from './components/Users';
import Posts from './components/Posts.js';
import {Routes, Route} from 'react-router-dom';
const App = () => {
  return (
    <div>
      <GoodNotif />

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}


export default App
