import React, { useState, useEffect } from "react";
import "../css/course.css";
import { IoMdClose } from "react-icons/io";
import config from "../../../config";
import userImg from "../../../../public/images/user.avif"

const Detailsmodal = ({ faculty, closeModal }) => {
  const [data, setData] = useState(faculty);

  useEffect(() => {
    if (faculty) {
      setData(faculty);
    }
  }, [faculty]);

  if (!data) return null;

  return (
    <div className="modal-overlay">
      <div className="profile-container">
        <div className="course-header">
          <div className="profileheader">
            <img
              src={`${data?.image ? `${config?.file}/profile/${data?.image}` : `${userImg}`}`}
              className="profile-pic"
              alt={data.name}
            />
            <div className="header-text">
              <h1>{data.name}</h1>
              <p>{data.qualification}</p>
              <p>{data.designation}</p>
            </div>
          </div>

          <div className="details">
            <table>
              <tbody>
                <tr>
                  {/* <td>Description</td> */}
                  <td dangerouslySetInnerHTML={{ __html: data.description }}></td>
                </tr>
              </tbody>
            </table>
          </div>

          <button onClick={closeModal} className="close-btn">
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detailsmodal;
