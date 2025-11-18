import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import * as yup from "yup";
import { getOneData, postData, postOneData } from "../../services/apiRequest";
import { ToastSuccess } from "../../components/common/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import AdminUserForm from "../../components/form/AdminUserForm";
import errorHandler from "../../services/errorHandler";

// admin add and edit page
const AddAdminUser = () => {
  const { id } = useParams();

  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    username: "",
    password: "",
  };

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      if (fetchedData) {
        setLoading(true);
        const response = await postOneData("adminuser", values, id);
        if (response?.status == 200) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/adminuser");
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
      } else {
        setLoading(true);
        const response = await postData("adminuser", values);
        if (response?.status == 201) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/adminuser");
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const emailValidation = yup.object().shape({
    name: yup.string().required("Required"),
    username: yup.string().required("Required"),
    status: fetchedData
      ? yup
          .string()
          .oneOf(["true", "false"], "Choose Active or Inactive")
          .required("Required")
      : yup.mixed().notRequired(), // Optional if vals is not present
    password: fetchedData
      ? yup.mixed().notRequired()
      : yup.string().required("Required"),
  });

  useEffect(() => {
    const data = async () => {
      if (id) {
        const res = await getOneData("adminuser", id);
        setFetchedData({
          name: res?.data?.name,
          username: res?.data?.username,
          status: res?.data?.status ? "true" : "false",
        });
      }
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={fetchedData ? "Edit Admin User" : "Add Admin User"}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        validationSchema={emailValidation}
        FormComponent={AdminUserForm}
        values={fetchedData}
        loading={loading}
        size={2}
        front={false}
        inModal={false}
      />
    </>
  );
};

export default AddAdminUser;
