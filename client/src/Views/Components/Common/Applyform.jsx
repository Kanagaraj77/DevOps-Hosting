
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/apply.css";
import apply_logo from "/images/apply_logo.avif";


import { HiOutlineEnvelope } from "react-icons/hi2";
import { AiOutlineUser } from "react-icons/ai";
import { PiBookOpenText, PiUsersThin } from "react-icons/pi";
import { VscCallOutgoing } from "react-icons/vsc";
import { IoIosPhonePortrait } from "react-icons/io";
import { RiBookmark3Line } from "react-icons/ri";
import { LuSchool } from "react-icons/lu";
import { LiaWpforms } from "react-icons/lia";
import { PiGraduationCap } from "react-icons/pi";
import config from "../../../config";
import { ToastError, ToastSuccess } from "../../../Admin/components/common/ToastMsg";

const Applyform = ({setOpen}) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    parentName: "",
    parentNumber: "",
    studentNumber: "",
    address: "",
    department: "",
    sslcMark: "",
    hscMark: "",
    hscMedium: "",
    hscSchoolName: "",
  });
  const [departments, setDepartments] = useState([]);
  const [groupedDepartments, setGroupedDepartments] = useState({});

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/department`);
        const data = response.data;

        // Group departments by category
        const grouped = data.reduce((acc, curr) => {
          if (!acc[curr.category]) {
            acc[curr.category] = [];
          }
          acc[curr.category].push(curr.name);
          return acc;
        }, {});

        setDepartments(data);
        setGroupedDepartments(grouped);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.apiUrl}/applynowform`,
        formData
      );
      ToastSuccess("Form submitted successfully!");
      console.log(response.data);
      setOpen(false)

      // Clear the form after submission
      setFormData({
        email: "",
        name: "",
        parentName: "",
        parentNumber: "",
        studentNumber: "",
        address: "",
        department: "",
        sslcMark: "",
        hscMark: "",
        hscMedium: "",
        hscSchoolName: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      ToastError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>
      <div className="applyform_container ">
        <div className="applyform_header center">
          <img src={apply_logo} alt="College Logo" className="applyform_logo" />
          <div className="applyform_content">
            <h1>United College of Arts and Science</h1>
            <p>Affiliated to Bharathiar University</p>
          </div>
        </div>

        <form className="applyform_form" onSubmit={handleSubmit}>
          <p className="applyform_title center">Admission Enquiry Form</p>

          <div className="applyform_row">
            <div className="applyform_input_wrapper">
              <HiOutlineEnvelope className="input_icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="applyform_input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="applyform_input_wrapper">
              <AiOutlineUser className="input_icon" />
              <input
                type="text"
                name="name"
                placeholder="Name of the Candidate"
                className="applyform_input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="applyform_row">
            <div className="applyform_input_wrapper">
              <PiUsersThin className="input_icon" />
              <input
                type="text"
                name="parentName"
                placeholder="Name of the Parent"
                className="applyform_input"
                value={formData.parentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="applyform_input_wrapper">
              <VscCallOutgoing className="input_icon" />
              <input
                type="text"
                name="parentNumber"
                placeholder="Parent Contact Number"
                className="applyform_input"
                value={formData.parentNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="applyform_row">
            <div className="applyform_input_wrapper">
              <IoIosPhonePortrait className="input_icon" />
              <input
                type="text"
                name="studentNumber"
                placeholder="Student Contact Number"
                className="applyform_input"
                value={formData.studentNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="applyform_input_wrapper">
              <PiBookOpenText className="input_icon" />
              <select
                name="department"
                className="applyform_input"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Name of the Programme
                </option>
                {/* Render departments grouped by category */}
                {Object.entries(groupedDepartments).map(
                  ([category, departments]) => (
                    <optgroup key={category} label={category}>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </optgroup>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="applyform_row">
            <div className="applyform_input_wrapper">
              <textarea
                name="address"
                placeholder="Address"
                className="applyform_textarea"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="applyform_row">
            <div className="applyform_input_wrapper">
              <PiGraduationCap className="input_icon" />
              <input
                type="text"
                name="sslcMark"
                placeholder="Marks Secured in SSLC"
                className="applyform_input"
                value={formData.sslcMark}
                onChange={handleChange}
                required
              />
            </div>
            <div className="applyform_input_wrapper">
              <RiBookmark3Line className="input_icon" />
              <input
                type="text"
                name="hscMark"
                placeholder="Marks Secured in HSC"
                className="applyform_input"
                value={formData.hscMark}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="applyform_row">
            <div className="applyform_input_wrapper">
              <LiaWpforms className="input_icon" />
              <select
                name="hscMedium"
                className="applyform_input"
                value={formData.hscMedium}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Medium in HSC
                </option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
              </select>
            </div>
            <div className="applyform_input_wrapper">
              <LuSchool className="input_icon" />
              <input
                type="text"
                name="hscSchoolName"
                placeholder="Name of School (HSC)"
                className="applyform_input"
                value={formData.hscSchoolName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="center">
            <button type="submit" className="applyform_button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Applyform;
