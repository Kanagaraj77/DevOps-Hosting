import * as yup from "yup";
export const galleryCategorySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  status: yup.boolean().required("Status is required")
});
