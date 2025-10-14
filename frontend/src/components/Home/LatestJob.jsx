import React from 'react'
import JobCards from './JobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LatestJob = () => {
  const navigate = useNavigate();
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className="max-w-7xl mx-auto mt-20 px-8">
      <h1 className="text-4xl font-bold">
        <span className="text-red-500">Latest & Top </span> Job Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  my-8">
        {
          allJobs.length > 0 ? allJobs.slice(0, 6).map((job, index) => (
          <JobCards key={index} job={job} />)) : <span>No Job found</span>
        }
      </div>
      <div className='flex justify-end'>
        <button onClick={()=>navigate('/job')} className='py-3 px-4 font-semibold bg-gray-500 text-white rounded-md hover:bg-gray-400'>More {">>"}</button>
      </div>
    </div>
  )
}

export default LatestJob
