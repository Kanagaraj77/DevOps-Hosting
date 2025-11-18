import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from 'antd';
import "../css/header.css";
import { GoMail } from "react-icons/go";
import { IoIosMenu, IoMdCall } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import ucas_logo from "/images/ucas_logo.png";
import useFetchData from "../../../Admin/hooks/useFetchData";
import Applyform from "./Applyform";
import config from "../../../config";
import _ from "lodash";

const Header = ({setFaculty}) => {
  // modal 
  const [open, setOpen] = useState(false);

  const [visibleMenu, setVisibleMenu] = useState("");
  const [visibleNestedMenu, setVisibleNestedMenu] = useState("");
  const [visibleSubNestedMenu, setVisibleSubNestedMenu] = useState("");
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

  const url = `${config?.apiUrl}/department`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(course);

  const undergraduateCourses = course.filter(item => item.category === "Undergraduate");
  const postgraduateCourses = course.filter(item => item.category === "Postgraduate");
  const research = course.filter(item => item.category === "Research");

  const handleSubmenuClick = (path) => {
    navigate(path);
    setVisibleMenu("");
    setVisibleNestedMenu("");
    setVisibleSubNestedMenu("");

    if (mobileNavRef.current) {
      mobileNavRef.current.style.display = "none";
    }

    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = (menu) => {
    setVisibleMenu((prev) => (prev === menu ? "" : menu));
    setVisibleNestedMenu("");
    setVisibleSubNestedMenu("");
  };

  const toggleNestedMenu = (nestedMenu) => {
    setVisibleNestedMenu((prev) => (prev === nestedMenu ? "" : nestedMenu));
    setVisibleSubNestedMenu("");
  };

  const toggleSubNestedMenu = (subNestedMenu) => {
    setVisibleSubNestedMenu((prev) =>
      prev === subNestedMenu ? "" : subNestedMenu
    );
  };

  const { data } = useFetchData("announcement");

  // mobile menu

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleMobileMenu, setVisibleMobileMenu] = useState("");
  const mobileNavRef = useRef(null);
  const toggleMobilenavMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileMenu = (menuName) => {
    setVisibleMobileMenu(visibleMobileMenu === menuName ? "" : menuName);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setVisibleMobileMenu("");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmobilemenuClick = (path) => {
    if (mobileNavRef.current) {
      mobileNavRef.current.style.display = "none";
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    <header className="header">
      {/* Top Header */}
      <div className="header_top">
        <Link to={data?.[0]?.url} className="header_slider_link">
          {data?.[0]?.status && (
            <p className="header_slider">{data?.[0]?.content}</p>
          )}
        </Link>
        <div className="header_contact">
          <Link to="mailto:infoucas@uit.ac.in" className="header_email">
            <GoMail /> &nbsp; infoucas@uit.ac.in
          </Link>
          <span className="header_separator">|</span>
          <Link to="tel:9688888888" className="header_phone">
            <IoMdCall /> &nbsp; 96888 88888
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="header_main">
        <div className="header_logo">
          <Link to="/" onClick={scrollToTop} >
            <img src={ucas_logo} alt="uit-logo" />
          </Link>
        </div>
        <div className="header_title">
          <h1>United College of Arts and Science</h1>
          <p> Affiliated To Bharathiar University</p>
        </div>
        <div className="header_buttons">
          <div className="header_modal_button">
            <button className="button_apply desktop_button_apply" onClick={() => setOpen(true)}>Apply Now</button>

            <Modal
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={800}
              className="applyform_modal"
              footer={null}
            >
              <Applyform setOpen={setOpen} className="applyform_modal_main" />
            </Modal>
          </div>


          {/* <Link to="https://grayquest.com/institute/united-arts" target="_blank">
            <button className="button_pay desk_button_pay">Pay Now</button>
          </Link> */}
          <Link to='/admin'>
            <div className="header_user_icon">
              <FaRegCircleUser />
            </div>
          </Link>

          <div className="header_nav_box" onClick={toggleMobilenavMenu}>
            <IoIosMenu />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="header_nav desktop_header_nav">
        <ul className="nav_list">
          {/* Home */}
          <li onClick={() => handleSubmenuClick("/")}>Home</li>
          {/* About Us */}
          <li
            className="nav_item"
            onMouseEnter={() => toggleMenu("about")}
            onMouseLeave={() => setVisibleMenu("")}
          >
            <span>
              About Us &nbsp;
              <RiArrowDownSLine />
            </span>
            {visibleMenu === "about" && (
              <ul className="submenu">
                <li onClick={() => handleSubmenuClick("/about")}>
                  About College
                </li>
                <li onClick={() => handleSubmenuClick("/vision")}> Vision, Mission & Objectives</li>
                <li onClick={() => handleSubmenuClick("/management")}>
                  Management
                </li>
                <li onClick={() => handleSubmenuClick("/principal")}>
                  Principal
                </li>
              </ul>
            )}
          </li>

          {/* Academic */}
          <li
            className="nav_item"
            onMouseEnter={() => toggleMenu("academic")}
            onMouseLeave={() => setVisibleMenu("")}
          >
            <span>
              Academic &nbsp;
              <RiArrowDownSLine />
            </span>
            {visibleMenu === "academic" && (
              <ul className="submenu">
                {/* Courses */}
                <li
                  onMouseEnter={() => toggleNestedMenu("courses")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                >
                  Courses &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "courses" && (
                    <ul className="submenu_nested">
                      {/* Undergraduate Programs */}
                      <li
                        onMouseEnter={() => toggleSubNestedMenu("undergraduate")}
                        onMouseLeave={() => setVisibleSubNestedMenu("")} >
                        Undergraduate Programs &nbsp;
                        <RiArrowDownSLine />
                        {visibleSubNestedMenu === "undergraduate" && (
                          <ul className="submenu_subnested submenu_subnested_scroll">
                            {undergraduateCourses.map((item) => (
                              <li key={item._id} onClick={() => {
                                handleSubmenuClick(`/course/${item._id}/${_.replace(item.name, /\s+/g, "_")}`)
                                setFaculty(false)
                              }}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>

                      {/* Postgraduate Programs */}
                      <li
                        onMouseEnter={() => toggleSubNestedMenu("postgraduate")}
                        onMouseLeave={() => setVisibleSubNestedMenu("")} >
                        Postgraduate Programs &nbsp;
                        <RiArrowDownSLine />
                        {visibleSubNestedMenu === "postgraduate" && (
                          <ul className="submenu_subnested submenu_subnested_scroll">
                            {postgraduateCourses.map((item) => (
                              <li key={item._id} onClick={() => {
                                handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                setFaculty(false)
                              }}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>

                      {/* Research Programs */}
                      <li
                        onMouseEnter={() => toggleSubNestedMenu("research")}
                        onMouseLeave={() => setVisibleSubNestedMenu("")} >
                        Research Programs &nbsp;
                        <RiArrowDownSLine />
                        {visibleSubNestedMenu === "research" && (
                          <ul className="submenu_subnested submenu_subnested_scroll">
                            {research.map((item) => (
                              <li key={item._id} onClick={() => {
                                handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                setFaculty(false)
                              }}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>
                {/* faqulty */}
                <li
                  onMouseEnter={() => toggleNestedMenu("faculty")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                >
                  Faculty &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "faculty" && (
                    <ul className="submenu_nested">
                      {/* Undergraduate Programs */}
                      <li
                        onMouseEnter={() => toggleSubNestedMenu("undergraduate")}
                        onMouseLeave={() => setVisibleSubNestedMenu("")} >
                        Undergraduate Programs &nbsp;
                        <RiArrowDownSLine />
                        {visibleSubNestedMenu === "undergraduate" && (
                          <ul className="submenu_subnested submenu_subnested_scroll">
                            {undergraduateCourses.map((item) => (
                              <li key={item._id} onClick={() => {
                                handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                setFaculty(true)
                              }}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>

                      {/* Postgraduate Programs */}
                      <li
                        onMouseEnter={() => toggleSubNestedMenu("postgraduate")}
                        onMouseLeave={() => setVisibleSubNestedMenu("")} >
                        Postgraduate Programs &nbsp;
                        <RiArrowDownSLine />
                        {visibleSubNestedMenu === "postgraduate" && (
                          <ul className="submenu_subnested submenu_subnested_scroll">
                            {postgraduateCourses.map((item) => (
                              <li key={item._id} onClick={() => {
                                handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                setFaculty(true)
                              }}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>

                      {/* Research Programs */}
                      <li
                        onMouseEnter={() => toggleSubNestedMenu("research")}
                        onMouseLeave={() => setVisibleSubNestedMenu("")} >
                        Research Programs &nbsp;
                        <RiArrowDownSLine />
                        {visibleSubNestedMenu === "research" && (
                          <ul className="submenu_subnested submenu_subnested_scroll">
                            {research.map((item) => (
                              <li key={item._id} onClick={() => {
                                handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                setFaculty(true)
                              }}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          {/* student-centric */}
          <li
            className="nav_item"
            onMouseEnter={() => toggleMenu("student-centric")}
            onMouseLeave={() => setVisibleMenu("")}
          >
            <span>
              Student Centric &nbsp;
              <RiArrowDownSLine />
            </span>

            {visibleMenu === "student-centric" && (
              <ul className="submenu">
                {/* NSS */}
                <li onClick={() => handleSubmenuClick("/NSS")}>NSS</li>

                {/* YRC */}
                <li onClick={() => handleSubmenuClick("/YRC")}>YRC</li>

                {/* Women Empowerment Cell */}
                <li onClick={() => handleSubmenuClick("/women-empowerment-cell")}>Women Empowerment Cell</li>

                {/* CGC */}
                <li onClick={() => handleSubmenuClick("/CGC")}>CGC</li>

                {/* SEC */}
                <li onClick={() => handleSubmenuClick("/SEC")}>SEC</li>

                {/* Muthamizh Mandram */}
                <li onClick={() => handleSubmenuClick("/muthamizh-mandram")}>Muthamizh Mandram</li>

                {/* Value Added Courses */}
                <li
                  onMouseEnter={() => toggleNestedMenu("value-added-courses")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  Value Added Courses &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "value-added-courses" && (
                    <ul className="submenu_nested">

                      <li onClick={() => handleSubmenuClick("/campus-amenities-1")}>Tally</li>
                      <li onClick={() => handleSubmenuClick("/campus-amenities-2")}>Fashion Designing</li>
                      <li onClick={() => handleSubmenuClick("/campus-amenities-3")}>Beauty Therapy</li>
                      <li onClick={() => handleSubmenuClick("/campus-amenities-4")}>Music / Photography</li>

                    </ul>
                  )}
                </li>

                {/* Management Scholarship */}
                <li
                  onMouseEnter={() =>
                    toggleNestedMenu("management-scholarship")
                  }
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  Management Scholarship &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "management-scholarship" && (
                    <ul className="submenu_nested">
                      <li
                        onClick={() => handleSubmenuClick("/single-parent-scholarship")}
                      >
                        Single Parent Scholarship
                      </li>
                      <li
                        onClick={() => handleSubmenuClick("/merit-scholarship")}
                      >
                        Merit Scholarship
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/first-graduate-scholarship")
                        }
                      >
                        First Graduate Scholarship
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/reference-scholarship")
                        }
                      >
                        Reference Scholarship
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/sports-scholarship")
                        }
                      >
                        Sports Scholarship
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/sibling-scholarship")
                        }
                      >
                       Sibling Scholarship
                      </li>
                     
                    </ul>
                  )}
                </li>

                {/* Government Scholarship */}
                <li
                  onMouseEnter={() =>
                    toggleNestedMenu("government-scholarship")
                  }
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  Government Scholarship &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "government-scholarship" && (
                    <ul className="submenu_nested">
                      <li
                        onClick={() => handleSubmenuClick("/sc-scholarship")}
                      >
                        SC Scholarship
                      </li>
                      <li
                        onClick={() => handleSubmenuClick("/st-scholarship")}
                      >
                        ST Scholarship
                      </li>

                      <li
                        onClick={() => handleSubmenuClick("/Pudhumai Penn")}
                      >
                        Pudhumai Penn
                      </li>

                      <li
                        onClick={() => handleSubmenuClick("/Tamil Pudhalvan")}
                      >
                        Tamil Pudhalvan
                      </li>
                    </ul>
                  )}
                </li>

                {/* Certificate Courses */}
                <li
                  onMouseEnter={() => toggleNestedMenu("certificate-courses")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  Certificate Courses &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "certificate-courses" && (
                    <ul className="submenu_nested">
                      <li
                        onClick={() =>
                          handleSubmenuClick("/accounting-tech-course")
                        }
                      >
                        Accounting Technician and Charted Accounting Course
                      </li>
                      <li onClick={() => handleSubmenuClick("/swayam-course")}>
                        SWAYAM
                      </li>
                      <li onClick={() => handleSubmenuClick("/nptl-course")}>
                        NPTL
                      </li>
                      <li
                        onClick={() => handleSubmenuClick("/coursera-course")}
                      >
                        Coursera
                      </li>
                    </ul>
                  )}
                </li>

                {/* Development Training */}
                <li
                  onMouseEnter={() => toggleNestedMenu("development-training")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  Development Training &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "development-training" && (
                    <ul className="submenu_nested">
                      <li
                        onClick={() =>
                          handleSubmenuClick("/internship-training")
                        }
                      >
                        Internship at Reputed Organization
                      </li>
                      <li
                        onClick={() => handleSubmenuClick("/hands-on-training")}
                      >
                        Hands on Training for Real-Life Skills
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/ethics-cultural-fests")
                        }
                      >
                        Ethics and Value-Based Cultural Fests
                      </li>
                    </ul>
                  )}
                </li>

                {/* News & Events */}
                <li onClick={() => handleSubmenuClick("/news-events")}>
                  News & Events
                </li>

                {/* Updates */}
                <li onClick={() => handleSubmenuClick("/updates")}>Updates</li>
              </ul>
            )}
          </li>

          {/* IQAS */}
          <li
            className="nav_item"
            onMouseEnter={() => toggleMenu("iqas")}
            onMouseLeave={() => setVisibleMenu("")}

          >
            <span>
              IQAS &nbsp;
              <RiArrowDownSLine />
            </span>

            {visibleMenu === "iqas" && (
              <ul className="submenu">
                <li onClick={() => handleSubmenuClick("/naac-vision-mission")}>
                  NAAC Vision & Mission
                </li>
                <li
                  onClick={() => handleSubmenuClick("/ucas-quality-objective")}
                >
                  UCAS Quality Objective
                </li>

                {/* IQAC Nested Menu */}
                <li
                  onMouseEnter={() => toggleNestedMenu("iqac")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  IQAC &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "iqac" && (
                    <ul className="submenu_nested">
                      <li
                        onClick={() => handleSubmenuClick("/iqac-composition")}
                      >
                        IQAC Composition
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/minutes-of-meeting")
                        }
                      >
                        Minutes of Meeting
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/quality-assurance-system")
                        }
                      >
                        Quality Assurance System
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick("/quality-initiatives")
                        }
                      >
                        Quality Initiatives
                      </li>
                    </ul>
                  )}
                </li>

                {/* AQAR Nested Menu */}
                <li
                  onMouseEnter={() => toggleNestedMenu("aqar")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  AQAR &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "aqar" && (
                    <ul className="submenu_nested">
                      <li onClick={() => handleSubmenuClick("/aqar-report")}>
                        AQAR Report
                      </li>
                      <li onClick={() => handleSubmenuClick("/criteria")}>
                        Criteria
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Committees */}

          <li
            className="nav_item"
            onMouseEnter={() => toggleMenu("committees")}
            onMouseLeave={() => setVisibleMenu("")}
          >
            <span>
              Committees &nbsp;
              <RiArrowDownSLine />
            </span>

            {visibleMenu === "committees" && (
              <ul className="submenu">
                <li
                  onMouseEnter={() => toggleNestedMenu("forms")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                >
                  Forms &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "forms" && (
                    <ul className="submenu_nested">
                      <li
                        onClick={() =>
                          handleSubmenuClick("/idea-submission-form")
                        }
                      >
                        Idea Submission Form
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onMouseEnter={() => toggleNestedMenu("antiragging")}
                  onMouseLeave={() => setVisibleNestedMenu("")}
                  className="student_menu"
                >
                  Antiragging &nbsp;
                  <RiArrowDownSLine />
                  {visibleNestedMenu === "antiragging" && (
                    <ul className="submenu_nested">
                      <li
                        onClick={() =>
                          handleSubmenuClick("/anti-ragging-squads")
                        }
                      >
                        Anti Ragging Squads
                      </li>
                      <li
                        onClick={() =>
                          handleSubmenuClick(
                            "/anti-ragging-monitoring-committee"
                          )
                        }
                      >
                        Anti Ragging Monitoring Committee
                      </li>
                    </ul>
                  )}
                </li>
                <li onClick={() => handleSubmenuClick("/statutory")}>
                  Statutory
                </li>
                <li onClick={() => handleSubmenuClick("/non-statutory")}>
                  Non Statutory
                </li>
                <li onClick={() => handleSubmenuClick("/salient-features")}>
                  Salient Features
                </li>
                <li onClick={() => handleSubmenuClick("/announcements")}>
                  Announcements
                </li>
                <li onClick={() => handleSubmenuClick("/news-events")}>
                  News & Events
                </li>
                <li onClick={() => handleSubmenuClick("/updates")}>Updates</li>
              </ul>
            )}
          </li>
          <li><Link to="/infrastructure" onClick={() => window.scrollTo(0, 0)}>Infrastructure</Link></li>
          <li><Link to="/gallery" onClick={() => window.scrollTo(0, 0)} >Gallery</Link></li>
          <li><Link to="/career" onClick={() => window.scrollTo(0, 0)} >Career</Link></li>
        </ul>
      </nav>

      {/* mobile header */}

      {
        isMobileMenuOpen && (
          <nav className="header_nav mobile_header_nav" ref={mobileNavRef}>
            <ul className="nav_list">
              {/* Home */}
              <li onClick={() => handleSubmobilemenuClick("/")}>Home</li>
              {/* About Us */}
              <li className="nav_item" onClick={() => toggleMobileMenu("about")}>
                <span>
                  About Us &nbsp;
                  <RiArrowDownSLine />
                </span>
                {visibleMobileMenu === "about" && (
                  <ul className="submenu">
                    <li onClick={() => handleSubmobilemenuClick("/about")}>About College</li>
                    <li onClick={() => handleSubmobilemenuClick("/vision")}> Vision, Mission & Objectives</li>
                    <li onClick={() => handleSubmobilemenuClick("/management")}>Management</li>
                    <li onClick={() => handleSubmobilemenuClick("/principal")}>Principal</li>
                  </ul>
                )}
              </li>

              {/* Academic */}
              <li className="nav_item">
                <span onClick={() => toggleMenu("academic")}>
                  Academic &nbsp;
                  <RiArrowDownSLine />
                </span>
                {visibleMenu === "academic" && (
                  <ul className="submenu">
                    {/* Courses */}
                    <li>
                      <span onClick={() => toggleNestedMenu("courses")}>
                        Courses &nbsp;
                        <RiArrowDownSLine />
                      </span>
                      {visibleNestedMenu === "courses" && (
                        <ul className="submenu_nested">
                          {/* Undergraduate Programs */}
                          <li>
                            <span onClick={() => toggleSubNestedMenu("undergraduate")}>
                              Undergraduate Programs &nbsp;
                              <RiArrowDownSLine />
                            </span>
                            {visibleSubNestedMenu === "undergraduate" && (
                              <ul className="submenu_subnested submenu_subnested_scroll">
                                {undergraduateCourses.map((item) => (
                                  <li key={item._id} onClick={() => {
                                    handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                    setFaculty(false)
                                  }}>
                                    {item.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>

                          {/* Postgraduate Programs */}
                          <li>
                            <span onClick={() => toggleSubNestedMenu("postgraduate")}>
                              Postgraduate Programs &nbsp;
                              <RiArrowDownSLine />
                            </span>
                            {visibleSubNestedMenu === "postgraduate" && (
                              <ul className="submenu_subnested submenu_subnested_scroll">
                                {postgraduateCourses.map((item) => (
                                  <li key={item._id} onClick={() => {
                                    handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                    setFaculty(false)
                                  }}>
                                    {item.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>

                          {/* Research Programs */}
                          <li>
                            <span onClick={() => toggleSubNestedMenu("research")}>
                              Research Programs &nbsp;
                              <RiArrowDownSLine />
                            </span>
                            {visibleSubNestedMenu === "research" && (
                              <ul className="submenu_subnested submenu_subnested_scroll">
                                {research.map((item) => (
                                  <li key={item._id} onClick={() => {
                                    handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                    setFaculty(false)
                                  }}>
                                    {item.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Faculty */}
                    <li>
                      <span onClick={() => toggleNestedMenu("faculty")}>
                        Faculty &nbsp;
                        <RiArrowDownSLine />
                      </span>
                      {visibleNestedMenu === "faculty" && (
                        <ul className="submenu_nested">
                          {/* Undergraduate Programs */}
                          <li>
                            <span onClick={() => toggleSubNestedMenu("undergraduate")}>
                              Undergraduate Programs &nbsp;
                              <RiArrowDownSLine />
                            </span>
                            {visibleSubNestedMenu === "undergraduate" && (
                              <ul className="submenu_subnested submenu_subnested_scroll">
                                {undergraduateCourses.map((item) => (
                                  <li key={item._id} onClick={() => {
                                    handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                    setFaculty(true)
                                  }}>
                                    {item.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>

                          {/* Postgraduate Programs */}
                          <li>
                            <span onClick={() => toggleSubNestedMenu("postgraduate")}>
                              Postgraduate Programs &nbsp;
                              <RiArrowDownSLine />
                            </span>
                            {visibleSubNestedMenu === "postgraduate" && (
                              <ul className="submenu_subnested submenu_subnested_scroll">
                                {postgraduateCourses.map((item) => (
                                  <li key={item._id} onClick={() => {
                                    handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                    setFaculty(true)
                                  }}>
                                    {item.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>

                          {/* Research Programs */}
                          <li>
                            <span onClick={() => toggleSubNestedMenu("research")}>
                              Research Programs &nbsp;
                              <RiArrowDownSLine />
                            </span>
                            {visibleSubNestedMenu === "research" && (
                              <ul className="submenu_subnested submenu_subnested_scroll">
                                {research.map((item) => (
                                  <li key={item._id} onClick={() => {
                                    handleSubmenuClick(`/course/${item._id}/${item.name}`)
                                    setFaculty(true)
                                  }}>
                                    {item.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              {/* student-centric */}
              <li className="nav_item">
                <span onClick={() => toggleMenu("student-centric")}>
                  Student Centric &nbsp;
                  <RiArrowDownSLine />
                </span>

                {visibleMenu === "student-centric" && (
                  <ul className="submenu">
                    {/* NSS */}
                    <li onClick={() => handleSubmenuClick("/NSS")}>NSS</li>

                    {/* YRC */}
                    <li onClick={() => handleSubmenuClick("/YRC")}>YRC</li>

                    {/* Women Empowerment Cell */}
                    <li onClick={() => handleSubmenuClick("/women-empowerment-cell")}>Women Empowerment Cell</li>

                    {/* CGC */}
                    <li onClick={() => handleSubmenuClick("/CGC")}>CGC</li>

                    {/* SEC */}
                    <li onClick={() => handleSubmenuClick("/SEC")}>SEC</li>

                    {/* Muthamizh Mandram */}
                    <li onClick={() => handleSubmenuClick("/muthamizh-mandram")}>Muthamizh Mandram</li>


                    {/* Value Added Courses */}
                    <li>
                      <span
                        onClick={() => toggleNestedMenu("value-added-courses")}
                        className="student_menu"
                      >
                        Value Added Courses &nbsp;
                        <RiArrowDownSLine />
                      </span>
                      {visibleNestedMenu === "value-added-courses" && (
                        <ul className="submenu_nested">
                          <li onClick={() => handleSubmenuClick("/campus-amenities-1")}>
                            Tally
                          </li>
                          <li onClick={() => handleSubmenuClick("/campus-amenities-2")}>
                            Fashion Designing
                          </li>
                          <li onClick={() => handleSubmenuClick("/campus-amenities-3")}>
                            Beauty Therapy
                          </li>
                          <li onClick={() => handleSubmenuClick("/campus-amenities-4")}>
                            Music / Photography
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Management Scholarship */}
                    <li>
                      <span
                        onClick={() => toggleNestedMenu("management-scholarship")}
                        className="student_menu"
                      >
                        Management Scholarship &nbsp;
                        <RiArrowDownSLine />
                      </span>
                      {visibleNestedMenu === "management-scholarship" && (
                        <ul className="submenu_nested">

                          <li onClick={() => handleSubmenuClick("/single-parent-scholarship")}>
                            Single Parent Scholarship
                          </li>

                          <li onClick={() => handleSubmenuClick("/merit-scholarship")}>
                            Merit Scholarship
                          </li>
                          <li onClick={() => handleSubmenuClick("/first-graduate-scholarship")}>
                            First Graduate Scholarship
                          </li>
                          <li onClick={() => handleSubmenuClick("/reference-scholarship")}>
                            Reference Scholarship
                          </li>


                          <li onClick={() => handleSubmenuClick("/sports-scholarship")}>
                            Sports Scholarship
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Government Scholarship */}
                    <li>
                      <span
                        onClick={() => toggleNestedMenu("government-scholarship")}
                        className="student_menu"
                      >
                        Government Scholarship &nbsp;
                        <RiArrowDownSLine />
                      </span>
                      {visibleNestedMenu === "government-scholarship" && (
                        <ul className="submenu_nested">
                          <li
                            onClick={() => handleSubmenuClick("/sc-scholarship")}
                          >
                            SC Scholarship
                          </li>
                          <li
                            onClick={() => handleSubmenuClick("/st-scholarship")}
                          >
                            ST Scholarship
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Certificate Courses */}
                    <li>
                      <span
                        onClick={() => toggleNestedMenu("certificate-courses")}
                        className="student_menu"
                      >
                        Certificate Courses &nbsp;
                        <RiArrowDownSLine />
                      </span>
                      {visibleNestedMenu === "certificate-courses" && (
                        <ul className="submenu_nested">
                          <li onClick={() => handleSubmenuClick("/accounting-tech-course")}>
                            Accounting Technician and Chartered Accounting Course
                          </li>
                          <li onClick={() => handleSubmenuClick("/swayam-course")}>SWAYAM</li>
                          <li onClick={() => handleSubmenuClick("/nptl-course")}>NPTL</li>
                          <li onClick={() => handleSubmenuClick("/coursera-course")}>
                            Coursera
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Development Training */}
                    <li>
                      <span
                        onClick={() => toggleNestedMenu("development-training")}
                        className="student_menu"
                      >
                        Development Training &nbsp;
                        <RiArrowDownSLine />
                      </span>
                      {visibleNestedMenu === "development-training" && (
                        <ul className="submenu_nested">
                          <li onClick={() => handleSubmenuClick("/internship-training")}>
                            Internship at Reputed Organization
                          </li>
                          <li onClick={() => handleSubmenuClick("/hands-on-training")}>
                            Hands on Training for Real-Life Skills
                          </li>
                          <li onClick={() => handleSubmenuClick("/ethics-cultural-fests")}>
                            Ethics and Value-Based Cultural Fests
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* News & Events */}
                    <li onClick={() => handleSubmenuClick("/news-events")}>News & Events</li>

                    {/* Updates */}
                    <li onClick={() => handleSubmenuClick("/updates")}>Updates</li>
                  </ul>
                )}
              </li>


              {/* IQAS */}
              <li className="nav_item">
                <span onClick={() => toggleMenu("iqas")}>
                  IQAS &nbsp;
                  <RiArrowDownSLine />
                </span>

                {visibleMenu === "iqas" && (
                  <ul className="submenu">
                    {/* NAAC Vision & Mission */}
                    <li onClick={() => handleSubmenuClick("/naac-vision-mission")}>
                      NAAC Vision & Mission
                    </li>

                    {/* UCAS Quality Objective */}
                    <li onClick={() => handleSubmenuClick("/ucas-quality-objective")}>
                      UCAS Quality Objective
                    </li>

                    {/* IQAC Nested Menu */}
                    <li
                      onClick={() => toggleNestedMenu("iqac")}
                      className="student_menu"
                    >
                      IQAC &nbsp;
                      <RiArrowDownSLine />
                      {visibleNestedMenu === "iqac" && (
                        <ul className="submenu_nested">
                          <li onClick={() => handleSubmenuClick("/iqac-composition")}>
                            IQAC Composition
                          </li>
                          <li onClick={() => handleSubmenuClick("/minutes-of-meeting")}>
                            Minutes of Meeting
                          </li>
                          <li onClick={() => handleSubmenuClick("/quality-assurance-system")}>
                            Quality Assurance System
                          </li>
                          <li onClick={() => handleSubmenuClick("/quality-initiatives")}>
                            Quality Initiatives
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* AQAR Nested Menu */}
                    <li
                      onClick={() => toggleNestedMenu("aqar")}
                      className="student_menu"
                    >
                      AQAR &nbsp;
                      <RiArrowDownSLine />
                      {visibleNestedMenu === "aqar" && (
                        <ul className="submenu_nested">
                          <li onClick={() => handleSubmenuClick("/aqar-report")}>
                            AQAR Report
                          </li>
                          <li onClick={() => handleSubmenuClick("/criteria")}>
                            Criteria
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              {/* Committees */}
              <li className="nav_item">
                <span onClick={() => toggleMenu("committees")}>
                  Committees &nbsp;
                  <RiArrowDownSLine />
                </span>

                {visibleMenu === "committees" && (
                  <ul className="submenu">
                    {/* IQAC Nested Menu */}
                    <li onClick={() => toggleNestedMenu("forms")} className="student_menu">
                      Forms &nbsp;
                      <RiArrowDownSLine />
                      {visibleNestedMenu === "forms" && (
                        <ul className="submenu_nested">
                          <li onClick={() => handleSubmenuClick("/idea-submission-form")}>
                            Idea Submission Form
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* AQAR Nested Menu */}
                    <li onClick={() => toggleNestedMenu("antiragging")} className="student_menu">
                      Anti-Ragging &nbsp;
                      <RiArrowDownSLine />
                      {visibleNestedMenu === "antiragging" && (
                        <ul className="submenu_nested">
                          <li onClick={() => handleSubmenuClick("/anti-ragging-squads")}>
                            Anti Ragging Squads
                          </li>
                          <li onClick={() => handleSubmenuClick("/anti-ragging-monitoring-committee")}>
                            Anti Ragging Monitoring Committee
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Other Menu Items */}
                    <li onClick={() => handleSubmenuClick("/statutory")}>Statutory</li>
                    <li onClick={() => handleSubmenuClick("/non-statutory")}>Non Statutory</li>
                    <li onClick={() => handleSubmenuClick("/salient-features")}>Salient Features</li>
                    <li onClick={() => handleSubmenuClick("/announcements")}>Announcements</li>
                    <li onClick={() => handleSubmenuClick("/news-events")}>News & Events</li>
                    <li onClick={() => handleSubmenuClick("/updates")}>Updates</li>
                  </ul>
                )}
              </li>

              <li onClick={() => handleSubmobilemenuClick("/infrastructure")}>Infrastructure</li>
              <li onClick={() => handleSubmobilemenuClick("/gallery")}>Gallery</li>
              <li onClick={() => handleSubmobilemenuClick("/career")}>Career</li>

              <div className="header_modal_button_mobile">
                <button className="button_apply " onClick={() => setOpen(true)}>Apply Now</button>


                <Modal
                  centered
                  open={open}
                  onOk={() => setOpen(false)}
                  onCancel={() => setOpen(false)}
                  width={800}
                  footer={null}
                  className="applyform_modal_main"
                >
                  <Applyform />
                </Modal>

                <Link to="https://grayquest.com/institute/united-arts" target="_blank">
                  <button className="button_pay button_pay_mobile">Pay Now</button>
                </Link>
              </div>

            </ul>
          </nav>
        )
      }


    </header>
  );
};

export default Header;
