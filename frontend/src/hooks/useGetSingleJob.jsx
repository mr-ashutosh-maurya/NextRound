import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchSingleJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {withCredentials:true});
            if(res.data.success){
                dispatch(setSingleJob(res.data.jobs));
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchSingleJobs();
  },[])
};

export default useGetSingleJob;
