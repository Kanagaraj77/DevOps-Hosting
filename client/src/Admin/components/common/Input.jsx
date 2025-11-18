import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import { ErrorMessage } from "formik";
import JoditEditor from "jodit-react";
import { debounce } from "lodash";

const CommonInput = ({
  label,
  required,
  formik,
  placeholder,
  formikName,
  inputType,
  options,
  disabled,
  mode,
  joditRef,
  config1,
}) => {
  return (
    <>
      <label className="form-label mb-2" hidden={inputType === "checkbox"}>
        {label}{" "}
        <span className="form-req" hidden={!required}>
          *
        </span>
      </label>

      {/* input tag  */}
      <input
        className={`form-control ${
          formik?.touched?.[formikName] && formik?.errors?.[formikName]
            ? "userformhead__error is-invalid"
            : null
        }`}
        placeholder={placeholder}
        value={formik?.values?.[formikName]}
        {...formik.getFieldProps(`${formikName}`)}
        hidden={inputType !== "input"}
        disabled={disabled}
      ></input>

      {/* select tag  */}
      <select
        hidden={inputType !== "select"}
        className={`form-control ${
          formik?.touched?.[formikName] && formik?.errors?.[formikName]
            ? "userformhead__error is-invalid"
            : null
        }`}
        value={formik.values[formikName] || ""}
        onChange={(e) => formik.setFieldValue(formikName, e.target.value)}
        onBlur={formik.handleBlur}
        disabled={disabled}
      >
        {options?.map((option, index) => (
          <option key={index} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>

      {inputType == "date" && (
        <DatePicker
          required={required}
          onChange={(date, ds) => formik.setFieldValue(formikName, date)}
          className={`form-control ${
            formik?.touched?.[formikName] && formik?.errors?.[formikName]
              ? "userformhead__error is-invalid"
              : null
          }`}
          placeholder="Date"
          format="DD-MM-YYYY"
          value={
            formik?.values?.[formikName]
              ? dayjs(formik?.values?.[formikName])
              : null
          }
        />
      )}

      {/* textarea  */}
      <textarea
        className={`form-control ${
          formik?.touched?.[formikName] && formik?.errors?.[formikName]
            ? "userformhead__error is-invalid"
            : null
        }`}
        placeholder={placeholder}
        value={formik?.values?.[formikName]}
        {...formik.getFieldProps(`${formikName}`)}
        hidden={inputType !== "textarea"}
        disabled={disabled}
      ></textarea>

      {/* antd  select  */}
      <Select
        showSearch
        mode={mode}
        value={formik?.values?.[formikName] || null}
        className={`form-control form__antd__select ${
          mode === "single" && "form__antd__select_single"
        } ${mode == null && "form__antd__select_single"} ${
          formik?.touched?.[formikName] && formik?.errors?.[formikName]
            ? "userformhead__error is-invalid"
            : null
        }`}
        placeholder={placeholder}
        onChange={(val) => formik.setFieldValue(formikName, val)}
        // onBlur={() => formik.setFieldTouched(formikName, true)}
        options={options?.map((val) => ({
          value: val?.value,
          label: val?.label,
        }))}
        filterOption={(input, option) =>
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        hidden={inputType !== "antdselect"}
        disabled={disabled}
      />

      {/* antd password  */}
      {inputType === "antdpass" && (
        <Input.Password
          className={`form-control Form-password ${
            formik?.touched?.[formikName] && formik?.errors?.[formikName]
              ? "is-invalid"
              : ""
          }`}
          placeholder="Password"
          {...formik.getFieldProps("password")}
          disabled={disabled}
        />
      )}

      {/* jodit editor  */}
      {inputType === "editor" && (
        <JoditEditor
          ref={joditRef}
          value={formik?.values?.[formikName]}
          className={`${
            formik?.touched?.[formikName] && formik?.errors?.[formikName]
              ? "userformhead__error__quill is-invalid"
              : null
          }`}
          onBlur={debounce((value) => {
            formik.setFieldValue(`${formikName}`, value);
          }, 300)}
          config={config1}
        />
      )}

      {/* checkbox  */}
      <>
        <input
          type="checkbox"
          checked={formik?.values?.[formikName]}
          {...formik?.getFieldProps(`${formikName}`)}
          disabled={disabled}
          hidden={inputType !== "checkbox"}
        />
        <label className="ms-2" hidden={inputType !== "checkbox"}>
          For Mobile Banner &nbsp;
        </label>
      </>
      <ErrorMessage
        name={`${formikName}`}
        component="div"
        className="userformhead__formErr"
      />
    </>
  );
};

export default CommonInput;
