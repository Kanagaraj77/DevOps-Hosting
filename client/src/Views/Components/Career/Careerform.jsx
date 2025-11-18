import React, { useState } from "react";
import axios from "axios";
import config from "../../../config";
import collage1 from "/images/home/collage1.avif";
import { ToastError, ToastSuccess } from "../../../Admin/components/common/ToastMsg";

const Careerform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    comments: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert("Please upload a resume.");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("applyfor", formData.position);
    submitData.append("experience", formData.experience);
    submitData.append("comment", formData.comments);
    submitData.append("file", formData.resume);

    try {
      const response = await axios.post(
        `${config.apiUrl}/careerform`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      ToastSuccess(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        comments: "",
        resume: null,
      });
    } catch (error) {
      if(error.response.status === 413) 
        return ToastError(error.response.data.message);
      console.error("Error submitting form", error);
      ToastError("There was an error submitting the form.");
    }
  };

  return (
    <>
      <div className="career_main_header container in_container_header mt-5">
        <h4 data-aos="fade-up" >JOIN US NOW AT UCAS COLLEGE</h4>
        <h1 data-aos="fade-up" data-aos-delay="50" >Opportunities Never Happen, You Create Them!</h1>
        <p data-aos="fade-up" data-aos-delay="100" >
          UCAS College is always looking for passionate individuals who are
          committed to shaping the future of education.
        </p>
      </div>

      <div className="in_container mt-5 container">
        <div className="in_formSection"  data-aos="fade-right" data-aos-delay="100"  >
          <form className="in_form" onSubmit={handleSubmit}>
            <h2 className="in_formTitle">Apply Now</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="in_input"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="in_input"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone No"
              className="in_input"
              required
            />
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="in_input"
              required
            >
              <option value="" disabled selected>Choose your position</option>
              <option value="Principal">Principal</option>
              <option value="Dean">Dean</option>
              <option value="HOD">Head of the Department (HOD)</option>
              <option value="professor">Professor</option>
              <option value="Associate professor">Associate Professor</option>
            </select>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter your experience"
              className="in_input"
              required
            />
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Comment here"
              className="in_textarea"
            ></textarea>
            <div className="in_uploadResume">
              <label htmlFor="resume">Upload Resume </label>
              <input
                type="file"
                id="resume"
                className="in_fileInput"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="in_submitButton">
              Submit
            </button>
          </form>
        </div>

        <div className="alternative_content" data-aos="fade-left" data-aos-delay="200" >
          <img src={collage1} alt="collage1" className="img_clg" />
          <p className="alternative-para2">
            UCAS College is always looking for passionate individuals who are
            committed to shaping the future of education. Whether you're an
            educator, administrator, or support staff, we offer exciting
            opportunities to grow your career while helping our students achieve
            their dreams.
          </p>
          <p className="alternative-para2">
            Explore our current job openings and take the first step towards a
            fulfilling career with us. Apply now and become part of a team that
            values creativity, diversity, and collaboration. Your journey starts
            here—let’s build the future together!
          </p>
        </div>
      </div>
    </>
  );
};

export default Careerform;
