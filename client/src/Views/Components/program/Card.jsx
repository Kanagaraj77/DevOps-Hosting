import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, overlayText, title, items }) => {
  return (
    <div className="program_card_box container mt-5">
      <div className="program_card_img_box">
        {/* Front Side */}
        <div className="program_card_img_front">
          <img src={image} alt="" className="program_image" />
        </div>

        {/* Back Side */}
        <div className="program_card_img_back">
          <div className="program_card_img_overlay_center center">
            {overlayText}
          </div>
        </div>
      </div>

      <div className="program_card_content_box">
        <h3>
          {title}
          <span></span>
        </h3>

        <div className="program_card_list_box mt-4">
          <ul>
            {items.map((item, index) => (
              <Link to={`/course/${item?._id}/${item?.name}`} onClick={() => window.scrollTo(0, 0)}>
              <li key={index}>{item?.name || item?.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
