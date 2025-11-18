import React, {  useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import {  useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { Button } from "antd";
import { IoLogOut } from "react-icons/io5";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { CommonData } from "../../../Context";



const MySwal = withReactContent(Swal);

const Header = ({collapsedWidth,setCollapsedWidth,adminHeaderRef,sidebarRef1}) => {
  const { adminCurrentUser , setAdminCurrentUser ,gs,FindWindowSize,setToken } = CommonData();
  const windowSize  = FindWindowSize()
  const location = useLocation();
  const { Header } = Layout;
  const [login, setLogin] = useState(false);


  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You want to logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await MySwal.fire({
            title: "Logout Successfully!",
            icon: "success",
          });
          if (adminCurrentUser) {
            localStorage.removeItem("adminToken");
            setToken(null)
            setAdminCurrentUser(null)
            navigate("/");
          }
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          MySwal.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    if (windowSize[0] < 1000) {
      setCollapsedWidth(true);
    } else {
      setCollapsedWidth(false);
    }
  }, [windowSize]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (windowSize[0] < 1000) {
        if (
          sidebarRef1.current &&
          !sidebarRef1.current.contains(e.target) &&
          adminHeaderRef.current &&
          !adminHeaderRef.current.contains(e.target)
        ) {
          setCollapsedWidth(true);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [windowSize[0]]);

  useEffect(() => {
    if (windowSize[0] < 1000) {
      setCollapsedWidth(true);
    }
  }, [location]);
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      setLogin(true);
    } else {
      setLogin(true); /// change
    }
  }, []);
  if (!login) {
    return null;
  }

  return (
    <>
    {
      login &&
      <Layout
        className={collapsedWidth ? "layout1" : ""}
        style={{
          padding: 0,
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        <Header>
          <div ref={adminHeaderRef} className=" adminheader">
            <div className="adminheader-section1">
              {windowSize[0] < 1000 && (
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => setCollapsedWidth((prev) => !prev)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              )}
              <span
                className={`header-username ${
                  windowSize[0] < 1000 ? "ms-0" : "ms-4"
                }`}
              >
                Hello! &nbsp;
                {adminCurrentUser?.name}
              </span>
            </div>
            <div className="adminheader__sub2">
              <span
                className="adminheader__sub2__icon adminheader__sub2__icon2"
                onClick={handleLogout}
                data-tooltip-id="my-tooltip-1"
              >
                <IoLogOut />
              </span>
            </div>
            <ReactTooltip
              id="my-tooltip-1"
              place="bottom"
              content="Logout"
            />
          </div>

        </Header>
      </Layout>
    }
    </>
  );
};

export default Header;
