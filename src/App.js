import GoodNotif from './components/GoodNotif.js'
import Users from './components/Users';
import Posts from './components/Posts.js';
import User from './components/User.js';
import Blog from './components/Blog.js';
import Login from './components/Login.js';
import {Routes, Route, useMatch, useParams, useNavigate, Navigate} from 'react-router-dom';
import {useSelector, } from 'react-redux';
import {Box, Stack} from "@mui/material";
import Nav from './components/Nav.js'
import './App.css'
const App = () => {
    const user = useSelector(state => state.user);
  return (
    <Box
      sx={{
          backgroundColor: "#fff"
      }}  
    >
    <Stack
        m="auto"
      >
      <GoodNotif />
      <Nav />
      <Routes>
        <Route path="/users/:id" element={<User  />} />
        <Route path="/" element={<Login />} />
        <Route path="/blogs" element={ user !== undefined ? <Posts /> : <Navigate replace to = "/" />} />
        <Route exact path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={user !== undefined ?  <Users />: <Navigate replace to="/" />} />
      </Routes>
    </Stack>
    </Box>
  )
}

export default App
