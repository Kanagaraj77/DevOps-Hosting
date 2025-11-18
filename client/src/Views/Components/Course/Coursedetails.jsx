import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Facultydirectory from "./Facultydirectory";
import useFetchData from "../../../Admin/hooks/useFetchData";
import Topbanner from "../Common/Topbanner";
import config from "../../../config";
import Error from "../Common/404error";

const Coursedetails = ({ faculty }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFacultyDirectory, setShowFacultyDirectory] = useState(faculty);
  const [deptName, setDeptName] = useState([]);

  const { id } = useParams();
  const { data, loading } = useFetchData(
    `department-details/department/${id}`,
    null,
    true
  );
  console.log(data);

  const url = `${config?.apiUrl}/department/${data?.department?.department}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDeptName(data);
        if(faculty){
          setShowFacultyDirectory(true);
        }else{
          setShowFacultyDirectory(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data,faculty]);

  const handleFacultyDirectoryClick = () => {
    setShowFacultyDirectory(true);
    setActiveIndex(-1);
  };

  const handleSidebarLinkClick = (index) => {
    setActiveIndex(index);
    setShowFacultyDirectory(false);
  };

  useEffect(() => {
    if (data?.department?.details) {
      if(faculty){
        setActiveIndex(-1);
      }else{
        setActiveIndex(0);
      }
    }
  }, [data,faculty]);

  useEffect(() => {
    if (faculty) {
      setShowFacultyDirectory(faculty);
    }
  }, [faculty]);
  console.log(faculty );
  console.log(showFacultyDirectory );
  

  return (
    <>
      <Topbanner currentPage={deptName?.name || "Course"} />
      {data?.department?.details?.length > 0 ? (
        <div className="course container">
          <div className="course-content">
            {showFacultyDirectory ? (
              <Facultydirectory />
            ) : data?.department?.details?.length > 0 ? (
              <>
                <h1>{data?.department?.details[activeIndex]?.title}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.department?.details[activeIndex]?.value,
                  }}
                ></div>
              </>
            ) : (
              <Error />
            )}
          </div>

          <div className="course-sidebar">
            <ul className="sidebar-list">
              {data?.department?.details?.map((item, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className={activeIndex === index ? "active" : ""}
                    onClick={() => handleSidebarLinkClick(index)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="#"
                  className={activeIndex === -1 ? "active" : ""}
                  onClick={handleFacultyDirectoryClick}
                >
                  Faculty Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};

export default Coursedetails;
