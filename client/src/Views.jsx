import React, { useEffect, useState } from 'react'
import Home from './Views/Home'
import Header from './Views/Components/Common/Header'
import Infrastructure from './Views/Infrastructure'
import About from './Views/About'
import Gallery from './Views/Gallery'
import Contact from './Views/Contact'
import './Views/Components/css/common.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './Views/Components/Common/Footer'
import Principal from './Views/Principal'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Vision from './Views/Vision'
import Management from './Views/Management'
import Blog from './Views/Components/Blog/Blog'
import Blogdetails from './Views/Components/Blog/Blogdetails'
import FixedIcons from './Views/Components/Common/FixedIcons'
import Error from './Views/Components/Common/404error'
import Career from './Views/Career'
import CareerDetail from './Views/Components/Career/CareerDetail'
import Program from './Views/Program'
import CourseDetails from './Views/CourseDetails'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Views = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [faculty, setFaculty] = useState(false)

  return (
    <>
      <ToastContainer />
      <Header setFaculty={setFaculty} />
      <div className="margin_correction"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/management" element={<Management />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<Blog />} />
        <Route path="/event" element={<Blog />} />
        <Route path="/highlight" element={<Blog />} />
        <Route path="/news/:id" element={<Blogdetails />} />
        <Route path="/event/:id" element={<Blogdetails />} />
        <Route path="/highlight/:id" element={<Blogdetails />} />
        <Route path="/program" element={<Program />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course/:id/:name" element={<CourseDetails faculty={faculty} />} />
        <Route path="/*" element={<Error />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/:id" element={<CareerDetail />} />
      </Routes>
      <FixedIcons />
      <Footer />


    </>
  )
}

export default Views