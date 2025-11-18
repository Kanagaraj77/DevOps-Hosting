import * as yup from "yup";
export const bannerSchema = yup.object().shape({
  banner: yup.array().of(
    yup.object().shape({
      img: yup
        .mixed()
        .test(
          "required",
          "Image is required",
          (value) =>
            typeof value === "string" ||
            (Array.isArray(value) && value.length > 0)
        ),
    })
  ),
});
