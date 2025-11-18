import * as yup from 'yup';
export const facultySchema = yup.object().shape({
    name: yup.string().required("Required"),
    employeeId: yup.string().required("Required"),
    designation: yup.string().required("Required"),
    qualification: yup.string().required("Required"),
    // image: yup.array().min(1, "Please upload at least one file").required("Required"),
});
