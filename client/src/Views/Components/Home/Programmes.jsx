import React, { useState, useEffect } from "react";
import programmes_logo1 from "/images/home/programmes_logo1.avif";
import programmes_logo2 from "/images/home/programmes_logo2.avif";
import programmes_logo3 from "/images/home/programmes_logo3.avif";
import programmes_logo4 from "/images/home/programmes_logo4.avif";
import programmes_bg from "/images/home/programmes_bg.avif";
import programmes_arrow from "/images/home/programmes_arrow.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config.jsx";

const predefinedCategories = [
  {
    id: 1,
    title: "Undergraduate Programes",
    key: "Undergraduate",
    logo: programmes_logo1,
  },
  {
    id: 2,
    title: "Postgraduate Programes",
    key: "Postgraduate",
    logo: programmes_logo2,
  },
  {
    id: 3,
    title: "Research Programes",
    key: "Research",
    logo: programmes_logo3,
  },
  { id: 4, title: "Career", key: "Career", logo: programmes_logo4 }, 
];

const Programmes = () => {
  const [programmesData, setProgrammesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/department`);
        const filterResp = response?.data?.filter((item) => item?.status);
        const response1 = await axios.get(`${config.apiUrl}/career`);
        const filterResp1 = response1?.data?.filter((item) => item?.status);

        const counts = filterResp?.reduce((acc, item) => {
          const category = item.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        const formattedData = predefinedCategories.map((category) => ({
          ...category,
          count:
            category.key == "Career"
              ? filterResp1?.length
              : counts[category.key] || 0, // Default to 0 if no data for the category
        }));

        setProgrammesData(formattedData);
      } catch (err) {
        console.log("error", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("programmesData", programmesData);

  return (
    <div className="programmes_section mt-5 mb-5">
      <div className="programmes_head container mb-5">
        <h4>
          Courses <span>We</span> Offer!
        </h4>
      </div>
      <Link to="/program" onClick={() => window.scrollTo(0, 0)}>
        <div className="programmes_container container">
          {programmesData.map((programme) => (
            <div
              key={programme.id}
              className={`programmes_box 
                            ${
                              programme.id % 2 === 1
                                ? "programmes_box_even"
                                : ""
                            }
                            ${programme.id === 2 ? "programmes_box_two" : ""}
                            ${
                              programme.id === programmesData.length
                                ? "programmes_box_last"
                                : ""
                            }
                        `}
            >
              <div className="programmes_logo_box">
                <img src={programme.logo} alt={programme.title} />
              </div>
              <h4>{programme.title}</h4>

              {
                programme?.key == "Career" ?
                <>
                  {programme.count === 0 ? (
                    <p>Join Our Team</p>
                  ) : (
                    <p>{programme.count} Programes</p>
                  )}
                
                </>
                :
                <p>{programme.count} Programes</p>
              }
              {/* <p>{programme.count} Programes</p> */}
              <img
                src={programmes_bg}
                alt={programme.title}
                className="programmes_bg"
              />
              <img
                src={programmes_arrow}
                alt={programme.title}
                className="programmes_arrow"
              />
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Programmes;
