import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Modal } from "antd";
import Applyform from "../Common/Applyform";

const Admission = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="admission_section">
      <main className="admission_container container">
        <div className="admission_component">
          <div className="admission_content" data-aos="fade-right">
            <h2 className="admission_title">
              We Work Hard To Prepare Every Student For Their Professional Life
            </h2>
          </div>
          <div
            className="admission_button center"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <button className="admission_btnno">

              <Link to="tel:+96888 45555">   <BsFillTelephoneFill /> 96888&nbsp;45555 </Link>

   
              <span className="admission_or center">OR</span>
            </button>
            <div className="header_modal_button admission_apply_btn ">
              <button className="admission_btnad" onClick={() => setOpen(true)}>
                APPLY NOW
              </button>
              <Modal
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={800}
                className="applyform_modal_main"
                footer={null} 
              >
                <Applyform setOpen={setOpen} />
              </Modal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admission;
