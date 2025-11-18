import config from "../../../config";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewModal = (studentId) => {
  const url = `${config.apiUrl}/applynowform/${studentId?.studentId}`;
  console.log(studentId);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("RES ", response);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  return (
    <main>
      <div>
        <div>
          <p className="fw-bold center fs-3">Student Details</p>

          <div className="applyform_row gap-5 p-2">
            <div>
              <span className="fw-bold">Name</span>
              <p className="black">{data?.name}</p>
            </div>
            <div>
              <span className="fw-bold">Email</span>
              <p>{data?.email}</p>
            </div>
          </div>

          <div className="applyform_row gap-5 p-2">
            <div>
              <span className="fw-bold">Parent Name</span>
              <p>{data?.parentName}</p>
            </div>
            <div>
              <span className="fw-bold">Parent Number</span>
              <p>{data?.parentNumber}</p>
            </div>
          </div>

          <div className="applyform_row gap-5 p-2">
            <div>
              <span className="fw-bold">Student Number</span>
              <p>{data?.studentNumber}</p>
            </div>
            <div>
              <div>
                <span className="fw-bold">Department</span>
                <p>{data?.department}</p>
              </div>
            </div>
          </div>

          <div className="applyform_row p-2">
            <div>
              <span className="fw-bold">School Name</span>
              <p>{data?.hscSchoolName}</p>
            </div>
          </div>

          <div className="applyform_row gap-5 p-2">
            <div>
              <span className="fw-bold">SSLC Mark</span>
              <p>{data?.sslcMark}</p>
            </div>
            <div>
              <span className="fw-bold">HSC Mark</span>
              <p>{data?.hscMark}</p>
            </div>
            <div>
              <span className="fw-bold">HSC Medium</span>
              <p>{data?.hscMedium}</p>
            </div>
          </div>
          <div>
            <span className="fw-bold">Address</span>
            <p>{data?.address}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewModal;
