import React from 'react'
import Navbar from './components/shared/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import Job from './pages/Job'
import Browse from './pages/Browse'
import Profile from './components/shared/Profile'
import JobDecription from './components/Job/JobDecription'
import Companies from './components/Admin/Companies'
import CompanyCreate from './components/Admin/CompanyCreate'
import CompanySetup from './components/Admin/CompanySetup'
import AdminJobs from './components/Admin/AdminJobs'
import PostJob from './components/Admin/PostJob'
import Applicants from './components/Admin/Applicants'

const App = () => {
  return (
    <>
      <Navbar/>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        {/* for user  */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/job' element={<Job/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/description/:id' element={<JobDecription/>}/>

        {/* for admin  */}
        <Route path='/admin/companies' element={<Companies/>}/>
        <Route path='/admin/companies/create' element={<CompanyCreate/>}/>
        <Route path='/admin/companies/:id' element={<CompanySetup/>}/>
        <Route path='/admin/jobs' element={<AdminJobs/>}/>
        <Route path='/admin/jobs/create' element={<PostJob/>}/>
        <Route path='/admin/jobs/:id/applicants' element={<Applicants/>}/>

      </Routes>
    </>
  )
}

export default App