import React from "react";
import "../css/blogdetails.css";
import { MdLocationOn } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../../../config";

const EventDetails = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);

  const url = `http://localhost:4321/api/event/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setNewsDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const [data, setData] = useState([]);
  const recentUrl = `http://localhost:4321/api/event`;

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await axios.get(recentUrl);
        const filteredData = response.data
          .filter((item) => item.category === "event")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentEvents();
  }, []);

  if (!newsDetail) {
    return null;
  }

  const dateObj = new Date(newsDetail.createdAt);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();

  return (
    <div className="blogdetails">
      <main className="blogdetails_container container">
        <div className="blogdetails_component">
          <div className="blogdetails_contentcard">
            <div className="contentcard_header">
              <h2 className="contentcard_title">{newsDetail.title}</h2>
              <span className="contentcard_icontitle para">
                <sub className="contentcard_icon">
                  <MdLocationOn />
                </sub>
                {newsDetail.location}
              </span>
            </div>
            <div className="contentcard_content">
              <div className="contentcard_imageparent">
                <img
                  className="contentcard_image"
                  src={`${config.file}/event/${newsDetail.images}`}
                  alt={newsDetail.title}
                />
                <div className="home_event_date home_event_date1 contentcard_date">
                  <p className="home_event_month contentcard_month"> {month}</p>
                  <p className="home_event_day contentcard_day">{day}</p>
                </div>
              </div>
              <div className="contentcard_paraparent">
                <span
                  className="contentcard_para para"
                  dangerouslySetInnerHTML={{ __html: newsDetail.description }}
                ></span>
              </div>
            </div>
          </div>

          <div className="blogdetails_imagecard">
            <div className="imagecard_header">
              <div>
                <h5 className="imagecard_titleone">Recent Events</h5>
              </div>
              <div>
                <Link to="/event">
                  <button className="imagecard_btnone">
                    All Events
                    <IoIosArrowRoundForward />
                  </button>
                </Link>
              </div>
            </div>
            {data.map((item, index) => (
              <div className="imagecard_content" key={index}>
                <img
                  className="imagecard_image"
                  src={`${config.file}/event/${item.images}`}
                  alt={item.title}
                />
                <div className="imagecard_paraparent">
                  <p className="imagecard_titletwo">{item.title}</p>
                  <span className="imagecard_icontitle para">
                    <sub className="imagecard_icon">
                      <MdLocationOn />
                    </sub>
                    {item.location}
                  </span>
                  <Link to={`/eventdetails/${item._id}`}>
                    <button className="imagecard_btntwo">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
