import { useEffect, useState } from "react";
import {
  getData,
  getOneData,
  postData,
  postOneData,
} from "../../services/apiRequest";
import FormLayout from "../../components/common/FormLayout";
import GalleryCategoryForm from "../../components/form/gallery/GalleryCategoryForm";
import { ToastError, ToastSuccess } from "../../components/common/ToastMsg";
import { galleryCategorySchema } from "../../../../../shared/validation/galleryCategorySchema";
import errorHandler from "../../services/errorHandler";

const GalleryCategory = () => {
  const [data, setData] = useState([]);
  const [editDataId, setEditDataId] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    status: true,
  };

  const [open, setOpen] = useState(false);

  // table column data
  const columns = [
    {
      name: "galleryCategoryId",
      header: "Id",
      defaultVisible: true,
      defaultWidth: 80,
      type: "number",
    },
    { name: "name", header: "Name", defaultFlex: 1 },
    {
      name: "status",
      header: "Status",
      defaultFlex: 1,
      render: ({ value }) => (value === true ? "Active" : "Inactive"),
    },
    { name: "action", header: "Action", defaultFlex: 1 },
  ];

  // form

  const handlesubmit = async (values, { resetForm }) => {
    try {
      // for edit
      if (fetchedData !== null) {
        setLoading(true);
        const response = await postOneData(
          "gallerycategory",
          values,
          editDataId
        );
        if (response?.status == 200) {
          setOpen(false);
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
      } else {
        // for add
        setLoading(true);
        const response = await postData("gallerycategory", values);
        if (response?.status == 201) {
          setOpen(false);
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          setLoading(false);
        }
        errorHandler(response, ToastError, setLoading);
      }
    } catch (error) {
      setLoading(false);
      ToastError(error?.response?.data?.message || "Error");
      console.log(error);
    }
  };

  useEffect(() => {
    const data = async () => {
      const res = await getData("gallerycategory");
      setData(res?.data);
    };
    data();
  }, [open]);

  useEffect(() => {
    const data = async () => {
      if (editDataId) {
        if (open) {
          const res = await getOneData("gallerycategory", editDataId);
          setFetchedData({
            name: res?.data?.name,
            status: res?.data?.status ? "true" : "false",
          });
        } else {
          setFetchedData(null);
          setEditDataId(null);
        }
      }
    };
    data();
  }, [editDataId, open]);

  const handleCancel = (formik, setOpen) => {
    formik.resetForm();
    setOpen(false);
  };
  return (
    <>
      <FormLayout
        heading={"Gallery Category"}
        data={data}
        columns={columns}
        open={open}
        setOpen={setOpen}
        initialValues={fetchedData ? fetchedData : initialValues}
        handlesubmit={handlesubmit}
        inModal={true}
        validationSchema={galleryCategorySchema}
        text={"Add Gallery Category"}
        size={4}
        FormComponent={GalleryCategoryForm}
        setEditData={setEditDataId}
        values={fetchedData}
        loading={loading}
        front={true}
        form={true}
        routename={"gallerycategory"}
        edit={"modal"}
        handleCancel={handleCancel}
        modalHeading={
          fetchedData ? "Edit Gallery Category" : "Add Gallery Category"
        }
        status={fetchedData ? true : false}
      />
    </>
  );
};

export default GalleryCategory;
