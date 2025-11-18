import React from 'react'
import Aboutus from './Components/About/Aboutus'
import './Components/css/about.css'
import Strength from './Components/About/Strength'
import Subscribe from './Components/About/Subscribe'
import Topbanner from './Components/Common/Topbanner'

const About = () => {
  return (
    <>
      <Topbanner currentPage="About Us" />
      <Aboutus />
      <Strength />
      <Subscribe />
    </>
  )
}

export default About