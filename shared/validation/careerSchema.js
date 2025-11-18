import * as yup from "yup";
export const careerSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  qualification: yup.string().required("Qualification is required"),
  experience: yup.string().required("Experience is required"),
  intro: yup
    .string()
    .required("Intro is required")
    .max(150, "Intro must be at most 150 characters"),
  location: yup.string().required("Location is required"),
  openings: yup.string().required("Openings is required"),
  salary: yup.string().required("Salary is required"),
  roles: yup.string().required("Roles is required"),
  skills: yup.string().required("Skills is required"),
  jobdescription: yup.string().required("Jd is required"),
  status: yup.string().required("Status is required"),
});
