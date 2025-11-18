import React from 'react'
import { FaCheck } from 'react-icons/fa'
import subscribe from "/images/about/subscribe.avif";
import { IoMdMail } from "react-icons/io";

const Subscribe = () => {
  return (
    <div className="split_box_container container">
      {/* Left Side Content and Image */}
      <div className="left_box" data-aos="fade-up" >
        <div className='left_box_content'>
          <p className='left_box_title'>A Journey to Excellence.</p>
          <p className="left_box_description">
            At UCAS, we believe that the path to excellence is a continuous
            journey.
          </p>
          <ul>
            <li> <span className="subs_icon"><FaCheck /></span> &nbsp; Continuous Improvement</li>
            <li> <span className="subs_icon"><FaCheck /></span> &nbsp; Focus on Lifelong Learning</li>
            <li> <span className="subs_icon"><FaCheck /></span> &nbsp; Supportive Learning Environment</li>
          </ul>
        </div>
        <div className='left_box_image'>
          <img src={subscribe} alt="Student" className="student_image" />
        </div>
      </div>

      {/* Right Side Subscribe Box */}
      <div className="right_box" data-aos='fade-up' data-aos-delay="200" >
        <p className='subscribe_title_rightbox'>Committed to educating and nurturing all students</p>
        <p className="subscribe_right_box_description">
          Our commitment to academic achievement, innovation, and personal
          growth sets us apart.
        </p>
        <div className="subscribe_section">
          <input
            type="email"
            placeholder="Email Address"
            className="email_input"
          />
          <button className="subscribe_button"> <IoMdMail /> Send</button>
        </div>
      </div>
    </div>
  )
}

export default Subscribe