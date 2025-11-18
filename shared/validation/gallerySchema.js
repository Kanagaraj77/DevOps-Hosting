import * as yup from "yup";
export const gallerySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    images: yup.array().min(1, "Please upload at least one file"),
    status: yup.boolean().required("Status is required")
});
