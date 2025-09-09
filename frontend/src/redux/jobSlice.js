import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState:{
       allJobs:[],
       allAdminJobs:[],
       allAppliedJobs:[],
       singleJob:null,
    },
    reducers:{
        setAllJobs:(state, action) =>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state, action) =>{
            state.singleJob = action.payload;
        },
        setAllAdminJob:(state, action) =>{
            state.allAdminJobs = action.payload;
        },
        setAllAppliedJob:(state, action) =>{
            state.allAppliedJobs = action.payload;
        }
    }
});

export const {setAllJobs, setSingleJob, setAllAdminJob, setAllAppliedJob} = jobSlice.actions;
export default jobSlice.reducer;