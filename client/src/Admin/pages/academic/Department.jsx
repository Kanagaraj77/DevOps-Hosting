import { useEffect, useState } from "react";
import {
  getData,
  getOneData,
  postData,
  postOneData,
} from "../../services/apiRequest";
import FormLayout from "../../components/common/FormLayout";
import  departmentSchema  from "../../../../../shared/validation/departmentSchema";
import DepartmentForm from "../../components/form/academic/DepartmentForm";
import { ToastError, ToastSuccess } from "../../components/common/ToastMsg";
import errorHandler from "../../services/errorHandler";

function Department() {
  const [fetchedData, setFetchedData] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState();
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "departmentId",
      header: "Id",
      defaultWidth: 80,
    },
    { name: "name", header: "Name", defaultFlex: 1 },
    { name: "category", header:"Category", defaultFlex: 1 },
    {
      name: "status",
      header: "Status",
      defaultFlex: 1,
      render: ({ value }) => (value === true ? "Active" : "Inactive"),
    },
    { name: "action", header: "Action", defaultFlex: 1 },
  ];

  useEffect(() => {
    const data = async () => {
      const res = await getData("department");
      setData(res?.data);
    };
    data();
  }, []);

  const initialValues = {
    name: "",
    category: "",
    status: true,
  };

  const handleCancel = (formik, setOpen) => {
    formik.resetForm();
    setOpen(false);
  };
  const handlesubmit = async (values, { resetForm }) => {
    try {
      // for edit
      if (fetchedData !== null) {
        setLoading(true);
        const response = await postOneData("department", values, editData);
        if (response?.status == 201 || response?.status == 200) {
          setOpen(false);
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
      } else {
        // for add
        setLoading(true);
        const response = await postData("department", values);
        console.log("Response",response.status);
        if (response?.status == 201 || response?.status == 200) {
          setOpen(false);
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      ToastError("Bad Request");
    }
  };

  useEffect(() => {
    const data = async () => {
      const res = await getData("department");
      setData(res?.data);
    };
    data();
  }, [open]);

  useEffect(() => {
    const data = async () => {
      if (editData) {
        if (open) {
          const res = await getOneData("department", editData);
          setFetchedData({
            name: res?.data?.name,
            category: res?.data?.category,
            status: res?.data?.status,
          });
        } else {
          setFetchedData(null);
          setEditData(null);
        }
      }
    };
    data();
  }, [editData, open]);

  return (
    <>
      <FormLayout
        heading={"Departments"}
        data={data}
        columns={columns}
        text={"Add Department"}
        open={open}
        setOpen={setOpen}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        inModal={true}
        validationSchema={departmentSchema}
        FormComponent={DepartmentForm}
        setEditData={setEditData}
        values={fetchedData}
        size={2}
        front={true}
        form={true}
        routename={"department"}
        handleCancel={handleCancel}
        edit={"modal"}
      />
    </>
  );
}

export default Department;
