import React from 'react'
import './Components/css/about.css'
import light_star from '/images/light_star.avif';
import dark_star from '/images/dark_star.avif';
import principal from '/images/principal/principal.avif';
import principal_icon from '/images/principal/principal_icon.avif';
import principal_name from '/images/principal/principal_name.avif';
import Topbanner from './Components/Common/Topbanner';

const Principal = () => {
  return (
    <>
      <Topbanner currentPage="principal" />
      <div className="principal_section container  mb-5">
        <img src={dark_star} alt='' className='dark_star' />

        <div className="principal_container" data-aos="fade-right">
          <div className="principal_image_container">
            <img src={principal} alt="principal" className='principal_img' />
            <img src={principal_name} alt="principal" className='principal_name' />
            <img src={principal_icon} alt="principal" className='principal_icon' />
          </div>
          <div className="principal_message_container" data-aos="fade-left" data-aos-delay="200" >
            <h2 className="principal_heading mb-4">Principal's Message</h2>
            <p className="principal_description">
              Dr. A. Vijaya, she is an academician for the past two decades with Mastership Academic
              Skills and Effective Administrative Skills. She completed her Under Graduation in B.Sc
              Computer Science from NKR Government Arts College for Women, Namakkal, in the year 2002
              and completed M.Sc Computer Science from Vivekananda College of Arts and Sciences for
              Women, Tiruchengode, in the year 2004. She completed a Master of Philosophy in the year
              2008 and completed Doctorate Ph.D. in Computer Science in the year 2022 from Bharathiar
              University. After her Post-graduation, she started her teaching profession as Lecturer
              and currently, she is heading the institution as Principal. She is also Regional
              Coordinator for Spoken Tutorial, IIT Mumbai and Regional Knowledge Expert for Public
              Finance Management System (PFMS), Ministry of Finance, New Delhi. She is a Senior
              Member in Bharathiar University. She is also an expert in the fields of Outcome-Based
              Education, Quality Assessment as ISO certified Quality Auditor, and Sustainability
              Parameters towards Quality Education.
            </p>
          </div>
        </div>
        <div className="welcome_message" data-aos="fade-up">
          <img src={light_star} alt='' className='light_star' />
          <h3 className="welcome_heading">Welcome to United College of Arts and Science - A vibrant value-based education environment</h3>
          <p className="welcome_text">
            On behalf of the faculty, staff, and students of United College of Arts and Science, I extend a sincere welcome to our institution virtually. Our Institution serves as a
            gateway to the exceptional academic and personal growth opportunities that shapes the future generation.
          </p>
          <p className="welcome_text">
            United College of Arts and Science is committed to academic excellence. We offer a rigorous value-based curriculum, taught by distinguished and dedicated educators,
            that fosters intellectual curiosity, critical thinking and a lifelong learning. Our diverse range of programmes equips students with the knowledge and skills necessary
            to succeed in a dynamic and interconnected world.
          </p>
          <p className="welcome_text">

            Beyond academics, we cultivate a vibrant and supportive campus environment. A rich array of co-curricular activities, leadership programmes and student support
            services in terms of personal growth, social engagement and a strong sense of community. We believe in empowering students to become well-rounded individuals with
            the intellectual foundation and personal resilience to thrive not only in their academic pursuits but also as future leaders and engaged responsible citizens.
          </p>
          <p className='option_text'><span>Find for Options Not for Reasons - </span>  Definitely will reach more heights with higher order thinking and Problem solving at our Campus.</p>
          <div className="option_text option_text2">
            <span >NURTURE YOUR FUTURE AT UCAS </span> <br />
            Dr. A.Vijaya   <br />
            Principal.
          </div>
        </div>


      </div>
    </>
  )
}

export default Principal