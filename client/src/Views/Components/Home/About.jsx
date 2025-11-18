import React from "react";
import { CiFileOn } from "react-icons/ci";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import config from "../../../config";
import { Link } from "react-router-dom";
import useFetchData from "../../../Admin/hooks/useFetchData";
import Skeleton from "@mui/material/Skeleton";
import { truncateText } from "../utils";

const About = () => {
  const { data, loading } = useFetchData("event/latestevents", null, true);
  const options = {
    items: 1,
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    smartSpeed: 1000,
    autoplay: true,
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <div className="home_about_section container">
        {!loading ? (
          <>
          <div className="news_container_home">
            {data?.data?.[1]?.news?.length > 0 && (
              <div className="home_news_container" data-aos="fade-up">
                <p className="home_news_heading mb-4">
                  Announcement <span></span>
                </p>
                {data?.data?.[1]?.news?.map((value, index) => {
                  const createdAtDate = new Date(value.date);

                  const formattedDate =
                    createdAtDate.toLocaleDateString("en-CA");

                  return (
                    <div className="home_news_box" key={index}>
                      <div className="news_img_box_one">
                        <Link
                          to={`/news/${value._id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <img
                            className="news_img_box_one"
                            src={`${config.file}/event/${value.images}`}
                            alt={value.title}
                          />
                        </Link>
                      </div>
                      <div className="news_text_box_two">
                        <p className="home_news_para">
                          <Link
                            to={`/news/${value._id}`}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            {value.title?.slice(0, 100)}{" "}
                          </Link>
                        </p>
                        <div className="home_news_date">
                          <CiFileOn />
                          {formattedDate}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <Link to="/news" onClick={() => window.scrollTo(0, 0)}>
              <button className="home_news_btn "> All Announcements</button>
            </Link>
          </div>

            {data?.data?.[0]?.event?.length > 0 && (
              <div
                className="home_event_container"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <p className="home_news_heading">
                  Event <span></span>
                </p>
                {data?.data?.[0]?.event.map((value, index) => {
                  const eventDate = new Date(value.date);

                  const month = eventDate.toLocaleString("default", {
                    month: "short",
                  });
                  const day = eventDate.getDate().toString().padStart(2, "0");

                  return (
                    <div className="home_event_box center mt-4" key={index}>
                      <div className="home_event_date home_event_date1">
                        <p className="home_event_month">{month}</p>
                        <p className="home_event_day">{day}</p>
                      </div>
                      <div className="home_event_text_box">
                        <p className="home_news_para">
                          <Link
                            to={`/event/${value._id}`}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            {truncateText(value?.title, 30)}
                          </Link>
                        </p>
                        <p className="home_news_para1">
                          {truncateText(value?.intro, 30)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <Link to="/event" onClick={() => window.scrollTo(0, 0)}>
                  <button className="home_news_btn"> All Events</button>
                </Link>
              </div>
            )}

            {data?.data?.[2]?.highlight?.length > 0 && (
              <div
                className="highlights_container"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <p className="home_news_heading">
                  Highlights <span></span>
                </p>

                <OwlCarousel className="owl-carousel owl-theme" {...options}>
                  {data?.data?.[2]?.highlight.map((value, index) => (
                    <div className="highlights_img_box" key={index}>
                      <Link
                        to={`/highlight/${value._id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <img
                          src={`${config.file}/event/${value.images}`}
                          alt={value.title}
                        />
                      </Link>

                      <div className="work_shop_box">{value.title}</div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            )}
          </>
        ) : (
          <>
            {[...Array(3)].map((_, index) => (
              <>
                {index == 2 ? (
                  <div className="highlights_container">
                    <p className="home_news_heading mb-4">
                      Highlights <span></span>
                    </p>
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      height={400}
                      animation="wave"
                    />
                  </div>
                ) : (
                  <div className="home_event_container">
                    <p className="home_news_heading mb-4">
                      {index == 0 ? "News" : "Event"} <span></span>
                    </p>

                    <>
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="mt-3">
                          <div className="mb-2">
                            <Skeleton
                              key={index}
                              variant="rectangular"
                              animation="wave"
                              width={100}
                              height={15}
                            />
                          </div>
                          <Skeleton
                            key={index}
                            variant="rectangular"
                            animation="wave"
                            height={50}
                          />
                        </div>
                      ))}
                    </>
                  </div>
                )}
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default About;
