import React from 'react'
import './Components/css/career.css'
import Careermain from './Components/Career/Careermain'
import Card from './Components/Career/Card'
import Careerform from './Components/Career/Careerform'
import Topbanner from './Components/Common/Topbanner'

const Career = () => {
  return (
    <>
      <Topbanner currentPage="Career" />
      <Careermain />
      <Card />
      <Careerform />
    </>
  )
}

export default Career