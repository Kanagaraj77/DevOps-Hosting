import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import { useMemo, useRef } from "react";
import config from "../../../config";
import CommonUpload from "../common/Upload";

const EventForm = ({ formik, status, loading, values }) => {
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
        {console.log(formik.values)}
        <div className="row">
          <div
            className={`col-12 col-md-6 col-sm-12 mb-3`}
          >
            <CommonInput
              label={"Title"}
              required={true}
              formik={formik}
              placeholder={"Title"}
              formikName={"title"}
              inputType={"input"}
            />
          </div>
          <div
            className={`col-12 col-md-6 col-sm-12 mb-3`}
          >
            <CommonInput
              label={"Date"}
              required={true}
              formik={formik}
              placeholder={"Title"}
              formikName={"date"}
              inputType={"date"}
            />
          </div>
          <div
            className={`col-12 col-md-6 col-sm-12 mb-3`}
          >
            <CommonInput
              label={"Category"}
              required={true}
              formik={formik}
              placeholder={"Category"}
              formikName={"category"}
              inputType={"antdselect"}
              options={[
                {
                  label: "Select Category",
                  value: "",
                },
                {
                  label: "Event",
                  value: "event",
                },
                {
                  label: "Announcement",
                  value: "news",
                },
                {
                  label: "Highlight",
                  value: "highlight",
                },
              ]}
              mode={null}
            />
          </div>
          <div
            className={`col-12 col-md-6 col-sm-12 mb-3`}
          >
            <CommonInput
              label={"Location"}
              formik={formik}
              placeholder={"Location"}
              formikName={"location"}
              inputType={"input"}
              mode={null}
            />
          </div>
          <div className={`col-12 col-md-6 col-sm-12 mb-3`} hidden={!status}>
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
              label={"Description"}
              required={true}
              formik={formik}
              placeholder={"Description"}
              formikName={"description"}
              inputType={"editor"}
              joditRef={jodit}
              config1={config1}
            />
          </div>
          <div className="col-12 col-md-4 col-sm-12 mb-3">
            <CommonInput
              label={"Page Title"}
              required={false}
              formik={formik}
              placeholder={"Page Title"}
              formikName={"pagetitle"}
              inputType={"textarea"}
            />
          </div>
          <div className="col-12 col-md-4 col-sm-12 mb-3">
            <CommonInput
              label={"Meta description"}
              required={false}
              formik={formik}
              placeholder={"Meta description"}
              formikName={"metades"}
              inputType={"textarea"}
            />
          </div>
          <div className="col-12 col-md-4 col-sm-12 mb-3">
            <CommonInput
              label={"Meta Keyword"}
              required={false}
              formik={formik}
              placeholder={"Meta Keyword"}
              formikName={"metakey"}
              inputType={"textarea"}
            />
          </div>
          <div>
            <label className="form-label mb-2">
              Images <span className="form-req">*</span>
            </label>
            <CommonUpload
              formik={formik}
              name="images"
              limit={1}
              existingImages={formik.values.images}
              pdfimagepathname={"event"}
              settingname={"event"}
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

export default EventForm;
