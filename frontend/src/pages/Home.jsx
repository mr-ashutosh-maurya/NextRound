import Category from '@/components/Home/Category'
import Footer from '@/components/Home/Footer'
import HeroSection from '@/components/Home/HeroSection'
import LatestJob from '@/components/Home/LatestJob'
import Testimonial from '@/components/Home/Testimonial'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === "recuiter"){
      navigate("/admin/companies");
    }
  },[])
  return (
    <div className='min-h-screen'>
      <HeroSection/>
      <Category/>
      <LatestJob/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home