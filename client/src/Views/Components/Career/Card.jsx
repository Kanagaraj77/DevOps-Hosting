import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import career_icon from "/images/career_icon.avif";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { PiStudent } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineSchool } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import useFetchData from "../../../Admin/hooks/useFetchData";

const CardGrid = () => {
  const { data, loading } = useFetchData("career");

  if (loading) {
    return null;
  }

  return (
    <div className="card_grid container">
      {data?.map((career) => (
        <div className="card_container">
          <div className="card_logo center">
            <img
              src={career_icon}
              alt="career_icon"
              style={{ width: "70%", height: "auto" }}
            />
          </div>
          <div className="card_content">
            <p className="card_heading">{career?.title}</p>
            <p className="card_description">{career?.intro}</p>
            <ul className="card_list">
              <li>
                <span>
                  <MdOutlineSchool />
                </span>
                Qualification - {career?.qualification}
              </li>
              <li>
                <span>
                  <IoTimeOutline />
                </span>
                Openings - {career?.openings}
              </li>
              <li>
                <span>
                  <PiStudent />
                </span>
                Experience - {career?.experience}
              </li>
              <li>
                <span>
                  <RiMoneyRupeeCircleLine />
                </span>
                Salary - {career?.salary}
              </li>
              <li>
                <span>
                  <IoLocationOutline />
                </span>
                Location - {career?.location}
              </li>
            </ul>
          </div>
          <Link to={`/career/${career?._id}`}>
            <button className="card_button mt-4">
              <span>VIEW MORE</span>
              <span className="card_button_arrow">
                &nbsp; &nbsp;
                <RiArrowRightDoubleLine className="card_arrow_animate" />
              </span>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
