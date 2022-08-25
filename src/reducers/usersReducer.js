import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users.js';
const initialState = []
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setUsers(state, action){
            //{console.log(action.payload)}
            return action.payload
        },
    }
})

export const {setUsers } = postSlice.actions
export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll() 
        dispatch(setUsers(users))
    } 
}
export default postSlice.reducer
