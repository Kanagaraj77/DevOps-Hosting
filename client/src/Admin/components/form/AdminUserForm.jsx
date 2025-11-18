/* eslint-disable react/prop-types */

import { useState } from "react";
import CommonButton from "../common/Button";
import CommonInput from "../common/Input";
import { useNavigate, useParams } from "react-router-dom";
import { ToastError, ToastSuccess } from "../common/ToastMsg";
import Form from "../common/Form";
import * as yup from "yup";
import { postOneData } from "../../services/apiRequest";

const AdminUserForm = ({ formik, loading, values }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [loading1, setLoading1] = useState(false);

  const pwHandleSubmit = async (val, { resetForm }) => {
    try {
      setLoading1(true);
      const response = await postOneData("adminuser", val, id);
      if (response.status === 200) {
        resetForm();
        navigate("/admin/adminuser");
        ToastSuccess(response.data.message);
      } else {
        throw new Error("Something went wrong please try again later.");
      }
    } catch (error) {
      console.log(error);
      ToastError(error?.response?.data?.message || "Error");
    } finally {
      setLoading1(false);
    }
  };

  const pwInitialValues = {
    password: "",
  };
  const pwValidationSchema = yup.object().shape({
    password: yup.string().required("Required"),
  });

  const handleCancel = (formik, setOpen) => {
    formik.resetForm();
    setOpen(false);
  };

  const pwChange = ({ formik, loading }) => {
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="col">
          <h4 className="text-center mt-4 mb-3">Change Password</h4>
          <div className="col mt-4">
            <CommonInput
              label={"Password"}
              required={true}
              formik={formik}
              placeholder={"Password"}
              formikName={"password"}
              inputType={"antdpass"}
            />
          </div>
        </div>
        <CommonButton
          antdBtn={true}
          text={"Submit"}
          mb={"mb-3"}
          mt={"mt-3"}
          loading={loading}
          htmlType={"submit"}
        />
      </form>
    );
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="rowmt-5">
        <div className="row mt-4">
          <div className="col-12 col-xxl-4 col-md-6 col-sm-12 mb-3">
            <CommonInput
              label={"Name"}
              required={true}
              formik={formik}
              placeholder={"Name"}
              formikName={"name"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-xxl-4 col-md-6 col-sm-12 mb-3">
            <CommonInput
              label={"Username"}
              required={true}
              formik={formik}
              placeholder={"Username"}
              formikName={"username"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-xxl-4 col-md-6 col-sm-12 mb-3">
            {values ? (
              <CommonInput
                label={"Status"}
                required={true}
                formik={formik}
                placeholder={"Email"}
                formikName={"status"}
                inputType={"select"}
                options={[
                  {
                    label: "Select Status",
                    value: "",
                  },
                  {
                    label: "Active",
                    value: "true",
                  },
                  {
                    label: "Inactive",
                    value: "false",
                  },
                ]}
              />
            ) : (
              <CommonInput
                label={"Password"}
                required={true}
                formik={formik}
                placeholder={"Password"}
                formikName={"password"}
                inputType={"antdpass"}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className={`col-md-2 col-8 submit_btn_head`}>
            <CommonButton
              antdBtn={true}
              text={"Submit"}
              mb={"mb-3"}
              mt={"mt-3"}
              loading={loading}
              htmlType={"submit"}
            />
          </div>
          <div className={`col-md-2 col-8 submit_btn_head`} hidden={!values}>
            <CommonButton
              antdBtn={true}
              text={"Change Password"}
              mb={"mb-3"}
              mt={"mt-3"}
              color={"green"}
              onClick={() => setOpen((prev) => !prev)}
              htmlType={"button"}
            />
          </div>
        </div>

        {/* change password modal  */}
        <Form
          open={open}
          setOpen={setOpen}
          initialValues={pwInitialValues}
          handlesubmit={pwHandleSubmit}
          inModal={true}
          validationSchema={pwValidationSchema}
          FormComponent={pwChange}
          values={null}
          loading={loading1}
          handleCancel={handleCancel}
        />
      </form>
    </>
  );
};

export default AdminUserForm;
