import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import CommonUpload from "../common/Upload";

const PopupForm = ({ formik, loading }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mt-5">
        <div className="row">
          <>
            <div className="col-12 col-md-4">
              <div>
                <CommonUpload
                  formik={formik}
                  name={`img`}
                  limit={1}
                  existingImages={
                    formik?.values?.img ? formik?.values?.img : ""
                  }
                  pdfimagepathname={"popup"}
                  settingname={"popup"}
                />
              </div>
              <div className="mt-3">
                <CommonInput
                  inputType="input"
                  formikName={`url`}
                  formik={formik}
                  label={"URL"}
                />
              </div>
              <div className="mt-3">
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
            </div>
          </>
        </div>

        <div className="form_btn_div">
          <CommonButton
            antdBtn={true}
            text={"Submit"}
            mb={"mb-3"}
            mt={"mt-3"}
            loading={loading}
            htmlType={"submit"}
          />
        </div>
      </form>
    </>
  );
};

export default PopupForm;
