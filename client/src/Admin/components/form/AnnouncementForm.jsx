import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import CommonUpload from "../common/Upload";

const AnnouncementForm = ({ formik, loading }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mt-5">
        <div className="row">
          <div className="col-12 col-md-12 mb-3">
            <CommonInput
              inputType="textarea"
              formikName={`content`}
              formik={formik}
              label={"Content"}
            />
          </div>
          <div className="col-12 col-md-6">
            <CommonInput
              inputType="input"
              formikName={`url`}
              formik={formik}
              label={"URL"}
            />
          </div>
          <div className="col-12 col-md-6">
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

export default AnnouncementForm;
