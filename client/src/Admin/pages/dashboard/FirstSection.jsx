import { FiUsers } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { MdImportantDevices } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { getData } from "../../services/apiRequest";
import image1 from "../../assets/dh_box1.svg";
import image2 from "../../assets/dh_box2.svg";
import image3 from "../../assets/dh_box3.svg";
import image4 from "../../assets/dh_box4.svg";

const FirstSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("dashboard");
        if (res?.status === 200) {
          setData(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);



  return (
    <>
      <div className="dashboard-box">
        <div className="dh_box_body">
          <div className="inbox">
            <div className="greetingbox">
              <div className="">
                <h6>Welcome Admin 🎉</h6>
                <p>
                  Guiding dreams with every step, Building futures we won’t
                  forget.
                  <br />
                  In every task, we find our way, Shaping tomorrow, today.
                </p>
                <Link to={"/admin/events"}>
                  <button className="btn btn-primary">View Event</button>
                </Link>
              </div>
            </div>

            <div className="orderbox">
              <div className="orderbox_head orderbox_head_1">
                <div className="orderbox_div1 order_box_div">
                  <div className="order_icons">
                    <FiUsers />
                  </div>
                  <div className="order_content_box">
                    <span>User</span>
                    <span>{abbreviateNumber(data?.user || 0, 1)}</span>
                  </div>
                </div>
                <div className="orderbox_div1">
                  <img src={image1} alt="User Icon" />
                </div>
              </div>
              <div className="orderbox_head orderbox_head_2">
                <div className="orderbox_div1 order_box_div">
                  <div className="order_icons">
                    <MdEvent />
                  </div>
                  <div className="order_content_box">
                    <span>Event</span>
                    <span>
                      {abbreviateNumber(data?.eventsByCategory?.event || 0, 1)}
                    </span>
                  </div>
                </div>
                <div className="orderbox_div1">
                  <img src={image2} alt="Event Icon" />
                </div>
              </div>
              <div className="orderbox_head orderbox_head_3">
                <div className="orderbox_div1 order_box_div">
                  <div className="order_icons">
                    <FaRegNewspaper />
                  </div>
                  <div className="order_content_box">
                    <span>News</span>
                    <span>
                      {abbreviateNumber(data?.eventsByCategory?.news || 0, 1)}
                    </span>
                  </div>
                </div>
                <div className="orderbox_div1">
                  <img src={image3} alt="News Icon" />
                </div>
              </div>
              <div className="orderbox_head orderbox_head_4">
                <div className="orderbox_div1 order_box_div">
                  <div className="order_icons">
                    <MdImportantDevices />
                  </div>
                  <div className="order_content_box">
                    <span>Highlight</span>
                    <span>
                      {abbreviateNumber(
                        data?.eventsByCategory?.highlight || 0,
                        1
                      )}
                    </span>
                  </div>
                </div>
                <div className="orderbox_div1">
                  <img src={image4} alt="Highlight Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstSection;
