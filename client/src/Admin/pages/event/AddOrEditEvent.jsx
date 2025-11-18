import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getOneData, postData, postOneData } from "../../services/apiRequest";
import { ToastSuccess } from "../../components/common/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../../components/form/EventForm";
import { eventSchema } from "../../../../../shared/validation/eventSchema";
import errorHandler from "../../services/errorHandler";
import { date } from "yup";

// admin add and edit page
const AddOrEditEvent = () => {
  const { id } = useParams();

  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    title: "",
    category: "",
    date :"",
    intro: "",
    description: "",
    images: [],
    status: true,
  };

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      if (fetchedData) {
        setLoading(true);
        const img1 = values.images.map((val) =>
          val.url ? val.url : val.response.file.filename
        );
        const imgString = img1.join(", ");
        const response = await postOneData(
          "event",
          {
            ...values,
            images: imgString,
          },
          id
        );
        if (response?.status == 200) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/events");
          setLoading(false);
        } errorHandler(response, ToastError, setLoading);
      } else {
        setLoading(true);
        const img1 = values.images.map((val) =>
          val.url ? val.url : val.response.file.filename
        );
        const imgString = img1.join(", ");
        const response = await postData("event", {
          ...values,
          images: imgString,
        });
        if (response?.status == 201) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/events");
          setLoading(false);
        } errorHandler(response, ToastError, setLoading);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };



  useEffect(() => {
    const data = async () => {
      if (id) {
        const res = await getOneData("event", id);
        setFetchedData({
          title: res?.data?.title,
          category: res?.data?.category,
          date: res?.data?.date,
          intro: res?.data?.intro,
          images: res?.data?.images ? res?.data?.images.split(",").map((url) => ({ url })) : res?.data?.images,
          pagetitle: res?.data?.pagetitle,
          description: res?.data?.description,
          metades: res?.data?.metades,
          metakey: res?.data?.metakey,
          status: res?.data?.status ? "true" : "false",
        });
      }
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={fetchedData ? "Edit Event" : "Add Event"}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        FormComponent={EventForm}
        validationSchema={eventSchema}
        values={fetchedData}
        loading={loading}
        size={2}
        front={false}
        inModal={false}
        status={fetchedData ? true : false}
      />
    </>
  );
};

export default AddOrEditEvent;
