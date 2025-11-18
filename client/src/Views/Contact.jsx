import React from 'react'
import './Components/css/contact.css'
import Info from './Components/Contact/Info'
import Topbanner from './Components/Common/Topbanner'

const Contact = () => {
  return (
    <>
      <Topbanner currentPage="Contact Us" />
      <Info />
    </>
  )
}

export default Contact