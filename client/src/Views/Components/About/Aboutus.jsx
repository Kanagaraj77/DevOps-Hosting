import React from 'react';
import about_us_img1 from '/images/about/about_us_img1.avif';
import about_right_icon from '/images/about/about_right_icon.avif';
import about_arrow from '/images/about/about_arrow.avif';
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Aboutus = () => {
    return (
        <section className="about_us container">
            <div className="content_container">
                {/* Left Section */}
                <div className="about_left" data-aos="fade-right">
                    <img
                        src={about_arrow}
                        alt="Arrow Illustration"
                        className="about_arrow"
                    />
                    <h3 className="about_subtitle mini_txt">
                        About Us <span className="heading_underline"></span>
                    </h3>
                    <h2 className="about_title main_txt">
                        Education in continuing a&nbsp;proud tradition.
                    </h2>
                    <p className="about_description para">
                        UCAS provides a wide range of courses that help students gain real-world skills. The college focuses on both academic excellence and personal growth, encouraging students to take part in extracurricular activities and community service.
                    </p>
                    <ul className="about_list">
                        <li>
                            <span className="abt-list_icon"><FaCheck /></span>
                            <span className="about_list_span">Innovative Curriculum</span>
                        </li>
                        <li>
                            <span className="abt-list_icon"><FaCheck /></span>
                            <span className="about_list_span">Strong Industry Connections</span>
                        </li>
                        <li>
                            <span className="abt-list_icon"><FaCheck /></span>
                            <span className="about_list_span">Experienced Faculty</span>
                        </li>
                        <li>
                            <span className="abt-list_icon"><FaCheck /></span>
                            <span className="about_list_span">Student-Centered Approach</span>
                        </li>
                        <li>
                            <span className="abt-list_icon"><FaCheck /></span>
                            <span className="about_list_span">Great Exposure</span>
                        </li>
                        <li>
                            <span className="abt-list_icon"><FaCheck /></span>
                            <span className="about_list_span">Personalized Learning</span>
                        </li>
                    </ul>
                    <div className="about_btn center">
                        <Link to='/contact' onClick={() => window.scrollTo(0, 0)}>
                            <button className="reach_us_btn"  >Reach us</button>
                        </Link>
                    </div>
                </div>

                {/* Right Section */}
                <div className="about_right" data-aos="fade-left" data-aos-delay="200">
                    <div className="about_right_imgbox">
                        <img
                            src={about_us_img1}
                            alt="About Us"
                            className="about_right_image"
                        />
                        <div className="about_right_icon_box">
                            <img
                                src={about_right_icon}
                                alt="Icon"
                                className="about_right_icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Aboutus;
