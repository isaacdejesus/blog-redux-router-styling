import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComment(state, action){
            //{console.log(action.payload)}
            return state=action.payload
        },
        clearComment(state, action) {
            return state = null
        }
    }
})

export const {setComment, clearComment} = commentSlice.actions
export default commentSlice.reducer
