import * as yup from "yup";

const departmentDetailsSchema = yup.object().shape({
  department: yup.string().required("Department is required."),
  details: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Title is Required"),
      value: yup.string().required("Description is Required"),
    })
  ),
});

export default departmentDetailsSchema;
