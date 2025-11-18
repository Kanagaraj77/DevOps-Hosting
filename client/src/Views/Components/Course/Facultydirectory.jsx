import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detailsmodal from "./Detailsmodal";
import axios from "axios";
import config from "../../../config";

const Facultydirectory = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facultyId, setFacultyId] = useState();
  const { id } = useParams()

  const [faculty, setFaculty] = useState([]);

  const url = `${config.apiUrl}/faculties/faculty/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setFaculty(response?.data?.department?.filter((obj) => obj?.status));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);
  console.log(faculty);


  const openProfile = (faculty) => {
    setSelectedFaculty(faculty);
    setFacultyId(faculty._id);
    console.log(faculty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
  };

  return (
    <div className="Facultydirectory ">
      <div className="faculty-table-wrapper">
        <table className="Facultytable">
          <thead>
            <tr>
              <th className="Faculty-heading">Faculty Name</th>
              <th className="Faculty-heading">Qualification</th>
              <th className="Faculty-heading">Designation</th>
              <th className="Faculty-heading Faculty-profile">Profile Link</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((faculty, index) => (
              <tr key={index}>
                <td>{faculty.name}</td>
                <td>{faculty.qualification}</td>
                <td>{faculty.designation}</td>
                <td>
                  <button
                    onClick={() => openProfile(faculty)}
                    className="Faculty-link"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedFaculty && (
        <Detailsmodal faculty={selectedFaculty} closeModal={closeModal} facultyId={facultyId} />
      )}
    </div>
  );
};

export default Facultydirectory;
