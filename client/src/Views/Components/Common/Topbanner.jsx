import React from 'react'
import { Link } from 'react-router-dom'
import rte1 from "/images/rte1.png";
import rte_icon from "/images/rte_icon.png";
import "../css/topbanner.css"



const Topbanner = ({ currentPage }) => {
    return (
        <>
            <div className="top_banner_container ">
                <div className="top_banner_content ">
                    <h1 className='top_banner_heading' data-aos="fade-up" >{currentPage}</h1>
                    <ul className="top_banner_nav_box center mt-4" data-aos="fade-up" data-aos-delay="200">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)} > <li>Home</li> </Link>
                        <li>/</li>
                        <li>{currentPage}</li>
                    </ul>
                </div>
                <div className='rte_logo_container' data-aos="zoom-in" data-aos-delay="600">
                    <img className='rte_icon' src={rte1} alt="rte" />
                    <img className='rte_icon_letter' src={rte_icon} alt="rte" />
                </div>

            </div>
        </>
    )
}

export default Topbanner