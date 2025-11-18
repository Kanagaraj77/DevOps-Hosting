import React from 'react';
import career from '/images/career.avif';

const CareerMain = () => {
  return (
    <>
      <div className="career_main_container">
        <div className="career_main_header" data-aos="fade-up" >
          <h4>CAREER</h4>
          <h1>Shape Your Future at UCAS College !</h1>
          <p>
            Empower your journey with UCAS College—where education meets opportunity!
          </p>
        </div>
        <div className="career_main_content">
          <div className="career_main_image_section" data-aos="fade-right" >
            <img src={career} alt="Career" title="Career" />
          </div>
          <div className="career_main_text" data-aos="fade-left" data-aos-delay="200" >
            <p>
              At UCAS College, our greatest strength lies in our dynamic and inclusive team of
              educators, innovators, and support staff, all dedicated to shaping the future of
              education and empowering students to achieve their dreams.
            </p>
            <p>
              Joining us means
              contributing to impactful work that nurtures young minds and prepares future
              leaders while benefiting from professional growth through training, workshops,
              and career advancement opportunities. We foster a collaborative environment
              that values diversity, teamwork and a positive work-life balance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerMain;
