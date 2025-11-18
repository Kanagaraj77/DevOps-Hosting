import { Layout, Menu } from "antd";
import {  useEffect, useMemo, useState } from "react";

import {
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { CommonData } from "../../../Context";
import SidebarMenu from "../common/SidebarMenu";
import logo from "../../assets/logo.png";


const Sidebar = ({
  collapsedWidth,
  setCollapsedWidth,
  sidebarRef1,
  adminHeaderRef,
}) => {
  const [login, setLogin] = useState(false);
  const {collapsedstate ,FindWindowSize} = CommonData();
  const windowSize  = FindWindowSize()
  const location = useLocation();
  const {  Sider } = Layout;
  const [openKeys, setOpenKeys] = useState();
  const [keys, setKeys] = useState(["2"]);

  const handleMenuClick = (keyPath) => {
    const latestOpenKey = keyPath[keyPath.length - 1];
    setOpenKeys([latestOpenKey]);
  };

  //common fn for sidebar
  function getItem(label, key, icon, children, to) {
    return {
      key,
      icon,
      children,
      label,
      to,
    };
  }
  const renderMenuItem = useMemo(() => {
    const recursiveRender = (item) => {
      if (item.to) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.to}>{item.label}</Link>
          </Menu.Item>
        );
      }
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => recursiveRender(child))}
          </Menu.SubMenu>
        );
      }
      return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
    };
    return (item) => recursiveRender(item);
  }, []);


  useEffect(() => {
    if (windowSize[0] < 1000) {
      setCollapsedWidth(true);
    } else {
      setCollapsedWidth(false);
    }
  }, [windowSize]);

  useEffect(() => {
    setKeys(
      location.pathname === "/admin/dashboard"
        ? ["1"]:
      location.pathname === "/admin/adminuser"
        ? ["2"]:
      location.pathname === "/admin/department"
        ? ["4"]:
      location.pathname === "/admin/department-details"
        ? ["5"]:
      location.pathname === "/admin/faculties"
        ? ["6"]:
      location.pathname === "/admin/banner"
        ? ["7"]:
      location.pathname === "/admin/events"
        ? ["8"]:
      location.pathname === "/admin/gallerycategory"
        ? ["10"]:
      location.pathname === "/admin/gallerys"
        ? ["11"]:
      location.pathname === "/admin/career"
        ? ["12"]:
      location.pathname === "/admin/popup"
        ? ["13"]:
      location.pathname === "/admin/announcement"
        ? ["14"]
        : ""
    );
  }, [location.pathname]);

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (e) => {
    const { target } = e;
    if (target.scrollTop > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
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
      setLogin(true);
    }
  }, []);

  if (!login) {
    return null;
  }

  return (
    <>
      {login && (
        <Layout
          style={{
            zIndex: 10,
          }}
          hasSider
        >
          <Sider
            ref={sidebarRef1}
            breakpoint="lg"
            collapsedWidth={0}
            trigger={null}
            collapsible
            collapsed={collapsedstate}
            width={collapsedWidth ? 0 : 230}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 10,
            }}
            onScroll={handleScroll}
          >
            <div className="ucas-logo">
                <img
                  src={logo}
                  className="img-fluid dummy-img"
                  alt="logo"
                />
            </div>

            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={keys}
              className="antd-menu"
              openKeys={openKeys}
              onOpenChange={handleMenuClick}
            >
              {SidebarMenu().map((item) => renderMenuItem(item))}
            </Menu>

            <div
              className="menu-close"
              style={{
                position: isSticky ? "sticky" : "absolute",
              }}
              onClick={() => setCollapsedWidth((prev) => !prev)}
            >
              <DoubleLeftOutlined />
            </div>
          </Sider>
        </Layout>
      )}
    </>
  );
};

export default Sidebar;
