import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
import { setNotif, clearNotif } from '../reducers/notifReducer.js'
const initialState = null
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            //{console.log(action.payload)}
            return state=action.payload
        },
        clearUser(state, action) {
            return state = null
        }
    }
})

export const { setUser, clearUser} = userSlice.actions
export const logIn = credentials => {
    return async dispatch => {
        try{
            const loggedInUser = await loginService.login(credentials)
            dispatch(setUser(loggedInUser))
            window.localStorage.setItem('LoggedBlogappUser', JSON.stringify(loggedInUser))
            blogService.setToken(loggedInUser.token)
            dispatch(setNotif(`Successfully logged in as ${loggedInUser.username}`))
            setTimeout(()=> {
                dispatch(clearNotif())
            },4000)
        }    
        catch(exception){
            dispatch(setNotif("invalid credentials"))
            setTimeout(()=> {
                dispatch(clearNotif())
            }, 4000)
        }
}
}
export default userSlice.reducer
