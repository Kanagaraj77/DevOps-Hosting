import React, { useState, useEffect } from "react";
import "../css/blog.css";
import { FaLocationDot } from "react-icons/fa6";
import Topbanner from "../Common/Topbanner";
import config from "../../../config";
import { Link } from "react-router-dom";
import useFetchData from "../../../Admin/hooks/useFetchData";
import { truncateText } from "../utils";

const Blog = () => {
  const categoryname = window?.location?.pathname?.split("/").pop();
  const { data: event } = useFetchData(
    `event/category/${categoryname}/${0}/noSkipId`
  );
  const EventData = event?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = EventData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(EventData.length / itemsPerPage)) {
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
      <Topbanner
        currentPage={
          (categoryname === "news" && "Announcement") ||
          categoryname?.charAt(0).toUpperCase() +
          categoryname?.slice(1).toLowerCase()
        }
      />
      <div className="blog_section">
        <div className="blog_container container">
          {currentItems.map((value) => {
            const dateObj = new Date(value.date);
            const month = dateObj.toLocaleString("default", { month: "short" });
            const day = dateObj.getDate().toString().padStart(2, '0');
            return (
              <div className="blog_box center" key={value?._id}>
                <div className="blog_image_box">
                  <img
                    src={`${config?.file}/event/${value?.images}`}
                    alt={value?.title}
                    className="blog_image"
                  />
                  <div className="home_event_date home_event_date_blog">
                    <p className="home_event_month">{month}</p>
                    <p className="home_event_day">{day}</p>
                  </div>
                </div>
                <div className="blog_content_box">
                  <h3 className="blog_title">{value?.title}</h3>
                  {value?.location && (
                    <p className="blog_location">
                      <span>
                        <FaLocationDot />
                      </span>
                      {value?.location}
                    </p>
                  )}
                  <p className="blog_description">
                    {truncateText(value?.intro, 100)}
                  </p>
                  <Link to={`/${categoryname}/${value?._id}`} onClick={() => window.scrollTo(0, 0)}>
                    <button className="blog_btn">View Details</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={handlePreviousPage} className="pagination_button">
              Previous
            </button>
          )}

          {(() => {
            const totalPages = Math.ceil(EventData.length / itemsPerPage);
            const pagesToShow = 5;
            let pageNumbers = [];

            pageNumbers.push(1);

            if (currentPage > pagesToShow) {
              pageNumbers.push("...");
            }

            const startPage = Math.max(
              2,
              currentPage - Math.floor(pagesToShow / 2)
            );
            const endPage = Math.min(
              totalPages - 1,
              currentPage + Math.floor(pagesToShow / 2)
            );

            for (let i = startPage; i <= endPage; i++) {
              pageNumbers.push(i);
            }

            if (endPage < totalPages - 1) {
              pageNumbers.push("...");
            }

            if (totalPages > 1) {
              pageNumbers.push(totalPages);
            }

            return pageNumbers.map((page, index) =>
              page === "..." ? (
                <span key={index} className="dots">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={`page_number ${currentPage === page ? "active" : ""
                    }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            );
          })()}

          {currentPage < Math.ceil(EventData.length / itemsPerPage) && (
            <button onClick={handleNextPage} className="pagination_button">
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
