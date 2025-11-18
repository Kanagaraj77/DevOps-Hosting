import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaSearch } from 'react-icons/fa';
import { FaLocationDot, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { IoMdCall, IoMdMail } from "react-icons/io";

import '../css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="footer_container ">
        <div className="footer_top">
          <div className="footer_social_section ">
            <div className="footer_top_left center">
              <p className="footer_top_left_heading">Follow us :</p>
              <ul className="center">
                <li><Link to="https://www.instagram.com/ucasofficial"><FaInstagram /></Link></li>
                <li><Link to="https://www.facebook.com/profile.php?id=100073015881382"><FaFacebookF /></Link></li>
                <li><Link to="https://wa.me/919688888888"><FaWhatsapp /></Link></li>
                <li><Link to="https://www.linkedin.com/in/uit-institutions-2a483322b"><FaLinkedinIn /></Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <div className="footer_bottom_section ">
            <div className="footer_info_box">
              <p className="footer_info_box_heading">Institutional Information <span></span></p>
              <ul>
                <li><Link to="/about" onClick={() => window.scrollTo(0, 0)}>About UCAS</Link></li>
                <li><Link to="">NIRF</Link></li>
                <li><Link to="">IQAC</Link></li>
                <li><Link to="">IIC</Link></li>
                <li><Link to="">AISHE</Link></li>
                <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Contact</Link></li>
              </ul>
            </div>

            <div className="footer_info_box footer_info_box2">
              <p className="footer_info_box_heading">Curricular <span></span></p>
              <ul>
                <li><Link to="">Syllabus</Link></li>
                <li><Link to="">Department Profile</Link></li>
                <li><Link to="">Faculty Profile</Link></li>
                <li><Link to="">Research</Link></li>
              </ul>
            </div>

            <div className="footer_info_box">
              <p className="footer_info_box_heading">Co-Curricular <span></span></p>
              <ul>

                <li><Link to=""> YRC</Link></li>
                <li><Link to=""> NSS</Link></li>
                <li><Link to=""> EDC</Link></li>
                <li><Link to=""> Events</Link></li>
                <li><Link to=""> News Letter</Link></li>
              </ul>
            </div>

            <div className="footer_info_box footer_info_box2">
              <p className="footer_info_box_heading">Students Corner <span></span></p>
              <ul>
                <li><Link to="">Antiragging/Antidrug</Link></li>
                <li><Link to="">Code of Conduct</Link></li>
                <li><Link to="">Academic Calendar</Link></li>
                <li><Link to="">Leave Form</Link></li>
                <li><Link to="">Out Pass</Link></li>
                <li><Link to="">On-Duty</Link></li>

              </ul>
            </div>

            <div className="footer_info_box footer_contact_box">
              <p className="footer_info_box_heading">Contact Us <span></span></p>
              <ul>
                <li>
                  <FaLocationDot />
                  <span>
                    <Link to="https://www.google.com/maps?ll=11.170482,76.922308&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=14305252792174469772" target='_blank'>
                      United College of Arts and Science<br />G.Koundampalayam, Periyanaickenpalayam,<br />Coimbatore - 641020. Tamilnadu, India.
                    </Link>
                  </span>
                </li>
                <li>
                  <IoMdCall />
                  <span>
                    <Link to="tel:+91 96 888 45 555">
                      +91 96 888 45 555 ,
                    </Link>
                    <Link to="tel:+91 96 888 88 888">+91 96 888 88 888
                    </Link>
                  </span>
                </li>
                <li>
                  <IoMdMail />
                  <span><Link to="mailto:infoucas@uit.ac.in">infoucas@uit.ac.in</Link></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_copy_right center">
          <p className="footer_copy_right_text">© 2024 United College of Arts and Science <span className='copy_slash'>|</span> <br /><span className='copy_clr'>
            By <Link to="https://www.infygain.com" href="https://www.infygain.com" className="infygain-link" target="_blank" rel="noopener noreferrer">Infygain Technologies</Link>
          </span></p>

        </div>
      </div>
    </>
  );
};

export default Footer;
