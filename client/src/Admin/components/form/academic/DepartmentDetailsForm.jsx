import { useState, useEffect, useRef, useMemo } from "react";
import { FieldArray } from "formik";
import { Box, Tabs, Tab, Button } from "@mui/material";
import CommonInput from "../../common/Input";
import CommonButton from "../../common/Button";
import config from "../../../../config";
import { FaTrash } from "react-icons/fa";
import _ from "lodash";
import { getData } from "../../../services/apiRequest";
import JoditEditor from "jodit-react"; // Ensure JoditEditor is imported

const DepartmentDetailsForm = ({ loading, formik }) => {
  const jodit = useRef(null);
  // const config1 = useMemo(
  //   () => ({
  //     zIndex: 0,
  //     readonly: false,
  //     activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
  //     toolbarButtonSize: "middle",
  //     theme: "light",
  //     enableDragAndDropFileToEditor: true,
  //     saveModeInCookie: false,
  //     spellcheck: true,
  //     editorCssClass: false,
  //     triggerChangeEvent: true,
  //     height: 450,
  //     direction: "ltr",
  //     language: "pt_BR",
  //     debugLanguage: false,
  //     i18n: "en",
  //     tabIndex: -1,
  //     toolbar: true,
  //     enter: "P",
  //     useSplitMode: false,
  //     colorPickerDefaultTab: "text",
  //     imageDefaultWidth: 100,
  //     removeButtons: ["about", "print", "file"],
  //     disablePlugins: ["paste", "stat"],
  //     textIcons: false,
  //     uploader: {
  //       url: `${config.apiUrl}/editor/editor-upload`,
  //       format: "json",
  //       headers: {
  //         "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]'),
  //       },
  //       data: {
  //         csrf: document.querySelector('meta[name="csrf-token"]'),
  //       },
  //       isSuccess: function (resp) {
  //         return !resp.error;
  //       },
  //       getMessage: function (resp) {
  //         return resp.msg;
  //       },
  //       process: function (resp) {
  //         return {
  //           url: `${config.pdf}${resp.url}`,
  //           error: resp.error,
  //           msg: resp.msg,
  //         };
  //       },
  //       defaultHandlerSuccess: function (data, resp) {
  //         if (data.url) {
  //           this.s.insertImage(data.url);
  //         }
  //       },
  //       error: function (e) {
  //         this.message.message(e.getMessage(), "error", 4000);
  //       },
  //     },
  //   }),
  //   []
  // );


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
      removeButtons: ["about", "print", "file","speechrecongnize"],
      disablePlugins: [ "stat"],
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
  const [activeTab, setActiveTab] = useState(0);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getData("department").then((res) => {
        if (res.status === 200) {
          const departmentsData = res.data.map((item) => ({
            label: item.name,
            value: item._id,
          }));
          setDepartment(departmentsData);
        }
      });
    };
    fetchData();
  }, []);

  // Validation before submit to ensure all editor fields have values
  const handleSubmit = (event) => {
    // Prevent form submission if validation fails
    event.preventDefault(); // Prevent the default form submission and page refresh

    // Check if all details fields have values
    const details = formik.values.details;
    for (let i = 0; i < details.length; i++) {
      if (!details[i].value || details[i].value.trim() === "") {
        // Show the validation alert if the field is empty
        alert(`Please fill the editor content in tab ${i + 1}`);
        return; // Do not proceed with form submission
      }
    }

    // If validation passes, submit the form
    formik.handleSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Department Dropdown */}
        <div className="col-12 col-md-6 mt-3 mb-4">
          <CommonInput
            label={"Department"}
            required={true}
            formik={formik}
            placeholder={"Choose a department"}
            formikName={"department"}
            inputType={"select"}
            options={[{ label: "Choose Department", value: "" }, ...department]}
          />
        </div>

        {/* Tabs for Details */}
        <FieldArray
          name="details"
          render={(arrayHelpers) => (
            <Box sx={{ display: "flex", gap: 5 }}>
              {/* Vertical Tabs */}
              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={(event, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
              >
                {formik.values.details.map((detail, index) => (
                  <Tab
                    key={index}
                    label={
                      _.truncate(detail.title, { length: 15 }) ||
                      `Untitled Panel ${index + 1}`
                    }
                    title={detail.title || `Untitled Panel ${index + 1}`}
                  />
                ))}
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    arrayHelpers.push({ title: "", value: "" });
                    setActiveTab(formik.values.details.length); // Switch to the new tab
                  }}
                >
                  + Add Panel
                </Button>
              </Tabs>

              {/* Tab Content */}
              <div className="panel-details">
                {formik.values.details.map((detail, index) =>
                  activeTab === index ? (
                    <div key={index}>
                      <div className="col-12 col-md-12 mb-3">
                        <CommonInput
                          label={`Title`}
                          required={true}
                          formik={formik}
                          placeholder={"Enter title"}
                          formikName={`details[${index}].title`}
                          inputType={"input"}
                        />
                      </div>
                      <div className="col-12 col-md-12 mb-3">
                        {/* Conditionally render JoditEditor for active tab only */}
                        {activeTab === index && (
                          <JoditEditor
                            ref={jodit}
                            value={formik.values.details[index].value} // Sync with Formik's state
                            onChange={(newValue) => {
                              formik.setFieldValue(
                                `details[${index}].value`,
                                newValue
                              ); // Update Formik's value
                            }}
                            className={`${
                              formik.touched?.details?.[index]?.value &&
                              formik.errors?.details?.[index]?.value
                                ? "userformhead__error__quill is-invalid"
                                : ""
                            }`}
                            config={config1}
                          />
                        )}
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        hidden={index > 0 ? false : true}
                        onClick={() => {
                          if (index > 0) {
                            arrayHelpers.remove(index);
                          }
                          setActiveTab((prev) =>
                            prev >= formik.values.details.length - 1
                              ? prev - 1
                              : prev
                          );
                        }}
                      >
                        <FaTrash />
                        &nbsp;Remove
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            </Box>
          )}
        />

        <div style={{ width: "100px" }} className="mt-5">
          <CommonButton
            text={"Submit"}
            antdBtn={true}
            mb={"mb-3"}
            mt={"mt-3"}
            loading={loading}
            htmlType={"submit"}
          />
        </div>
      </div>
    </form>
  );
};

export default DepartmentDetailsForm;
