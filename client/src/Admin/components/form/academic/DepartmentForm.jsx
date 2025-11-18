/* eslint-disable react/prop-types */
import CommonButton from "../../common/Button";
import CommonInput from "../../common/Input";

const DepartmentForm = ({ formik, status ,loading }) => {
  
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-3">
          <h4 className="text-center mt-2 mb-3">Add Department</h4>
        </div>
        <div className="col-12 col-md-12 col-sm-12">
          <CommonInput
            label={"Name"}
            required={true}
            formik={formik}
            placeholder={"Name"}
            formikName={"name"}
            inputType={"input"}
          />
        </div>
        <div className="col-12 col-md-12 col-sm-12">
          <CommonInput
            label={"Category"}
            required={true}
            formik={formik}
            placeholder={"Category"}
            formikName={"category"}
            inputType={"select"}
            options={[
              {
                label: "Choose Category",
                value: "",
              },
              {
                label: "Undergraduate",
                value: "Undergraduate",
              },
              {
                label: "Postgraduate",
                value: "Postgraduate",
              },
              {
                label: "Research",
                value: "Research",
              },
            ]}
          />
        </div>
        <div className="col-12 col-md-12 col-sm-12">
          <CommonInput
            label={"Status"}
            required={true}
            formik={formik}
            placeholder={"status"}
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
        </div>
        <CommonButton antdBtn={true} text={"Submit"} mb={"mb-3"} mt={"mt-3"} loading={loading} htmlType={"submit"}/>
      </form>
    </>
  );
};

export default DepartmentForm;
