import {createSlice} from '@reduxjs/toolkit'

export const compSlice = createSlice({
    name: "comp",
    initialState: {value: "wellcome"},
    reducers: {
        switchComp: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {switchComp} = compSlice.actions

export default compSlice.reducer