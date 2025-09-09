import Footer from '@/components/Home/Footer';
import InfoCard from '@/components/Recommandation/InfoCard';
import RecentlyViewed from '@/components/Recommandation/RecentlyViewed ';
import RecommendedJobs from '@/components/Recommandation/RecommendedJobs';
import SimilarJobs from '@/components/Recommandation/SimilarJobs ';
import React from 'react'
import { useSelector } from 'react-redux';

const randomJob = [
  {
    name: "Microsoft",
    location: "Bangalore",
    title: "Frontend Developer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    positions: "12",
    type: "Full-time",
    package: "24 LPA",
  },
  {
    name: "Google",
    location: "Noida",
    title: "Backend Developer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    positions: "8",
    type: "Full-time",
    package: "14 LPA",
  },
  {
    name: "Amazon",
    location: "Hyderabad",
    title: "Data Scientist",
    description: "Work on large-scale datasets to build ML-driven solutions.",
    positions: "6",
    type: "Full-time",
    package: "30 LPA",
  },
  {
    name: "Netflix",
    location: "Mumbai",
    title: "UI/UX Designer",
    description: "Design modern interfaces and user experiences for web & mobile.",
    positions: "4",
    type: "Contract",
    package: "18 LPA",
  },
  {
    name: "Tesla",
    location: "Pune",
    title: "Machine Learning Engineer",
    description: "Develop autonomous driving AI models and pipelines.",
    positions: "10",
    type: "Full-time",
    package: "35 LPA",
  },
  {
    name: "Adobe",
    location: "Gurgaon",
    title: "Graphics Designer",
    description: "Create digital artwork, marketing banners, and brand assets.",
    positions: "5",
    type: "Part-time",
    package: "12 LPA",
  },
  {
    name: "Infosys",
    location: "Chennai",
    title: "Fullstack Developer",
    description: "Develop scalable enterprise web applications using MERN stack.",
    positions: "15",
    type: "Full-time",
    package: "16 LPA",
  },
  {
    name: "Flipkart",
    location: "Bangalore",
    title: "DevOps Engineer",
    description: "Manage CI/CD pipelines, cloud infra, and production deployments.",
    positions: "7",
    type: "Full-time",
    package: "20 LPA",
  },
];

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