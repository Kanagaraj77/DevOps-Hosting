import React, { useState, useEffect } from "react";
import "../css/blog.css";
import { FaLocationDot } from "react-icons/fa6";
import Topbanner from "../Common/Topbanner";
import axios from "axios";
import config from "../../../config";
import { Link } from "react-router-dom";

const Event = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const url = `http://localhost:4321/api/event`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const filteredData = response.data.filter(
          (item) => item.category === "event"
        );
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const truncateText = (text, limit) => {
    const strippedText = text.replace(/<[^>]*>/g, "");
    return strippedText.length > limit
      ? `${strippedText.substring(0, limit)}...`
      : text;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Topbanner currentPage="Event" />
      <div className="blog_section">
        <div className="blog_container container">
          {currentItems.map((value, index) => {
            const dateObj = new Date(value.createdAt);
            const month = dateObj.toLocaleString("default", { month: "short" });
            const day = dateObj.getDate();
            return (
              <div className="blog_box center" key={index}>
                <div className="blog_image_box">
                  <img
                    src={`${config.file}/event/${value.images}`}
                    alt={value.title}
                    className="blog_image"
                  />
                  <div className="home_event_date home_event_date_blog">
                    <p className="home_event_month">{month}</p>
                    <p className="home_event_day">{day}</p>
                  </div>
                </div>
                <div className="blog_content_box">
                  <h3 className="blog_title">{value.title}</h3>
                  <p className="blog_location">
                    <span>
                      <FaLocationDot />
                    </span>
                    {value.location}
                  </p>
                  <p
                    className="blog_description"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(value.description, 120),
                    }}
                  ></p>
                  <Link to={`/eventdetails/${value._id}`}>
                    <button className="blog_btn">View Details</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {/* Pagination Buttons */}
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={handlePreviousPage} className="pagination_button">
              Previous
            </button>
          )}
          <div className="pagination">
            <span className="pagination_info">
              Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
            </span>
          </div>
          {currentPage < Math.ceil(data.length / itemsPerPage) && (
            <button onClick={handleNextPage} className="pagination_button">
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Event;
