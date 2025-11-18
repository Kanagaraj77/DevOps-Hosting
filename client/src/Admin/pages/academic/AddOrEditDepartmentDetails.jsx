import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getOneData, postData, postOneData } from "../../services/apiRequest";
import { ToastSuccess, ToastError } from "../../components/common/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentDetailsForm from "../../components/form/academic/DepartmentDetailsForm";
import departmentDetailsSchema from "../../../../../shared/validation/departmentDetailsSchema.js";
import errorHandler from "../../services/errorHandler.jsx";

// admin add and edit page
const AddOrEditDepartmentDetails = () => {
  const { id } = useParams();

  const [fetchedValues, setFetchedValues] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    department: "",
    details: [
      {
        title: "",
        value: "",
      },
    ],
  };

  // form
  const handlesubmit = async (values, { resetForm }) => {
    try {
      if (fetchedValues) {
        const response = await postOneData("department-details", values, id);
        if (response?.status == 200) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/department-details");
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await postData("department-details", values);
        if (response?.status == 201) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/department-details");
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const data = async () => {
      if (id) {
        const res = await getOneData("department-details", id);
        // res?.data?.details.forEach((detail) => {
        //   detail.value = sanitizeHtml(detail.value);
        // });
        setFetchedValues({
          department: res?.data?.department,
          details: res?.data?.details,
        });
        console.log(fetchedValues);
      }
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={
          fetchedValues ? "Edit department details" : "Add department details"
        }
        initialValues={fetchedValues ? fetchedValues : initialValues}
        handlesubmit={handlesubmit}
        FormComponent={DepartmentDetailsForm}
        validationSchema={departmentDetailsSchema}
        values={fetchedValues}
        loading={loading}
        size={2}
        front={false}
        inModal={false}
        status={fetchedValues ? true : false}
      />
    </>
  );
};

export default AddOrEditDepartmentDetails;
