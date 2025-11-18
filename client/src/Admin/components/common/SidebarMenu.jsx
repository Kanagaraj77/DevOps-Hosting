import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { GrAnnounce } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { FaImage } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { IoIosPhotos } from "react-icons/io";
import { MdOutlineWork } from "react-icons/md";

const SidebarMenu = () => {
  function getItem(label, key, icon, children, to) {
    return {
      key,
      icon,
      children,
      label,
      to,
    };
  }
  let academicChilds = [
    getItem("Department", "4", null, null, "/admin/department"),
    getItem("Department Details", "5", null, null, "/admin/department-details"),
    getItem("Faculties", "6", null, null, "/admin/faculties"),
  ];
  let galleryChilds = [
    getItem("Category", "10", null, null, "/admin/gallerycategory"),
    getItem("Galleries", "11", null, null, "/admin/gallerys"),
  ];
  let careerChilds = [
    getItem("Career", "16", null, null, "/admin/career"),
    getItem("Candidates", "15", null, null, "/admin/candidates"),
    getItem("Students", "17", null, null, "/admin/students"),
  ];
  const items = [
    getItem("Home", "1", <HomeOutlined />, null, "/admin/dashboard"),
    getItem("User", "2", <UserOutlined />, null, "/admin/adminuser"),
    getItem("Academic", "3", <HiAcademicCap />, academicChilds),
    getItem("Banner", "7", <FaImage />, null, "/admin/banner"),
    getItem("Events", "8", <MdEvent />, null, "/admin/events"),
    getItem("Gallery", "9", <GrGallery />, galleryChilds),
    getItem("Career", "12", <MdOutlineWork />, careerChilds),
    getItem("Popup", "13", <IoIosPhotos />, null, "/admin/popup"),
    getItem("Announcement", "14", <GrAnnounce />, null, "/admin/announcement"),
  ];

  return items;
};

export default SidebarMenu;
