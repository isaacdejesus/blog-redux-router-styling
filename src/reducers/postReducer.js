import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
const initialState = []

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts(state, action){
            //{console.log(action.payload)}
            return action.payload
        },
        addPost(state, action) {
            state.push(action.payload)
            state.sort((a,b) => {return b.likes - a.likes})
        }
    }
})

export const {setPosts, addPost} = postSlice.actions
export const initializePosts = () => {
    return async dispatch => {
        const posts = await blogService.getAll() 
        posts.sort((a,b) => {return b.likes - a.likes})
        dispatch(setPosts(posts))
    } 
}
export const addaPost = (object) => {
    return async dispatch => {
        const post = await blogService.create(object)
        dispatch(addPost(post))
    }
}
export default postSlice.reducer
