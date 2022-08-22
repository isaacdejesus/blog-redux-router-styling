import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer.js'
import userReducer from './reducers/userReducer.js'
import postReducer from './reducers/postReducer.js'
const store = configureStore({
    reducer: {
        notifs: notifReducer,
        user: userReducer,
        posts: postReducer
    }
})

export default store
