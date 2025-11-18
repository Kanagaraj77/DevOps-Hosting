import React from 'react'
import Vision_mission from './Components/Vision/Vision_mission'
import './Components/css/about.css'
import Topbanner from './Components/Common/Topbanner'

const Vision = () => {
  return (
    <>
      <Topbanner currentPage="Vision, Mission & Objectives" />
      <Vision_mission />
    </>
  )
}

export default Vision