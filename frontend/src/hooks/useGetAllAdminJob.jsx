import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setAllAdminJob } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllAdminJob(res.data.jobs));
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchAllAdminJobs();
  },[])
};

export default useGetAllAdminJobs;
