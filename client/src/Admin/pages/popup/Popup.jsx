import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData, postData } from "../../services/apiRequest";
import { ToastError, ToastSuccess } from "../../components/common/ToastMsg";
import { bannerSchema } from "../../../../../shared/validation/bannerSchema";
import PopupForm from "../../components/form/PopupForm";
import { popupSchema } from "../../../../../shared/validation/popupSchema";
import errorHandler from "../../services/errorHandler";

// admin add and edit page
const Popup = () => {
  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    img: [],
    url: "",
    status: true,
  };

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const img1 = values?.img?.map((val) =>
        val.url ? val.url : val.response.file.filename
      );
      const imgString = img1.join(", ");

      const response = await postData("popup", {
        ...values,
        img: imgString,
      });

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
      const res = await getData("popup");

      setFetchedData({
        img: res?.data?.[0]?.img?.split(",")?.map((url) => ({ url })),
        url: res?.data?.[0]?.url,
        status: res?.data?.length > 0 ? (res?.data?.[0]?.status ? "true" : "false") : null,
      });
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Add Popup"}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        validationSchema={popupSchema}
        FormComponent={PopupForm}
        values={fetchedData}
        loading={loading}
        size={2}
        front={false}
        inModal={false}
      />
    </>
  );
};

export default Popup;
