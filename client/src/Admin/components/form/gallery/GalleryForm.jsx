import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import CommonInput from "../../common/Input";
import CommonUpload from "../../common/Upload";
import CommonButton from "../../common/Button";
import { getData } from "../../../services/apiRequest";
import config from "../../../../config";

const GalleryForm = ({ formik, status, loading }) => {
  const [cat, setCat] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const data = async () => {
      const res = await getData("gallerycategory");
      setCat(
        id
          ? res?.data?.filter(
              (obj) => obj?._id === formik?.values?.name || obj?.status
            )
          : res?.data?.filter((item) => item?.status)
      );
    };
    data();
  }, []);

  const fn = (formik) => {
    const images = formik?.values?.images;
    if (Array.isArray(images)) {
      // Case 1: Direct array of images
      const val = images.map((img) => {
        if (typeof img === "string") {
          return img;
        } else {
          return img?.url
            ? img?.url?.replace(`${config?.file}/gallery/`, "")
            : img?.response?.file?.filename;
        }
      });
      const imgval = val.map((url) => ({ url }));
      return imgval;
    } else {
      // Handle other cases or return a default value
      return [];
    }
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 col-sm-12 mb-3">
            <CommonInput
              label={"Name"}
              required={true}
              formik={formik}
              placeholder={"Name"}
              formikName={"name"}
              inputType={"antdselect"}
              mode={null}
              options={cat?.map((to, index) => ({
                label: to?.name,
                value: to?._id,
              }))}
            />
          </div>
          <div className="col-12 col-md-6 col-sm-12 mb-3 " hidden={!status}>
            <CommonInput
              label={"Status"}
              required={true}
              formik={formik}
              placeholder={"Email"}
              formikName={"status"}
              inputType={"select"}
              options={[
                {
                  label: "Select Status",
                  value: "",
                },
                {
                  label: "Active",
                  value: "true",
                },
                {
                  label: "Inactive",
                  value: "false",
                },
              ]}
            />
          </div>
          <div>
            <label className="form-label mb-2">
              Images <span className="form-req">*</span>
            </label>
            <CommonUpload
              formik={formik}
              name="images"
              limit={Infinity}
              existingImages={fn(formik)}
              pdfimagepathname={"gallery"}
              settingname={"gallery"}
              id={id}
            />
          </div>
        </div>

        <div className={`col-2 mt-3 submit_btn_head`}>
          <CommonButton
            antdBtn={true}
            text={"Submit"}
            mb={"mb-3"}
            mt={"mt-3"}
            loading={loading}
            htmlType={"submit"}
          />
        </div>
      </form>
    </>
  );
};

export default GalleryForm;
