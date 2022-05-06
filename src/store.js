import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer.js'
const store = configureStore({
    reducer: {
        notifs: notifReducer
    }
})

export default store
