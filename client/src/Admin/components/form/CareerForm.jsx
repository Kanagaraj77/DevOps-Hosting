import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import { useMemo, useRef } from "react";
import config from "../../../config";

const CareerForm = ({ formik, loading, status }) => {
  const jodit = useRef(null);
  const config1 = useMemo(
    () => ({
      zIndex: 0,
      readonly: false,
      activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
      toolbarButtonSize: "middle",
      theme: "default",
      enableDragAndDropFileToEditor: true,
      saveModeInCookie: false,
      spellcheck: true,
      editorCssClass: false,
      triggerChangeEvent: true,
      height: 450,
      direction: "ltr",
      language: "pt_BR",
      debugLanguage: false,
      i18n: "en",
      tabIndex: -1,
      toolbar: true,
      enter: "P",
      useSplitMode: true,
      colorPickerDefaultTab: "text",
      imageDefaultWidth: 100,
      removeButtons: ["about", "print", "file"],
      disablePlugins: ["paste", "stat"],
      events: {},
      textIcons: false,
      uploader: {
        url: `${config.apiUrl}/editor/editor-upload`,
        format: "json",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]'),
        },
        data: {
          csrf: document.querySelector('meta[name="csrf-token"]'),
        },
        isSuccess: function (resp) {
          return !resp.error;
        },
        getMessage: function (resp) {
          return resp.msg;
        },
        process: function (resp) {
          return {
            url: `${config.pdf}${resp.url}`, // Assuming your response object has a 'url' field
            error: resp.error,
            msg: resp.msg,
          };
        },
        defaultHandlerSuccess: function (data, resp) {
          if (data.url) {
            this.s.insertImage(data.url);
          }
        },
        error: function (e) {
          this.message.message(e.getMessage(), "error", 4000);
        },
      },
    }),
    []
  );
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mt-5">
        <div className="row">
          <div className="col-12 col-md-4 col-sm-12 mb-3">
            <CommonInput
              label={"Title"}
              required={true}
              formik={formik}
              placeholder={"Title"}
              formikName={"title"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-md-4 col-sm-12 mb-3">
            <CommonInput
              label={"Qualification"}
              required={true}
              formik={formik}
              placeholder={"Qualification"}
              formikName={"qualification"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-md-4 col-sm-12 mb-3">
            <CommonInput
              label={"Experience"}
              required={true}
              formik={formik}
              placeholder={"Experience"}
              formikName={"experience"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-md-12 col-sm-12 mb-3">
            <CommonInput
              label={"Intro"}
              required={true}
              formik={formik}
              placeholder={"Intro"}
              formikName={"intro"}
              inputType={"textarea"}
            />
          </div>

          <div className="col-12 col-md-12 col-sm-12 mb-3">
            <CommonInput
              label={"Roles"}
              required={true}
              formik={formik}
              placeholder={"Roles"}
              formikName={"roles"}
              inputType={"editor"}
              joditRef={jodit}
              config1={config1}
            />
          </div>
          <div className="col-12 col-md-12 col-sm-12 mb-3">
            <CommonInput
              label={"Skills"}
              required={true}
              formik={formik}
              placeholder={"Skills"}
              formikName={"skills"}
              inputType={"editor"}
              joditRef={jodit}
              config1={config1}
            />
          </div>
          <div className="col-12 col-md-12 col-sm-12 mb-3">
            <CommonInput
              label={"Job Description"}
              required={true}
              formik={formik}
              placeholder={"Job Description"}
              formikName={"jobdescription"}
              inputType={"editor"}
              joditRef={jodit}
              config1={config1}
            />
          </div>

          <div className="col-12 col-md-3 col-sm-12 mb-3">
            <CommonInput
              label={"No. of Openings"}
              required={true}
              formik={formik}
              placeholder={"No. of Openings"}
              formikName={"openings"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-md-3 col-sm-12 mb-3">
            <CommonInput
              label={"Salary"}
              required={true}
              formik={formik}
              placeholder={"Salary"}
              formikName={"salary"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-md-3 col-sm-12 mb-3">
            <CommonInput
              label={"Location"}
              required={true}
              formik={formik}
              placeholder={"Location"}
              formikName={"location"}
              inputType={"input"}
            />
          </div>
          <div className="col-12 col-md-3 col-sm-12 mb-3">
            <CommonInput
              label={"Shift"}
              formik={formik}
              placeholder={"Shift"}
              formikName={"shift"}
              inputType={"input"}
            />
          </div>

          <div
            className={`col-12 ${
              status ? "col-md-3" : "col-md-4"
            } col-sm-12 mb-3`}
          >
            <CommonInput
              label={"Job-type"}
              formik={formik}
              placeholder={"Job-type"}
              formikName={"jobtype"}
              inputType={"input"}
            />
          </div>
          <div
            className={`col-12 ${
              status ? "col-md-3" : "col-md-4"
            } col-sm-12 mb-3`}
          >
            <CommonInput
              label={"Benefit"}
              formik={formik}
              placeholder={"Benefit"}
              formikName={"benefit"}
              inputType={"input"}
            />
          </div>
          <div
            className={`col-12 ${
              status ? "col-md-3" : "col-md-4"
            } col-sm-12 mb-3`}
          >
            <CommonInput
              label={"Pay-type"}
              formik={formik}
              placeholder={"Pay-type"}
              formikName={"paytype"}
              inputType={"input"}
            />
          </div>
          <div className={`col-12 col-md-3 col-sm-12 mb-3`} hidden={!status}>
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

export default CareerForm;
