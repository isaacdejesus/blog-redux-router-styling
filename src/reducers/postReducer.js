import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
import commentsService from '../services/comments.js'
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
        },
        updatePost(state, action){
            const BLOG = state.find(blog => blog.id === action.payload.id)
            console.log("OUR ID IS: ", BLOG.id ,"AND", action.payload.id)
            const UPDATEDBLOG = {...BLOG, likes: action.payload.likes}
            return state.map(blog => blog.id !== action.payload.id ? blog : UPDATEDBLOG)
        },
        sortLikes(state, action){
            return state.sort((a,b) => {return b.likes - a.likes})
        },
        deleteAPost(state, action){
             return state.filter(blog => blog.id != action.payload.id)
        },
        addAComment(state, action){
            const BLOG = state.find(blog => blog.id === action.payload.postID)
            const UPDATEDBLOG = {...BLOG, comments: BLOG.comments.concat(action.payload)}
            console.log(" is issss: ", action.payload.id)
             return state.map(blog => blog.id != action.payload.postID ? blog : UPDATEDBLOG )
        }
    }
})

export const {setPosts, addPost, updatePost, sortLikes, deleteAPost, addAComment} = postSlice.actions
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
export const updateLikes = (object) => {
    return async dispatch => {
        const updatedBlog = {
            user: object.user.id,
            author: object.author,
            title: object.title,
            url: object.url,
            likes: object.likes,
            id: object.id
        }
        const updatedPost = await blogService.update(object.id, updatedBlog)
        dispatch(updatePost(updatedPost ));
    }
}
export const deletePost = (postId) => {
    return async dispatch => {
        const postToDelete = await blogService.del(postId)
        dispatch(deleteAPost(postId))
    }
}
export const addComment =(object) => {
    return async dispatch => {
        const commentToAdd = await commentsService.create(object)
        console.log(commentToAdd);
        console.log("post id from thunk is: ", commentToAdd.id)
        commentToAdd.postID = object.postId
        console.log(commentToAdd.postID)
        dispatch(addAComment(commentToAdd))
    }
}
export default postSlice.reducer
