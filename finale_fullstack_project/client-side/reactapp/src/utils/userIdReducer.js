import {createSlice} from '@reduxjs/toolkit'

export const userIdSlice = createSlice({
    name: "userId",
    initialState: {value: ""},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {login} = userIdSlice.actions

export default userIdSlice.reducer