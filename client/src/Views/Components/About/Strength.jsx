import React, { useState } from 'react'
import strength_icon1 from '/images/about/strength_icon1.avif';
import strength_icon2 from '/images/about/strength_icon2.avif';
import strength_icon3 from '/images/about/strength_icon3.avif';

import CountUp from 'react-countup';
import ScrollTrigger from "react-scroll-trigger";


const Strength = () => {
    const [counterOn, setCounterOn] = useState();

    return (
        <section className="strength_section">
            <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
            >
                <div className="strength_wrapper container">
                    {/* Left side content */}
                    <div className="strength_content" data-aos="fade-right" >
                        <h3 className="strength_subtitle mini_txt ">Elevating Education at UCAS <span className="heading_underline"></span>  </h3>
                        <h1 className="strength_title main_txt">Strength in Numbers</h1>
                        <p className="strength_description para">
                            The strength of UCAS is reflected in its impressive numbers that showcase its
                            commitment to excellence and student success. These numbers not only highlight UCAS's
                            robust educational environment but also its dedication to preparing students for successful futures.
                        </p>
                        <div className="strength_review">
                            <span className="strength_review_number">  2.4k+</span>
                            <span className="strength_review_para ">Successful Students</span>
                        </div>

                    </div>
                    {/* Right sides column */}
                    <div className="strength_stats" data-aos="fade-left" data-aos-delay="200" >
                        <div className="stat_card">
                            <div className="stat_icon">
                                <img
                                    src={strength_icon1}
                                    alt="About Us"
                                    className="about_right_image"
                                />
                            </div>
                            <div className="stat_content">
                                <span className="stat_number"><CountUp start={counterOn ? 0 : null} end={100} duration={4} />%</span>
                                <span className="stat_label">Placements </span>
                            </div>
                        </div>
                        <div className="stat_card">
                            <div className="stat_icon">
                                <img
                                    src={strength_icon2}
                                    alt="About Us"
                                    className="about_right_image"
                                />
                            </div>
                            <div className="stat_content">
                                <span className="stat_number"><CountUp start={counterOn ? 0 : null} end={17} duration={4} />+</span>
                                <span className="stat_label">Total courses</span>
                            </div>
                        </div>
                        <div className="stat_card">
                            <div className="stat_icon">
                                <img
                                    src={strength_icon3}
                                    alt="About Us"
                                    className="about_right_image"
                                />
                            </div>
                            <div className="stat_content">
                                <span className="stat_number"><CountUp start={counterOn ? 0 : null} end={500} duration={4} />+</span>
                                <span className="stat_label">Successful students</span>
                            </div>
                        </div>

                    </div>
                </div>
            </ScrollTrigger>
        </section>
    )
}

export default Strength