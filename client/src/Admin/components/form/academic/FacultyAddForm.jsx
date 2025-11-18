import CommonButton from "../../common/Button";
import CommonInput from "../../common/Input";
import CommonUpload from "../../common/Upload";
import { useEffect, useState, useRef, useMemo } from "react";
import config from "../../../../config";
import {getData} from "../../../services/apiRequest";

const FacultyAddForm = ({ formik, status, loading, values }) => {
  const [departments, setDepartments] = useState([]);

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
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.content || '',
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
            url: `${config.pdf}${resp.url}`,
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


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getData("department");
        if (response?.status === 200) {
          const deptOptions = response.data.map((dept) => ({
            label: dept.name,
            value: dept._id,
          }));
          setDepartments([{ label: "Select Department", value: ""}, ...deptOptions]);
        } else {
          setDepartments([{ label: "Failed to load departments", value: ""}]);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([{ label: "Failed to load departments", value: "" }]);
      }
    };
    fetchDepartments();
  }, []);

  const statusOptions = [
    { label: "Select Status", value: "" },
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ];

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {console.log(formik.values)}
        <div className="row">
          <div className="col-4 col-md-4 col-sm-12 col-xs-12">
          <CommonInput
            label={"Employee ID"}
            required={true}
            formik={formik}
            placeholder={"Employee ID"}
            formikName={"employeeId"}
            inputType={"input"}
          />
          </div>
          <div className="col-4 col-md-4 col-sm-12 col-xs-12">
            <CommonInput
              label={"Faculty Name"}
              required={true}
              formik={formik}
              placeholder={"Faculty Name"}
              formikName={"name"}
              inputType={"input"}
            />
          </div>
          <div className="col-4 col-md-4 col-sm-12 col-xs-12">
          <CommonInput
            label={"Department"}
            required={true}
            formik={formik}
            placeholder={"Select Department"}
            formikName={"department"}
            inputType={"select"}
            options={departments}
          />

          </div>
        </div>
        <div className="row">
          <div className="col-4 col-md-4 col-sm-12 col-xs-12">
            <CommonInput
              label={"Qualification"}
              required={true}
              formik={formik}
              placeholder={"Qualification"}
              formikName={"qualification"}
              inputType={"input"}
            />
          </div>
          <div className="col-4 col-md-4 col-sm-12 col-xs-12">
            <CommonInput
              label={"Designation"}
              required={true}
              formik={formik}
              placeholder={"Designation"}
              formikName={"designation"}
              inputType={"input"}
            />
          </div>
          <div className="col-4 col-md-4 col-sm-12 col-xs-12">
            <CommonInput
              label={"Status"}
              required={true}
              formik={formik}
              placeholder={"status"}
              formikName={"status"}
              inputType={"select"}
              options={statusOptions}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-12 col-sm-12 col-xs-12">
          <CommonInput
              label={"Description"}
              formik={formik}
              placeholder={"Description"}
              formikName={"description"}
              inputType={"editor"}
              joditRef={jodit}
              config1={config1}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 col-md-4 col-sm-12 col-xs-12">
          <CommonUpload
              label={"Profile Photo"}
              name="image"
              limit={1}
              required={true}
              formik={formik}
              existingImages={formik.values.image}
              pdfimagepathname={"profile"}
              formikName={"image"}
              settingname={"faculties"}
            />
          </div>
        </div>
        <div style={{ width: "250px" }}>
          <CommonButton
            className={"add__button3"}
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

export default FacultyAddForm;
