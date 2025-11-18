import React, { useEffect, useState } from "react";
import "../Views/Components/css/home.css";
import Banner from "./Components/Home/Banner";
import About from "./Components/Home/About";
import Team from "./Components/Home/Team";
import Carousel from "./Components/Home/Carousel";
import Life from "./Components/Home/Life";
import Admission from "./Components/Home/Admission";
import Programmes from "./Components/Home/Programmes";
import { Modal } from "antd";
import useFetchData from "../Admin/hooks/useFetchData";
import config from "../config";
import Testimonial from "./Components/Home/testimonial";

const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const handleClose = () => setShowPopUp(false);

  const ImgModal = ({ popupData }) => {
    const status = popupData?.status;
    if (!status) {
      return null;
    }
    return (
      <Modal
        open={showPopUp}
        onCancel={handleClose}
        className="modal_popup"
        footer={null}
      >
        <div className="modal_popup_div">
          <img src={`${config?.file}/popup/${popupData?.img}`} />
        </div>
      </Modal>
    );
  };

  const { data, loading } = useFetchData("popup", null, true);

  const popupData = data ? data : null;

  useEffect(() => {
    setTimeout(() => {
      setShowPopUp(true);
    }, 2000);
  }, [popupData]);

  return (
    <>
      {popupData && <ImgModal popupData={popupData[0]} />}
      <Banner />
      <About />
      <Programmes />
      <Life />
      <Admission />
      <Team />
      <Testimonial/>
      <Carousel />
      
    </>
  );
};

export default Home;
