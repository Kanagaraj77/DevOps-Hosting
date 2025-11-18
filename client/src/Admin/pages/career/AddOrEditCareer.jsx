import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getOneData, postData, postOneData } from "../../services/apiRequest";
import { ToastSuccess } from "../../components/common/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import CareerForm from "../../components/form/CareerForm";
import { careerSchema } from "../../../../../shared/validation/careerSchema";
import errorHandler from "../../services/errorHandler";

// admin add and edit page
const AddOrEditCareer = () => {
  const { id } = useParams();

  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    title: "",
    qualification: "",
    intro: "",
    location: "",
    experience: "",
    openings: "",
    salary: "",
    shift: "",
    jobtype: "",
    benefit: "",
    paytype: "",
    roles: "",
    skills: "",
    jobdescription: "",
    status: true,
  };

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      if (fetchedData) {
        setLoading(true);
        const response = await postOneData("career", values, id);
        if (response?.status == 200) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/career");
          setLoading(false);
        } 
        errorHandler(response, ToastError, setLoading);
      } else {
        setLoading(true);
        const response = await postData("career", values);
        if (response?.status == 201) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/career");
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
        const res = await getOneData("career", id);
        setFetchedData({
          title: res?.data?.title,
          qualification: res?.data?.qualification,
          location: res?.data?.location,
          intro: res?.data?.intro,
          experience: res?.data?.experience,
          openings: res?.data?.openings,
          salary: res?.data?.salary,
          shift: res?.data?.shift,
          jobtype: res?.data?.jobtype,
          benefit: res?.data?.benefit,
          paytype: res?.data?.paytype,
          roles: res?.data?.roles,
          skills: res?.data?.skills,
          jobdescription: res?.data?.jobdescription,
          status: res?.data?.status ? "true" : "false",
        });
      }
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={fetchedData ? "Edit Career" : "Add Career"}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        FormComponent={CareerForm}
        validationSchema={careerSchema}
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

export default AddOrEditCareer;
