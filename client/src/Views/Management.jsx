import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import Management1 from "/images/management/Management1.avif";
import Management2 from "/images/management/Management2.avif";
import Management3 from "/images/management/Management3.avif";
import Management4 from "/images/management/Management4.avif";
import Topbanner from "./Components/Common/Topbanner";
import Staff from "./Staff";

const Management = () => {
  const location = useLocation();
  const [topOffset, setTopOffset] = useState(
    window.innerWidth < 1150 ? 550 : 100
  );

  useEffect(() => {
    const handleResize = () => {
      // Update topOffset based on the screen width
      setTopOffset(window.innerWidth < 800 ? 500 : 200);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const windowHeight = window.innerHeight;
        const elementHeight = targetElement.offsetHeight;
        const scrollToPosition =
          offsetTop - (windowHeight - elementHeight) / 2 - topOffset;

        window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      }
    }
  }, [location, topOffset]);

  return (
    <>
      <Topbanner currentPage="Management Team" />

      <div
        className="management_container container mt-5"
        id="Founder-and-Chairman"
      >
        <div className="management_card">
          {/* Left Section: Image and Quote */}
          <div className="management_left" data-aos="fade-right">
            <img src={Management1} alt="Vision" className="management_image" />

            <blockquote className="management_quote">
              <FaQuoteLeft />
              <p>
                Guided by vision, driven by purpose, Shaping a future of endless
                possibilities.
              </p>
            </blockquote>
          </div>

          {/* Right Section: Content */}
          <div
            className="management_right"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h2 className="management_name">Mr.S.Shanmugam</h2>
            <p className="management_title">Founder and Chairman</p>
            <p className="management_description">
              Shanmugam Subramaniam has founded UIT with a vision to produce the
              finest engineers of tomorrow. Shanmugam Subramaniam is considered
              to be a pioneer in IT education in Coimbatore. He has successfully
              trained more than 12000 students of leading engineering colleges
              in C/C++/Java and laid a strong foundation for them to be
              successful engineers in the IT industry.
            </p>
            <p className="management_description">
              He is committed to the task of delivering quality education with a
              sense of devotion and dedication. He obtained his Bachelor of
              Engineering Degree from Government College of Technology, he went
              on to work as a lecturer in his alma mater itself. Established
              United Infotech Computer Education in 1999 for offering valued
              added IT education to engineering students to impart the much
              required computer programming skills. Worked as lecturer in
              Government College of Technology, Coimbatore.
            </p>
            <p className="management_description">
              Founder & Executive Director of Reliance Matriculation Higher
              Secondary School. Founder of Bhavani Polytechnic College in
              Bhavani.Hailing from rural background, he has founded UIT along
              with Mahalingam Ramasamy with a vision to transform students from
              rural and backward areas to finest engineers of tomorrow. He has
              initiated several additional courses into the mainstream of
              learning, which helps our students to face the competitive
              world.As Chairman of UIT he sets the vision for the institute and
              drives Team UIT towards achieving it. He continues to teach/mentor
              our students.
            </p>
          </div>
        </div>
      </div>
      <div
        className="management_container alt_management_container container"
        id="Managing-Trustee"
      >
        <div className="management_card">
          <div className="management_right" data-aos="fade-right">
            <h2 className="management_name">Dr.CA.M.Kailash Kumar</h2>
            <p className="management_title">Managing Trustee</p>
            <p className="management_description">
              He did his under graduation in Bachelor of Commerce. He has
              completed his CA in the institute of Chartered Accountant of India
              in 1993-1996. He was awarded doctorate in the university of
              Arizona Tucson USA and Diandra University and academy. He is a
              fellow member in the Institute of Chartered Accountants of India.
              He has presented papers and conducted several seminars in Tax
              Management and Planning.
            </p>
            <p className="management_description">
              He is a founder chairman of Kalp services, K farms, K electric
              zone India Private Limited. He is the audit partner of M/s
              Meethalal Jain & Co, Coimbatore. He runs MMJD charitable trust.
            </p>
            <p className="management_description">
              He received Excellency award for Education and social service from
              Governor of Tamilnadu Shri Rosaiah for adopting villages and
              improving sanitation in Tholampalayam village.
            </p>
            <p className="management_description">
              He received Paul Harris fellow award from rotary foundation,
              exemplary award from rotary foundation and community services.
            </p>
            <p className="management_description">
              He also received united writers award from deputy Governor of RBI
              for his contribution to Government audits and paper presentation
              on RBI policies.
            </p>
          </div>
          <div
            className="management_left"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img src={Management2} alt="Vision" className="management_image" />

            <blockquote className="management_quote">
              <FaQuoteLeft />
              <p>
                Guiding with integrity and a passion for excellence, Our
                Managing Trustee shapes a legacy of success.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="management_container container" id="Co-Chairman">
        <div className="management_card">
          <div className="management_left" data-aos="fade-right">
            <img src={Management3} alt="Vision" className="management_image" />

            <blockquote className="management_quote">
              <FaQuoteLeft />
              <p>
                With dynamic vision and steadfast commitment, Our Co-Chairman
                leads the way to new horizons.
              </p>
            </blockquote>
          </div>
          <div
            className="management_right"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h2 className="management_name">Mrs.Mythili.S</h2>
            <p className="management_title">Co-Chairman</p>
            <p className="management_description">
              She has more than 8 years of academic experience. She is committed
              to the task of delivering quality education with a sense of
              devotion and dedication.
            </p>
            <p className="management_description">
              Published more than 10 papers in National and International
              conferences. Member of ISRE, CSI professional bodies. She has
              guided many Post Graduate scholars for their successful completion
              of projects.
            </p>
            <p className="management_description">
              Founder of Bhavani Polytechnic College in Bhavani.
            </p>
            <p className="management_description">
              She obtained her Bachelor Degree from SSN college of Engineering.
              She obtained her Master Degree from Amrita University.
            </p>
          </div>
        </div>
      </div>
      <div className="management_container alt_management_container container mb-5">
        <div className="management_card">
          <div className="management_right" data-aos="fade-right">
            <h2 className="management_name">Mrs.Trishala Kumari</h2>
            <p className="management_title">Joint Managing Trustee</p>
            <p className="management_description">
              Rtn M D Trishla Kailash graduated from Home Science College
              Bangalore.
            </p>
            <p className="management_description">
              She is the president of Rotary club of Coimbatore Elite. She is a
              director in Dhanesh capital services and in Meeta Realtors Private
              Limited. She is a cofounder of Karsen Technologies limited, a make
              in india initiative which deals with home automation under the
              name of Smitch.
            </p>
            <p className="management_description">
              She is associated with Shree Bhagwan Mahaveer Gaushala which is a
              home for more than 100 cattle's. She is a trustee in MMJD trust
              which owns a Dharamsala at Palitana.
            </p>
            <p className="management_description">
              She runs a sports training academy for young kids in the name of k
              sports.
            </p>
          </div>
          <div
            className="management_left"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img src={Management4} alt="Vision" className="management_image" />

            <blockquote className="management_quote">
              <FaQuoteLeft />
              <p>
                Fostering growth with dedication and insight, Our Joint Managing
                Trustee drives progress with purpose.
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      <Staff />
    </>
  );
};

export default Management;
