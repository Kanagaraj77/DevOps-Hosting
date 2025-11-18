import React, { useState } from 'react';
import Management1 from "/images/management/Management1.avif";
import Management2 from "/images/management/Management2.avif";
import Management3 from "/images/management/Management3.avif";
import gallery1 from "/images/home/gallery1.avif";
import gallery2 from "/images/home/gallery2.avif";
import gallery3 from "/images/home/gallery3.avif";
import gallery4 from "/images/home/gallery4.avif";
import gallery5 from "/images/home/gallery5.avif";
import gallery6 from "/images/home/gallery6.avif";
import gallery7 from "/images/home/gallery7.avif";
import gallery8 from "/images/home/gallery8.avif";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

const Team = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const galleryImg = [
        { id: 1, image: gallery1 },
        { id: 2, image: gallery2 },
        { id: 3, image: gallery3 },
        { id: 4, image: gallery4 },
        { id: 5, image: gallery5 },
        { id: 6, image: gallery6 },
        { id: 7, image: gallery7 },
        { id: 8, image: gallery8 },
    ];

    return (
        <>
            {/* Management Section */}
            <div className="home_management_container container mt-5">
                <div className="home_management_box">
                    <p className="home_news_heading mb-4" data-aos='fade-right'>Management Team</p>

                    <div className="home_manage_info" data-aos="fade-right" >
                        <img src={Management1} alt="" />
                        <div className="homa_manage_info_box">
                            <p className="home_manage_info_name">
                                Er. S. Shanmugam
                                <span></span>
                            </p>
                            <p className="home_manage_info_designation">
                                Founder and Chairman
                            </p>
                            <Link to="/management#Founder-and-Chairman">
                                <button className="home_manage_info_btn">Show Profile</button>
                            </Link>
                        </div>
                    </div>
                    <div className="home_manage_info" data-aos="fade-right" data-aos-delay="200" >
                        <img src={Management2} alt="" />
                        <div className="homa_manage_info_box">
                            <p className="home_manage_info_name">
                                Dr.CA.M.Kailash Kumar
                                <span></span>
                            </p>
                            <p className="home_manage_info_designation">
                                Managing Trustee
                            </p>
                            <Link to="/management#Managing-Trustee" >
                                <button className="home_manage_info_btn">Show Profile</button>
                            </Link>
                        </div>
                    </div>
                    <div className="home_manage_info" data-aos="fade-right" data-aos-delay="400" >
                        <img src={Management3} alt="" />
                        <div className="homa_manage_info_box">
                            <p className="home_manage_info_name">
                            Dr. S. Mythili <span></span>
                            </p>
                            <p className="home_manage_info_designation">Co-Chairman</p>
                            <Link to="/management#Co-Chairman" >
                                <button className="home_manage_info_btn">Show Profile</button>
                            </Link>
                        </div>
                    </div>

                    <Link to="/management" onClick={() => window.scrollTo(0, 0)}>
                        <button className="home_news_btn">View More</button>
                    </Link>
                </div>

                {/* Gallery Section */}
                <div className="home_gallery_box" >
                    <p className="home_news_heading mb-4" data-aos='fade-left'>Gallery</p>

                    <div className="home_gallery_container" data-aos="fade-left" data-aos-delay="200" >
                        {galleryImg.map((image, index) => (
                            <div className="home_gallery_img" key={index} onClick={() => openModal(image.image)}>
                                <img src={image.image} alt="" />
                            </div>
                        ))}
                    </div>

                    <Link to="/gallery" onClick={() => window.scrollTo(0, 0)}>
                        <button className="home_news_btn">View More</button>
                    </Link>
                </div>
            </div>

            {/* Modal for Image Popup */}
            {isModalOpen && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Selected" className="modal-image" />
                        <button className="close-modal-btn" onClick={closeModal}>
                            <IoMdClose />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Team;
