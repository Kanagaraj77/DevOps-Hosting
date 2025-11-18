import * as yup from "yup";
export const popupSchema = yup.object().shape({
  img: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      (value) =>
        typeof value === "string" || (Array.isArray(value) && value.length > 0)
    ),
  status: yup.boolean().required("Status is required"),
});
