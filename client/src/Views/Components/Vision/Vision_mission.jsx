import React from 'react'
import vision from "/images/vision/vision.avif";
import mission from "/images/vision/mission.avif";
import objective from "/images/vision/objective.avif";
import arrow_vision from "/images/vision/arrow_vision.avif";

const Vision_mission = () => {
  return (
    <>
      <div className='vision_mission_section'>
      <div className="vision_mission_container container ">
        <div
          className="vision_image_section"
          data-aos="fade-right"
        >
          <img src={vision} alt="Vision" className="vision_image" />
        </div>
        <div
          className="vision_content_section"
        >
          <img src={arrow_vision} alt="Vision Arrow" className="vision_arrow" />
          <h2 className="vision_title" data-aos="fade-left" >Vision  </h2>
          <div className="vision_title_underlines" data-aos="fade-left" ></div>
          <p className="vision_text" data-aos="fade-left" >
            Our mission at UCAS College is to provide transformative education that
            equips students with knowledge, skills, and ethical values to thrive in a
            dynamic world. We are committed to nurturing your future by fostering
            innovation, inclusivity, and excellence. Through industry-relevant
            learning and global opportunities, we empower students to achieve their
            dreams and make a meaningful impact.
          </p>
        </div>
      </div>
      <div className="vision_mission_container alt_vision_mission_container container">
        <div
          className="vision_content_section"
          data-aos="fade-right"
        >
          <div className="vision_arrow">
            <img src={arrow_vision} alt="Mission Arrow" className="vision_arrow alt_vision_arrow" />
          </div>
          <h2 className="vision_title" data-aos="fade-right" >Mission</h2>
          <div className="vision_title_underlines" data-aos="fade-right" ></div>
          <p className="vision_text" data-aos="fade-right" >
            At UCAS College, our mission is to help you grow and succeed by offering
            practical education that prepares you for real-world challenges. We’re
            here to support your journey with innovative learning, a welcoming
            environment, and opportunities that bring your dreams to life. Together,
            we’ll build a future you’re proud of!
          </p>
        </div>
        <div
          className="vision_image_section"
          data-aos="fade-left"
        >
          <img src={mission} alt="Mission" className="vision_image" />
        </div>
      </div>
      <div className="vision_mission_container container ">
        <div
          className="vision_image_section"
          data-aos="fade-right"
        >
          <img src={objective} alt="Objective" className="vision_image" />
        </div>
        <div
          className="vision_content_section"
          data-aos="fade-left"
        >
          <h2 className="vision_title" data-aos="fade-left" >Quality Objectives</h2>
          <div className="vision_title_underlines" data-aos="fade-left" ></div>
          <p className="vision_text" data-aos="fade-left" >
            Our objective at UCAS College is to provide practical, industry-focused
            education that helps students achieve their goals. We aim to nurture
            creativity, encourage innovation, and create a supportive, inclusive
            environment. By focusing on real-world skills and opportunities, we
            empower students to build a bright and successful future.
          </p>
        </div>
      </div>
      </div>

    </>
  )
}

export default Vision_mission