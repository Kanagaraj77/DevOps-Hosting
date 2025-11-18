import * as yup from "yup";
export const careerSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().required("Required").email("Invalid email"),
  phone: yup.string().required("Required"),
  applyfor: yup.string().required("Required"),
  experience: yup.string().required("Required"),
  comment: yup.string().required("Required"),
//   resume:
});
