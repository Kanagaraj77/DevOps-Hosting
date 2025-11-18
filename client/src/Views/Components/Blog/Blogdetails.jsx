import React from "react";
import "../css/blogdetails.css";
import { MdLocationOn } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../../../config";
import useFetchData from "../../../Admin/hooks/useFetchData";
import Topbanner from "../Common/Topbanner";
import Error from "../Common/404error";

const Blogdetails = () => {
  const { id } = useParams();
  const categoryname = window?.location?.pathname?.split("/")?.[1];
  const { data } = useFetchData(`event`, id, null, id);
  const { data: recentEvents } = useFetchData(
    `event/category/${categoryname}/${4}/${id}`
  );
  const dateObj = new Date(data?.date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate().toString().padStart(2, '0');
  if (!data) {
    return <Error />;
  }

  return (
    <>
      <Topbanner
        currentPage={
          (categoryname === "news" && "Announcement") ||
          categoryname?.charAt(0).toUpperCase() +
          categoryname?.slice(1).toLowerCase()
        }
      />

      <div className="blogdetails">
        <main className="blogdetails_container container">
          <div className="blogdetails_component">
            <div className="blogdetails_contentcard">
              <div className="contentcard_header">
                <h2 className="contentcard_title">{data?.title}</h2>
                {data?.location && (
                  <span className="contentcard_icontitle para">
                    <sub className="contentcard_icon">
                      <MdLocationOn />
                    </sub>
                    {data?.location}
                  </span>
                )}
              </div>
              <div className="contentcard_content">
                <div className="contentcard_imageparent">
                  <img
                    className="contentcard_image"
                    src={`${config.file}/event/${data?.images}`}
                    alt={data?.title}
                  />
                  <div className="home_event_date home_event_date1 contentcard_date">
                    <p className="home_event_month contentcard_month">
                      {" "}
                      {month}
                    </p>
                    <p className="home_event_day contentcard_day">{day}</p>
                  </div>
                </div>
                <div className="contentcard_paraparent">
                  <span
                    className="contentcard_para para"
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  ></span>
                </div>
              </div>
            </div>

            <div className="blogdetails_imagecard">
              <div className="imagecard_header">
                <div>
                  <h5 className="imagecard_titleone">
                    Recent{" "}
                    {categoryname == "event"
                      ? "Events"
                      : categoryname == "news"
                        ? "News"
                        : categoryname == "highlight"
                          ? "Highlights"
                          : ""}
                  </h5>
                </div>
                <div>
                  <Link to={`/${categoryname}`}>
                    <button className="imagecard_btnone">
                      All{" "}
                      {categoryname == "event"
                        ? "Events"
                        : categoryname == "news"
                          ? "News"
                          : categoryname == "highlight"
                            ? "Highlights"
                            : ""}{" "}
                      &nbsp;
                      <IoIosArrowRoundForward />
                    </button>
                  </Link>
                </div>
              </div>
              {recentEvents?.map((item, index) => (
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
                    <Link to={`/${categoryname}/${item._id}`}>
                      <button className="imagecard_btntwo">View Details</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Blogdetails;
