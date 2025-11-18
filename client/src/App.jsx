import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./Admin/styles/admin.css";
import "./Admin/styles//SidebarContent.css";

import { CommonData } from "./Context";
import Sidebar from "./Admin/components/adminpanel/Sidebar";
import Header from "./Admin/components/adminpanel/Header";
import AdminForm from "./Admin/components/adminpanel/AdminForm";
import ProtectedPage from "./Admin/components/common/ProtectedPage";
import Content from "./Admin/components/adminpanel/Content";
import Nodatafound from "./Admin/components/common/NoDataFound";
import AdminUser from "./Admin/pages/user/AdminUser";
import AddAdminUser from "./Admin/pages/user/AddAdminUser";
import Faculties from "./Admin/pages/faculties/Faculties";
import AddFaculty from "./Admin/pages/faculties/AddFaculty";
import Department from "./Admin/pages/academic/Department";
import DepartmentDetails from "./Admin/pages/academic/DepartmentDetails";
import Banner from "./Admin/pages/banner/Banner";
import Event from "./Admin/pages/event/Event";
import AddOrEditEvent from "./Admin/pages/event/AddOrEditEvent";
import AddOrEditDepartmentDetails from "./Admin/pages/academic/AddOrEditDepartmentDetails";
import GalleryCategory from "./Admin/pages/gallery/GalleryCategory";
import Gallery from "./Admin/pages/gallery/Gallery";
import AddOrEditGallery from "./Admin/pages/gallery/AddOrEditGallery";
import Popup from "./Admin/pages/popup/Popup";
import Announcement from "./Admin/pages/announcement/Announcement";
import Career from "./Admin/pages/career/Career";
import AddOrEditCareer from "./Admin/pages/career/AddOrEditCareer";
import Dashboard from "./Admin/pages/dashboard/Dashboard";
import Candidate from "./Admin/pages/career/Candidate";
import Student from "./Admin/pages/career/Student";

function App() {
  const [collapsedWidth, setCollapsedWidth] = useState(false);
  const adminHeaderRef = useRef(null);
  const sidebarRef1 = useRef(null);

  const { token } = CommonData();

  return (
    <>
      {/* <ProtectedPage> */}
      <ToastContainer />
      {token && (
        <>
          <Sidebar
            collapsedWidth={collapsedWidth}
            setCollapsedWidth={setCollapsedWidth}
            adminHeaderRef={adminHeaderRef}
            sidebarRef1={sidebarRef1}
          />
          <Header
            collapsedWidth={collapsedWidth}
            setCollapsedWidth={setCollapsedWidth}
            adminHeaderRef={adminHeaderRef}
            sidebarRef1={sidebarRef1}
          />
        </>
      )}

      <Routes>
        {/* adminpanel routes starting */}
        <Route path="/" element={<AdminForm />} />
        <Route element={<ProtectedPage />}>
          <Route path="/dashboard" element={<Content component={<Dashboard />} />} />
          <Route
            path="/adminuser"
            element={<Content component={<AdminUser />} />}
          />

          <Route
            path="/addadminuser"
            element={<Content component={<AddAdminUser />} />}
          />
          <Route
            path="/editadminuser/:id"
            element={<Content component={<AddAdminUser />} />}
          />
          <Route
            path="/department"
            element={<Content component={<Department />} />}
          />
          <Route
            path="/department-details"
            element={<Content component={<DepartmentDetails />} />}
          />
          <Route
            path="/add-department-details"
            element={<Content component={<AddOrEditDepartmentDetails />} />}
          />
          <Route
            path="/edit-department-details/:id"
            element={<Content component={<AddOrEditDepartmentDetails />} />}
          />

          <Route
            path="/faculties"
            element={<Content component={<Faculties />} />}
          />
          <Route
            path="/addfaculty"
            element={<Content component={<AddFaculty />} />}
          />
          <Route
            path="/editfaculty/:id"
            element={<Content component={<AddFaculty />} />}
          />

          {/* banner  */}
          <Route path="/banner" element={<Content component={<Banner />} />} />
          {/* events  */}
          <Route path="/events" element={<Content component={<Event />} />} />
          <Route
            path="/addevents"
            element={<Content component={<AddOrEditEvent />} />}
          />
          <Route
            path="/editevent/:id"
            element={<Content component={<AddOrEditEvent />} />}
          />

          {/* gallery  */}
          <Route
            path="/gallerycategory"
            element={<Content component={<GalleryCategory />} />}
          />
          <Route
            path="/gallerys"
            element={<Content component={<Gallery />} />}
          />
          <Route
            path="/addgallery"
            element={<Content component={<AddOrEditGallery />} />}
          />
          <Route
            path="/editgallery/:id"
            element={<Content component={<AddOrEditGallery />} />}
          />

          {/* popup  */}
          <Route path="/popup" element={<Content component={<Popup />} />} />

          {/* announcement  */}
          <Route
            path="/announcement"
            element={<Content component={<Announcement />} />}
          />

          {/* career  */}
          <Route path="/career" element={<Content component={<Career />} />} />
          <Route
            path="/addcareer"
            element={<Content component={<AddOrEditCareer />} />}
          />
          <Route
            path="/editcareer/:id"
            element={<Content component={<AddOrEditCareer />} />}
          />
          {/* candidate */}
          <Route path="/candidates" element={<Content component={<Candidate />} />} />
          {/* student */}
          <Route path="/students" element={<Content component={<Student />} />} />

          <Route path="*" element={<Content component={<Nodatafound />} />} />
        </Route>
      </Routes>
      {/* </ProtectedPage> */}
    </>
  );
}

export default App;
