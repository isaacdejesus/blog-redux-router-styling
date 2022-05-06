import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
        setNotif(state, action){
            //{console.log(action.payload)}
            return state=action.payload
        },
        clearNotif(state, action) {
            return state = null
        }
    }
})

export const {setNotif, clearNotif} = notifSlice.actions
export default notifSlice.reducer
