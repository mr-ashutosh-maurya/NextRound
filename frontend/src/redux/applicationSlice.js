import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState:{
        applicants:[],
    },
    reducers:{
        setAllApllicants:(state, action) =>{
            state.applicants  = action.payload;
        },
    }
});

export const {setAllApllicants} = applicationSlice.actions;
export default applicationSlice.reducer;