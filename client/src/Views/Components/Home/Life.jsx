import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modal } from "antd";
import Applyform from "../Common/Applyform";

const Life = () => {
  const [email, setEmail] = useState('');

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email Submitted:", email);
  };

  return (
    <div className='container mt-5'>

      <div className="life-content">
        <div className="life-column" data-aos="fade-up" >
          <h2>Academic Life & Research <span></span></h2>
          <ul>
            <li><Link to=''>Programs and Areas</Link></li>
            <li><Link to=''>Research</Link></li>
            <li><Link to=''>Graduate & Postdoctoral Programs</Link></li>
            <li><Link to=''>Continuing Studies</Link></li>
            <li><Link to=''>International Activities</Link></li>
            <li><Link to=''>Course Calendars & Listings</Link></li>
          </ul>
        </div>

        <div className="life-column" data-aos="fade-up" data-aos-delay="200">
          <h2>Campus Life  <span></span></h2>
          <ul>
            <li><Link to='/infrastructure#1'>Smart Class Room</Link></li>
            <li><Link to='/infrastructure#2'>Seminar Hall</Link></li>
            <li><Link to='/infrastructure#3'>Library</Link></li>
            <li><Link to='/infrastructure#4'>Play Ground</Link></li>
            <li><Link to='/infrastructure#5'>Cultural</Link></li>
            <li><Link to='/infrastructure#6'>Health Centre</Link></li>
          </ul>
        </div>

        <div className="life-column" data-aos="fade-up" data-aos-delay="400">
          <h2>Apply Now  <span></span></h2>
          <div className="owl_right_box">
            <div className="owl_right_box_content">

              <p>Enroll for future of
                Possibilities!</p>
              <div className="log_arrow_box center">
              <div className="log_arrow_box center" onClick={() => setOpen(true)}>
              <FaArrowRight />
              </div>
              <Modal
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={800}
                className="applyform_modal_main"
                footer={null} 
              >
                <Applyform setOpen={setOpen} />
              </Modal>
            </div>
            </div>
          </div>

          <p className='life_apply_txt mt-4'>Unlock your future with UCAS, where quality education meets innovation. Join a community that nurtures your ambitions and prepares you for success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Life;
