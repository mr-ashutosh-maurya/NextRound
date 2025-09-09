import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchAllJobs();
  },[])
};

export default useGetAllJobs;
