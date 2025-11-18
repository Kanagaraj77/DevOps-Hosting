import React, { useState } from "react";
import "./Components/css/gallery.css";
import useFetchData from "../Admin/hooks/useFetchData";
import config from "../config";
import Error from "./Components/Common/404error";
import { IoMdClose } from "react-icons/io";
import Topbanner from "./Components/Common/Topbanner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState("all");
  const [sliceNumber, setSliceNumber] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const { data: galleryCat } = useFetchData("gallerycategory");
  const { data: gallery } = useFetchData("gallery");

  const showMoreImages = () => {
    setSliceNumber(sliceNumber + 8);
  };

  const showLessImages = (event) => {
    event.preventDefault();
    setSliceNumber(sliceNumber - 8);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openModal = (imageSrc, index) => {
    setModalImage(imageSrc);
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    setModalImageIndex(null);
  };

  const imagesToDisplay = activeIndex === "all"
    ? gallery?.flatMap((item) => item?.images)
    : gallery?.find((item) => item?.name?._id === activeIndex)?.images;

  const totalImages = imagesToDisplay?.length;

  const handleCategoryClick = (categoryId, event) => {
    event.preventDefault();
    setSliceNumber(8);
    setActiveIndex(categoryId);
  };

  
  const showNextImage = () => {
    if (modalImageIndex !== null && modalImageIndex < totalImages - 1) {
      const nextIndex = modalImageIndex + 1;
      const nextImage = imagesToDisplay[nextIndex];
  
      if (nextImage) {
        setModalImage(`${config.file}/gallery/${nextImage}`);
        setModalImageIndex(nextIndex);
      }
    }
  };
  
  const showPreviousImage = () => {
    if (modalImageIndex !== null && modalImageIndex > 0) {
      const prevIndex = modalImageIndex - 1;
      const prevImage = imagesToDisplay[prevIndex];
  
      if (prevImage) {
        setModalImage(`${config.file}/gallery/${prevImage}`);
        setModalImageIndex(prevIndex);
      }
    }
  };
  

  return (
    <>
      <Topbanner currentPage="Gallery" />

      <nav className="gallery-navbar">
        <ul className="gallery-navbar-list">
          {galleryCat?.map((category, index) => (
            <React.Fragment key={category?._id}>
              {index === 0 && (
                <li>
                  <a
                    href="#"
                    className={activeIndex === "all" ? "active" : ""}
                    onClick={(event) => handleCategoryClick("all", event)}
                  >
                    All
                  </a>
                </li>
              )}

              <li>
                <a
                  href="#"
                  className={activeIndex === category?._id ? "active" : ""}
                  onClick={(event) => handleCategoryClick(category?._id, event)}
                >
                  {category?.name}
                </a>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>

      {imagesToDisplay?.slice(0, sliceNumber)?.length > 0 ? (
        <div className="grid-gallery container">
          {imagesToDisplay?.slice(0, sliceNumber)?.map((image, index) => (
            <div className="gallery-image-section" key={index}>
              <img
                src={`${config.file}/gallery/${image}`}
                onClick={() => openModal(`${config.file}/gallery/${image}`, index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <Error />
      )}

      {/* View More / View Less Button */}
      {totalImages > 8 && sliceNumber >= 8 && (
        <div className="gallery-button-container">
          <center>
            {sliceNumber < totalImages ? (
              <button
                className="gallery-button"
                type="button"
                onClick={showMoreImages}
              >
                View More
              </button>
            ) : (
              <button
                className="gallery-button"
                type="button"
                onClick={showLessImages}
              >
                View Less
              </button>
            )}
          </center>
        </div>
      )}

      {isModalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content img_parent"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalImage} alt="Selected" className="modal-image modal-image-main" />
            <div className="modal-navigation center p-1">
              <button className="modal-nav-btn prev" onClick={showPreviousImage}><IoIosArrowBack /></button>
              <button className="modal-nav-btn next" onClick={showNextImage}><IoIosArrowForward /></button>
            </div>
            <button className="close-modal-btn close_btn center" onClick={closeModal}>
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
