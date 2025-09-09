import Footer from '@/components/Home/Footer';
import InfoCard from '@/components/Recommandation/InfoCard';
import RecentlyViewed from '@/components/Recommandation/RecentlyViewed ';
import RecommendedJobs from '@/components/Recommandation/RecommendedJobs';
import SimilarJobs from '@/components/Recommandation/SimilarJobs ';
import React from 'react'
import { useSelector } from 'react-redux';

const Browse = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className='max-w-7xl mx-auto px-4 mt-10 md:mt-4'>
    <div><InfoCard/></div>
    {user ? 
      <>
      <div><RecommendedJobs/></div>
      <div><SimilarJobs/></div>
      <div><RecentlyViewed/></div>
      <div><Footer/></div>
      </>
    :  <div className="w-full mb-10 flex flex-col items-center justify-center text-center gap-4">
          <img
            src="/error-404.png"
            alt="Not Registered"
            className="max-w-md w-full object-contain  border-gray-300"
          />
          <h1 className="font-bold text-xl text-gray-800">
            You have not registered yet, please register to view
          </h1>
        </div>
    }
    
    </div>
  )
}

export default Browse