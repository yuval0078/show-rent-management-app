import {createSlice} from '@reduxjs/toolkit'

export const elementIdSlice = createSlice({
    name: "elementId",
    initialState: {value: "redux is shit"},
    reducers: {
        search: (state, action) => {
            state.value = action.payload
        },
        clear: (state, action) => {
            state.value = ""
        }
    }
})

export const {search} = elementIdSlice.actions

export default elementIdSlice.reducer