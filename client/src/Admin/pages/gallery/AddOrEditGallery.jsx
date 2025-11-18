import { useEffect, useState } from "react";
import { getOneData, postData, postOneData } from "../../services/apiRequest";

import { useNavigate, useParams } from "react-router-dom";
import config from "../../../config";
import { ToastError, ToastSuccess } from "../../components/common/ToastMsg";
import FormLayout from "../../components/common/FormLayout";
import GalleryForm from "../../components/form/gallery/GalleryForm";
import { gallerySchema } from "../../../../../shared/validation/gallerySchema";
import errorHandler from "../../services/errorHandler";

const AddOrEditGallery = () => {
  const { id } = useParams();

  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    images: [],
    status: true,
  };

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      if (fetchedData) {
        setLoading(true);
        values.images = values?.images?.map((img) => {
          if (typeof img === "string") {
            return img;
          } else {
            return img?.url
              ? img?.url.replace(`${config?.file}/gallery/`, "")
              : img?.response?.file?.filename;
          }
        });
        const response = await postOneData("gallery", values, id);
        if (response?.status == 200) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/gallerys");
          setLoading(false);
        } 
        errorHandler(response, ToastError, setLoading);
      } else {
        setLoading(true);
        values.images = values?.images?.map((img) => {
          if (typeof img === "string") {
            return img;
          } else {
            return img?.url
              ? img?.url.replace(`${config?.file}/gallery/`, "")
              : img?.response?.file?.filename;
          }
        });
        const response = await postData("gallery", values);
        if (response?.status == 201) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/gallerys");
          setLoading(false);
        } else if (response?.status == 409) {
          ToastError(response?.response?.data?.message || "Error");
          setLoading(false);
        } 
        errorHandler(response, ToastError, setLoading);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const data = async () => {
      if (id) {
        const res = await getOneData("gallery", id);
        setFetchedData({
          name: res?.data?.name,
          images: res?.data?.images,
          status: res?.data?.status ? "true" : "false",
        });
      }
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={fetchedData ? "Edit Gallery" : "Add Gallery"}
        initialValues={fetchedData ? fetchedData : initialValues}
        status={fetchedData ? true : false}
        handlesubmit={handlesubmit}
        validationSchema={gallerySchema}
        FormComponent={GalleryForm}
        values={fetchedData}
        loading={loading}
        size={2}
        front={false}
        inModal={false}
      />
    </>
  );
};

export default AddOrEditGallery;
