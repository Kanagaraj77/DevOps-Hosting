import CommonButton from "../../common/Button";
import CommonInput from "../../common/Input";

const GalleryCategoryForm = ({ formik, status, loading, modalHeading }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <h4 className="text-center mt-2">{modalHeading}</h4>
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
        <div className="col-12 col-md-12 col-sm-12 mb-3" hidden={!status}>
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
        </div>
        <div className="form_btn_div">
          <CommonButton
            antdBtn={true}
            text={"Submit"}
            mb={"mb-3"}
            loading={loading}
            htmlType={"submit"}
          />
        </div>
      </form>
    </>
  );
};

export default GalleryCategoryForm;
