import React, { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setAllAppliedJob } from "@/redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllAppliedJob(res.data.applications));
                // console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchAppliedJobs();
  },[])
};

export default useGetAppliedJobs;
