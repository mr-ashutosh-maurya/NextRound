import React, { useEffect } from "react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setCompany } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {withCredentials:true});
            if(res.data.success){
                dispatch(setCompany(res.data.companies));
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchCompanies();
  },[])
};

export default useGetAllCompanies;
