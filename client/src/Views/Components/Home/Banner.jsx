import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import banner_bg from "/images/home/banner_bg.avif";
import { CommonData } from "../../../Context";
import useFetchData from "../../../Admin/hooks/useFetchData";
import config from "../../../config";
import { IoMdArrowDropdown } from "react-icons/io";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { ToastSuccess, ToastError } from "../../../Admin/components/common/ToastMsg";
import axios from "axios";

const Banner = () => {
  const [studyLevel, setStudyLevel] = useState("Study Level");
  const [courses, setCourses] = useState("Courses");
  const [department, setDepartment] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);

  const url = `${config?.apiUrl}/department`;
  const submitUrl = `${config?.apiUrl}/bannerform`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setDepartment(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  const groupedDepartments = department?.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr.name);
    return acc;
  }, {});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(submitUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        ToastSuccess("Your application has been submitted successfully!");
        setFormData({ fullName: "", email: "", phone: "", course: "" });
      } else {
        ToastError("Failed to submit the application. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      ToastError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    items: 1,
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    animateOut: "fadeOut",
    smartSpeed: 500,
    autoplay: true,
  };

  const { FindWindowSize } = CommonData();
  const ws = FindWindowSize();

  const { data, loading: bannerLoading } = useFetchData("banner", null, true);

  const bannerData =
    ws[0] <= 600
      ? data?.[0]?.banner?.filter((banner) => banner?.mobile)?.length > 0
        ? data?.[0]?.banner?.filter((banner) => banner?.mobile)
        : data?.[0]?.banner?.filter((banner) => !banner?.mobile)
      : data?.[0]?.banner?.filter((banner) => !banner?.mobile);

  return (
    <div className="banner_container center">
      <img src={banner_bg} alt="" className="banner_bg" data-aos="fade-right" />

      <div className="banner_slider_box">
        {!bannerLoading ? (
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {bannerData?.map((banner, index) => (
              <div className="banner_slider_img_box" key={index}>
                <Link to={banner?.url}>
                  <img src={`${config?.file}/banner/${banner?.img}`} alt="" />
                </Link>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <Skeleton variant="rectangular" height={500} animation="wave" />
        )}
      </div>

      <div className="banner_form_box" data-aos="fade-left" data-aos-delay="200">
        <p className="banner_form_heading">Do you want to be a UCASIAN?</p>

        <form onSubmit={handleSubmit} className="banner_form">
          <div className="input_container">
            <AiOutlineUser />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input_box"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input_container">
            <GoMail />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input_box"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="select_main_box">
            <IoMdArrowDropdown className="select_arrow" />
            <IoBookOutline />
            <select
              id="courses"
              name="course"
              value={formData.course}
              className="input_box select_box"
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Courses
              </option>
              {Object.keys(groupedDepartments).map((category) => (
                <optgroup label={category} key={category}>
                  {groupedDepartments[category].map((name, index) => (
                    <option value={name} key={index} className="optname">
                      {name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="input_container">
            <IoCallOutline />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="input_box"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="banner_form_btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
