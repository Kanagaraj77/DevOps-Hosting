import React from 'react'
import partnerlogo1 from '/images/home/partnerlogo1.avif'
import partnerlogo2 from '/images/home/partnerlogo2.avif'
import partnerlogo3 from '/images/home/partnerlogo3.avif'
import partnerlogo4 from '/images/home/partnerlogo4.avif'
import partnerlogo5 from '/images/home/partnerlogo5.avif'
import partnerlogo6 from '/images/home/partnerlogo6.avif'
import partnerlogo7 from '/images/home/partnerlogo7.avif'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from 'react-router-dom';



const Carousel = () => {
    const options = {
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        animateOut: 'fadeOut',
        smartSpeed: 500,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            600: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    };


    return (
        <>
            <div className="owl_container container mt-5">
                <div className="owl_left_box">
                    <p className='home_news_heading' data-aos="fade-up" >United Educaitonal Institutions <span></span></p>

                    <div className="owl_logo_container" data-aos="fade-up" data-aos-delay="200" >
                        <OwlCarousel className="owl-carousel owl-theme" {...options}>
                            <Link>
                                <div className="owl_logo">
                                    <img src={partnerlogo1} alt='' />
                                </div>
                            </Link>

                            <Link to="https://uit.ac.in" target="_blank">
                                <div className="owl_logo">
                                    <img src={partnerlogo2} alt='' />
                                </div>
                            </Link>

                            <Link to="https://ucp.org.in" target="_blank">
                                <div className="owl_logo">
                                    <img src={partnerlogo3} alt='' />
                                </div>
                            </Link>

                            <Link to="https://ucms.edu.in" target="_blank">
                                <div className="owl_logo">
                                    <img src={partnerlogo4} alt='' />
                                </div>
                            </Link>


                            <Link to="https://ucn.ac.in" target="_blank">
                                <div className="owl_logo">
                                    <img src={partnerlogo5} alt='' />
                                </div>
                            </Link>


                            <Link to="https://ucpt.ac.in" target="_blank">
                                <div className="owl_logo">
                                    <img src={partnerlogo6} alt='' />
                                </div>
                            </Link>


                            <Link to="https://ups.ac.in" target="_blank">
                                <div className="owl_logo">
                                    <img src={partnerlogo7} alt='' />
                                </div>
                            </Link>


                        </OwlCarousel>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Carousel