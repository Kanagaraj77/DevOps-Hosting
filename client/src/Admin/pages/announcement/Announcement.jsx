import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData, postData } from "../../services/apiRequest";
import { ToastError, ToastSuccess } from "../../components/common/ToastMsg";
import { bannerSchema } from "../../../../../shared/validation/bannerSchema";
import AnnouncementForm from "../../components/form/AnnouncementForm";
import { announcementSchema } from "../../../../../shared/validation/announcementSchema";
import errorHandler from "../../services/errorHandler";

// admin add and edit page
const Announcement = () => {
  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    img: [],
    url: "",
    status: "",
  };

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const response = await postData("announcement", values);

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
      const res = await getData("announcement");

      setFetchedData({
        content: res?.data?.[0]?.content,
        url: res?.data?.[0]?.url,
        status: res?.data?.[0]?.status ? "true" : "false",
      });
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Announcement"}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        validationSchema={announcementSchema}
        FormComponent={AnnouncementForm}
        values={fetchedData}
        loading={loading}
        size={2}
        front={false}
        inModal={false}
      />
    </>
  );
};

export default Announcement;
