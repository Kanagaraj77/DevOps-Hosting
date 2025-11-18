import "../css/fixedicons.css";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaRupeeSign, FaLinkedinIn } from "react-icons/fa";

const FixedIcons = () => {
  return (
    <main className="fixedicons_container">
      <div className="fixedicons_component">
        <div className="fixedicons_line">
          <button className="fixedicons_common fixedicons_phone">
            <Link to="tel:+919688888888">
              <BsFillTelephoneFill />
            </Link>
          </button>
          <button className="fixedicons_common fixedicons_mail">
            <Link to="mailto:infoucas@uit.ac.in">
              <IoMail />
            </Link>
          </button>
          <button className="fixedicons_common fixedicons_instagram">
            <Link to="https://www.instagram.com/ucasofficial">
              <RiInstagramFill />
            </Link>
          </button>
          <button className="fixedicons_common fixedicons_facebook">
            <Link to="https://www.facebook.com/profile.php?id=100073015881382">
              <FaFacebookF />
            </Link>
          </button>
          <button className="fixedicons_common fixedicons_whatsapp">
            <Link to="https://wa.me/919688888888">
              <IoLogoWhatsapp />
            </Link>
          </button>
          {/* <button className="fixedicons_common fixedicons_rupee">
            <Link to="https://grayquest.com/institute/united-arts">
              <FaRupeeSign />
            </Link>
          </button> */}
          <button className="fixedicons_common fixedicons_rupee">
            <Link to="https://www.linkedin.com/in/uit-institutions-2a483322b">
              <FaLinkedinIn />
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default FixedIcons;