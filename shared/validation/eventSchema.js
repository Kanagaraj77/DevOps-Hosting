import * as yup from "yup";
export const eventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  intro: yup
    .string()
    .required("Intro is required")
    .max(120, "Intro must be at most 120 characters"),
  description: yup.string().required("Description is required"),
  images: yup.array().min(1, "Images is required, Please upload at least one file"),
  status: yup.boolean().required("Status is required")});
