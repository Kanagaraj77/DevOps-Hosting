import "../css/careerdetail.css";
import { useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsPersonVideo } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { PiOfficeChairBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { PiBagSimpleBold } from "react-icons/pi";
import { IoMdTimer } from "react-icons/io";
import Form from "./Form";
import { Modal } from "antd";
import Topbanner from "../Common/Topbanner";
import useFetchData from "../../../Admin/hooks/useFetchData";
import { useParams } from "react-router-dom";
import Error from "../Common/404error";

const CareerDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, loading } = useFetchData("career", id);

  if (loading) return null;
  if (!data) return <Error />;

  return (
    <>
      <Topbanner currentPage="Career Detail" />
      <main className="careerdetail_container container">
        <div className="careerdetail_component">
          <div className="careerdetail_requirements position-sticky">
            <div className="careerdetail_req_head">
              <h4 className="req_head text-center">{data?.title}</h4>
              <hr />
            </div>
            <div className="careerdetail_req_content">
              {/* START */}
              <div className="req_content_section">
                <div className="content_section_icon">
                  <GiGraduateCap />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">Qualification </span>
                  <span className="req_content_ans">{data?.qualification}</span>
                </div>
              </div>
              <div className="req_content_section">
                <div className="content_section_icon">
                  <LiaFileInvoiceDollarSolid />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">Salary </span>
                  <span className="req_content_ans">{data?.salary}</span>
                </div>
              </div>
              <div className="req_content_section" hidden={!data?.jobtype}>
                <div className="content_section_icon">
                  <BsPersonVideo />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">Job&nbsp;Type </span>
                  <span className="req_content_ans">{data?.jobtype}</span>
                </div>
              </div>
              <div className="req_content_section" hidden={!data?.benefit}>
                <div className="content_section_icon">
                  <GoGraph />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">Benefits </span>
                  <span className="req_content_ans">{data?.benefit}</span>
                </div>
              </div>
              <div className="req_content_section">
                <div className="content_section_icon">
                  <PiOfficeChairBold />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">No.of.Openings </span>
                  <span className="req_content_ans">{data?.openings}</span>
                </div>
              </div>
              <div className="req_content_section">
                <div className="content_section_icon">
                  <IoLocationOutline />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">Location </span>
                  <span className="req_content_ans">{data?.location}</span>
                </div>
              </div>
              <div className="req_content_section">
                <div className="content_section_icon">
                  <PiBagSimpleBold />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">Experience </span>
                  <span className="req_content_ans">{data?.experience}</span>
                </div>
              </div>
              <div className="req_content_section" hidden={!data?.shift}>
                <div className="content_section_icon">
                  <IoMdTimer />
                </div>
                <div className="content_section_content">
                  <span className="req_content_title">
                    Shift&nbsp;Schedule{" "}
                  </span>
                  <span className="req_content_ans">{data?.shift}</span>
                </div>
              </div>

              {/* END */}
            </div>
          </div>
          <div className="careerdetail_description pt-5 pb-5">
            <div className="careerdetails_sub_parent">
              <span className="careerdetail_subtitle">Job Description</span>
              <p
                className="careerdetail_para para"
                dangerouslySetInnerHTML={{ __html: data?.jobdescription }}
              ></p>
            </div>
            <div className="careerdetails_sub_parent">
              <span className="careerdetail_subtitle">Roles</span>
              <p
                className="careerdetail_para para"
                dangerouslySetInnerHTML={{ __html: data?.roles }}
              ></p>
            </div>
            <div className="careerdetails_sub_parent">
              <span className="careerdetail_subtitle">Skills</span>
              <p
                className="careerdetail_para para"
                dangerouslySetInnerHTML={{ __html: data?.skills }}
              ></p>
            </div>

            <div className="careerdetail__button">
              <button
                onClick={() => setIsModalOpen(true)}
                className="careerdetail__btn center"
              >
                APPLY NOW <MdDoubleArrow />
              </button>
            </div>
          </div>
        </div>
        <Modal
          className="career_form"
          title=""
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <Form />
        </Modal>
      </main>
    </>
  );
};

export default CareerDetail;
