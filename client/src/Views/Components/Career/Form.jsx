import React, { useState } from "react";
import axios from "axios";
import config from "../../../config";
import { ToastSuccess, ToastError } from "../../../Admin/components/common/ToastMsg";

const Form = () => {
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
      ToastError("Please upload a resume.");
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
    <main>
      <div className="in_formSection">
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
            <option value="" disabled selected>--Select Position--</option>
            <option value="teacher">Teacher</option>
            <option value="driver">Driver</option>
            <option value="professor">Professor</option>
          </select>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="in_input"
            required
          >
            <option value="" disabled selected>--Select Experience--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3 & 3+</option>
          </select>
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
    </main>
  );
};

export default Form;
