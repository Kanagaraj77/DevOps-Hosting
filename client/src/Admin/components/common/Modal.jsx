import { Modal } from "antd";

// modal page
const CommonModal = ({ open, setOpen, chlidren, formik, handleCancel }) => {
  return (
    <>
      <Modal
        footer={null}
        open={open}
        onCancel={() => handleCancel(formik, setOpen)}
        centered
      >
        {chlidren}
      </Modal>
    </>
  );
};

export default CommonModal;
