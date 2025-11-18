import * as yup from 'yup';



const departmentSchema = yup.object().shape({
    name: yup
    .string()
    .trim("Remove leading and trailing whitespaces")
    .strict()
    .min(3, 'Department name must be at least 3 characters long.')
    .max(60, 'Department name cannot exceed 50 characters.')
    .matches(/^[a-zA-Z0-9.-\s]+$/, 'Department name can only contain letters, numbers, dot, hyphen and spaces.')
    .required('Department name is required.'),
    category: yup
    .string()
    .required("Category is required")
    .oneOf(["Undergraduate", "Postgraduate", "Research"], "Invalid category"),
    status: yup.boolean().required("Status is required")
});

export default departmentSchema;