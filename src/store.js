import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer.js'
import userReducer from './reducers/userReducer.js'
import postReducer from './reducers/postReducer.js'
import usersReducer from './reducers/usersReducer.js';
import commentReducer from './reducers/commentReducer.js'
const store = configureStore({
    reducer: {
        notifs: notifReducer,
        user: userReducer,
        posts: postReducer,
        users: usersReducer,
        comment: commentReducer
    }
})

export default store
