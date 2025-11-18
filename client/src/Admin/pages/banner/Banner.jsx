import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData, postData } from "../../services/apiRequest";
import { ToastError, ToastSuccess } from "../../components/common/ToastMsg";
import BannerForm from "../../components/form/BannerForm";
import { bannerSchema } from "../../../../../shared/validation/bannerSchema";
import errorHandler from "../../services/errorHandler"; 

// admin add and edit page
const Banner = () => {
  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    banner: [{ img: [], url: "", mobile: false }],
  };

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      if (values && values?.banner) {
        values?.banner?.map((images) => {
          if (typeof images.img === "string") {
            return images.img;
          }
          images.img = images?.img
            ?.map((img) => {
              if (typeof img === "string") {
                return img;
              } else {
                return img?.url
                  ? img?.url.replace(`${config?.file}/banner/`, "")
                  : img?.response?.file?.filename;
              }
            })
            .join(", ");
        });
      }
      const response = await postData("banner", values);

      if (response.status === 200 || response.status === 201) {
        ToastSuccess(response.data.message);
      } 
      errorHandler(response, ToastError, setLoading);
    } catch (error) {
      console.log(error);
      ToastError(error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const data = async () => {
      const res = await getData("banner");
      if (res?.data?.[0]?.banner?.length > 0) {
        setFetchedData({
          banner: res?.data?.[0]?.banner,
        });
      } else {
        setFetchedData({
          banner: [{ img: [], url: "", mobile: false }],
        });
      }
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Banner"}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        validationSchema={bannerSchema}
        FormComponent={BannerForm}
        values={fetchedData}
        loading={loading}
        size={2}
        front={false}
        inModal={false}
      />
    </>
  );
};

export default Banner;
