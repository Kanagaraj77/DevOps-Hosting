import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonData } from "../../../Context";
import { getData } from "../../services/apiRequest";


const ProtectedPage = () => {
  const { adminCurrentUser, setAdminCurrentUser } = CommonData();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          const response = await getData("adminuser/getcurrentuser");
          setAdminCurrentUser(response?.data?.user);
          if (response.response && response.response.status == 401) {
            localStorage.removeItem("adminToken"); // Remove the expired token
            navigate("/admin");
          }
        } catch (error) {
          console.log("err",error)
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("adminToken"); // Remove the expired token
            navigate("/admin");
          }
        }
      } else {
        navigate("/admin");
      }
    };
    fetchdata();
  }, [localStorage.getItem("adminToken")]);

  return (
    adminCurrentUser && (
      <>
        <Outlet />
      </>
    )
  );
};

export default ProtectedPage;
