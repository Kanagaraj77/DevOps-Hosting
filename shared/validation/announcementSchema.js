import * as yup from "yup";
export const announcementSchema = yup.object().shape({
  content: yup
    .string()
    .required("Content is required")
    .max(120, "Content must be at most 120 characters"),
    status: yup.boolean().required("Status is required")
});
